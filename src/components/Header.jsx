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
} from "@material-tailwind/react";
import { createElement, useState } from "react";

import { faBars, faChevronDown, faLanguage, faMoon, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const profileMenuItems = [
    {
        label: "My Profile",
        icon: null,
    },
    {
        label: "Help",
        icon: null,
    },
    {
        label: "Sign Out",
        icon: null,
    },
];

const ProfileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

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
                    <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5 px-1"/>
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
                            {/* {createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`
                            })} */}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
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

const Header = () => {
    return (
        <Navbar className="max-w-full rounded-full py-2 px-6 h-20" color="transparent">
            <div className="relative flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="block lg:hidden mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    Imbedla
                </Typography>
                <div className="hidden lg:flex p-2 bg-white lg:rounded-full gap-2">
                    <Button className="rounded-full" color="green">Dashboard</Button>
                    <Button className="rounded-full" color="green">Rooms</Button>
                    <Button className="rounded-full" color="green">Page</Button>
                    <Button className="rounded-full" color="green">Page</Button>
                </div>
                <div className="flex items-center justify-between gap-4 w-fit">
                    <div className="hidden lg:flex p-2 bg-white lg:rounded-full items-center gap-2">
                        <Input type="search" size="md" placeholder="Search" color="green" className="rounded-full w-fit"/>
                        <IconButton 
                            size="md"
                            className="rounded-full"
                            color="green"
                        >
                            <FontAwesomeIcon icon={faSearch} className="h-5 w-5"/>
                        </IconButton>
                    </div>
                    <IconButton
                        size="sm"
                        color="blue-gray"
                        variant="text"
                        onClick={() => console.log("xd")}
                        className="ml-auto mr-2 lg:hidden"
                    >
                        <FontAwesomeIcon icon={faBars} className="h-6 w-6 px-1"/>
                    </IconButton>
                    <div className="hidden lg:flex p-2 bg-white rounded-full gap-4">
                        <IconButton 
                            size="md"
                            className="rounded-full"
                            color="green"
                        >
                            <FontAwesomeIcon icon={faLanguage} className="h-6 w-6 px-1"/>
                        </IconButton>
                        <IconButton 
                            size="md"
                            className="rounded-full"
                        >
                            <FontAwesomeIcon icon={faMoon} className="h-6 w-6 px-1"/>
                        </IconButton>
                    </div>
                    <div className="bg-white rounded-full gap-2">
                        <ProfileMenu />
                    </div>
                </div>
            </div>
        </Navbar>
    );
};

export default Header;
