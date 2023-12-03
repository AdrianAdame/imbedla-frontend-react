import {
    Avatar,
    Button,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Navbar,
    Typography,
    IconButton,
    MobileNav,
    Collapse,
} from "@material-tailwind/react";
import { createElement, useEffect, useState } from "react";

import { faBars, faChevronDown, faChevronUp, faCircleQuestion, faDoorClosed, faHouse, faLanguage, faLeaf, faMoon, faNewspaper, faRightFromBracket, faSearch, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";
import { useLogoutMutation } from "../features/slices/auth/authEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentThemeMode, setLogout, setMode } from "../features/userSlice";

const profileMenuItems = [
    {
        label: "My Profile",
        icon: faUser,
    },
    {
        label: "Help",
        icon: faCircleQuestion,
    },
    {
        label: "Sign Out",
        icon: faRightFromBracket,
    },
];

const ProfileMenu = ({user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [logoutApi, {isLoggingOut}] = useLogoutMutation()

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        try{
            const userData = await logoutApi().unwrap()
            dispatch(setLogout())
            navigate('/login')
        } catch(err){
            if(!err?.status){
                console.log("No server response")
            }else if(err.status == 401){
                console.log("Unauthorized")
                navigate('/login')
            }else{
                console.log("Logout failed")
            }
        }
    }

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="md"
                        alt="Profile name"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <Typography variant="small" className="font-lexend-deca text-sm mr-1 ml-1 font-bold capitalize text-blue-gray-900 dark:text-white hidden lg:block">
                        {user}
                    </Typography>
                    {isMenuOpen ? (<FontAwesomeIcon icon={faChevronUp} className="h-5 w-5 px-1"/>) : (<FontAwesomeIcon icon={faChevronDown} className="h-5 w-5 px-1"/>)}
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;

                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={icon} className={`h-4 w-4 ${isLastItem ? "text-red-500" : ""}`} />
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                                onClick={isLastItem ? () => handleLogout() : null}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

const navListItems = [
    {
        label: 'Dashboard',
        icon: faHouse
    },
    {
        label: 'Monitoring',
        icon: null
    },
    {
        label: 'Rooms',
        icon: faDoorClosed
    },
    {
        label: 'Plants',
        icon: faLeaf
    },
    {
        label: 'Information',
        icon: null
    },
    {
        label: 'Blog/Tips',
        icon: faNewspaper
    },
]

const NavList = ({onClickItem}) => {
    const {pathname} = useLocation()
    const [active, setActive] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])

    return (
        <ul className="flex flex-col gap-4 lg:mb-0 lg:flex-row lg:items-center mt-2 mb-4 bg-white dark:bg-blue-gray-900 p-2 rounded-lg lg:rounded-full">
            {navListItems.map(({label, icon}, key) => {
                const lcText = label.toLowerCase()

                if(!icon){
                    return (
                        <Typography key={label} variant="small" className="lg:hidden font-lexend-exa mt-[0.5rem] mr-[0] mb-[0.5rem] ml-[2rem] text-green-900" >
                            {label}
                        </Typography>
                    )
                }

                return (
                    <Typography
                        key={label}
                        variant="small"
                        className={`font-lexend ${active === lcText ? "text-white" : "text-green-500"}`}
                        color="green"
                    >
                        <MenuItem
                            
                            className={`flex items-center gap-4 lg:rounded-full ${active === lcText ? "bg-green-900" : "bg-transparent"}`} 
                            onClick={(e) => {
                                e.currentTarget.blur()
                                navigate(`/${lcText}`)
                                if(window.innerWidth <= 960){
                                    setTimeout(() => {
                                        onClickItem()
                                    }, 250)
                                }
                            }
                        }>
                            <FontAwesomeIcon icon={icon} className="h-[18px] w-[18px]" />
                            <span className={active === lcText ? "text-white font-bold" : "text-green-500"}>{label}</span>
                        </MenuItem>
                    </Typography>
                )
            })}
        </ul>
    )
}

const Header = ({ user }) => {
    const dispatch = useDispatch()
    const currentMode = useSelector(selectCurrentThemeMode)

    const [isNavOpen, setIsNavOpen] = useState(false)

    const toggleIsNavOpen = () => setIsNavOpen(curr => !curr)

    useEffect(() => {
        window.addEventListener("resize", () => {
            window.innerWidth >= 960 && setIsNavOpen(false)
        })
    }, [])

    return (
        <Navbar className="max-w-full rounded-full py-4 lg:py-2 px-6 min-h-20" color="transparent">
            <div className="relative flex items-center justify-between text-blue-gray-900">
                <div className="hidden lg:block">
                    <NavList onClickItem={toggleIsNavOpen}/>
                </div>
                <div className="flex items-center justify-between gap-8 w-fit">
                    <div className="hidden lg:flex p-2 bg-white dark:bg-blue-gray-900 rounded-full gap-4">
                        <IconButton 
                            size="md"
                            variant="text"
                            className="rounded-full"
                            color={currentMode === "dark" ?
                                    "white" : null}
                        >
                            <FontAwesomeIcon icon={faLanguage} className="h-6 w-6 px-1"/>
                        </IconButton>
                        <IconButton 
                            size="md"
                            variant="text"
                            className="rounded-full"
                            onClick={() => dispatch(setMode())}
                        >
                            {currentMode === "dark" ? 
                                (<FontAwesomeIcon icon={faSun} className="h-6 w-6 px-1" color="white"/>) : 
                                (<FontAwesomeIcon icon={faMoon} className="h-6 w-6 px-1"/>)
                            }
                        </IconButton>
                    </div>
                    <div className="bg-white dark:bg-blue-gray-900 rounded-full gap-2">
                        <ProfileMenu user = {user}/>
                    </div>
                </div>
                <IconButton
                        size="lg"
                        color="blue-gray"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-auto mr-2 lg:hidden"
                    >
                        <FontAwesomeIcon icon={faBars} className="h-8 w-8 px-1"/>
                </IconButton>
            </div>
            <Collapse open={isNavOpen} className="rounded-xl">
                <NavList onClickItem={toggleIsNavOpen}/>
            </Collapse>
        </Navbar>
    );
};

export default Header;
