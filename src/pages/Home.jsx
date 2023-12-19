/** Material tailwind */
import { IconButton, Typography } from "@material-tailwind/react";

/** Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

/** Hooks */
import { useSelector } from "react-redux";

/** Endpoints */
import { selectCurrentThemeMode, selectCurrentUser } from "../features/userSlice";

const Home = () => {
    const user = useSelector(selectCurrentUser)
    const currentMode = useSelector(selectCurrentThemeMode)

    return (
        <main className="h-full flex flex-wrap">
            <section className="w-full lg:w-3/4 p-4">
                <div className="p-2">
                    <div className="flex gap-2 justify-center lg:justify-start">
                        <Typography variant="h1" className="font-lexend-exa font-light  text-2xl lg:text-3xl" color={currentMode === "dark" ? "white" : null}>
                            Welcome,
                        </Typography>
                        <Typography variant="h1" className="font-lexend-exa font-bold text-2xl lg:text-3xl" color={currentMode === "dark" ? "white" : null}>
                            {user}
                        </Typography>
                    </div>
                    <Typography variant="paragraph" className="font-lexend text-sm lg:text-base text-center lg:text-left" color={currentMode === "dark" ? "white" : null}>
                        View and manage your favorite selected plants and rooms
                    </Typography>
                </div>
                <section className="grid gap-4 grid-cols-12 auto-rows-[10rem] py-4">
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        test component
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        test component 2
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        test component 3
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        test component 4
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        test component 5
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        test component 6
                    </div>
                </section>
            </section>
            <aside className="w-full lg:w-1/4 bg-white dark:bg-blue-gray-900 rounded-3xl h-fit">
                <div className="flex items-center justify-between p-4 mx-auto">
                    <Typography
                        variant="h3"
                        className="font-lexend-deca text-lg"
                        color={currentMode === "dark" ? "white" : null}
                    >
                        Tips from our experts
                    </Typography>
                    <IconButton
                        variant="text"
                        onClick={() => console.log("xd")}>
                        <FontAwesomeIcon icon={faChevronDown} className="h-6 w-6" color="white"/>
                    </IconButton>
                </div>
                
            </aside>
        </main>
    );
};

export default Home;
