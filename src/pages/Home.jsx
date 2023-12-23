/** Material tailwind */
import { IconButton, Spinner, Typography } from "@material-tailwind/react";

/** Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

/** Hooks */
import { useSelector } from "react-redux";

/** Endpoints */
import { selectCurrentThemeMode, selectCurrentUser, selecteCurrentUserId } from "../features/userSlice";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";

import { Grid, Pagination } from "swiper/modules" 
import { useGetFavoritePlantsQuery } from "../features/slices/plantsEndpoints";
import PlantCard from "./Room/components/PlantCard";
import { useMediaQuery } from "react-responsive";

const Home = () => {
    const user = useSelector(selectCurrentUser)
    const userId = useSelector(selecteCurrentUserId)
    const currentMode = useSelector(selectCurrentThemeMode)

    const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

    const { data: favoritePlants, isLoading } = useGetFavoritePlantsQuery(userId)

    return (
        <main className="h-full flex flex-wrap">
            <section className="w-full lg:w-full p-4">
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
                        View and manage your favorite selected plants
                    </Typography>
                </div>
                <section className="grid gap-4 grid-cols-12 auto-rows-[10rem] py-4">
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-2 rounded-lg ">
                        {isLoading ? (
                            <div className=" w-full h-full flex flex-col justify-center items-center rounded-xl">
                                <h1 className=" text-green-600 text-3xl dark:text-green-300">Loading favorites</h1>
                                <Spinner color="green" className=" w-10 h-10" />
                            </div>
                        ) : (
                            <Swiper
                                slidesPerView={isTablet ? (isMobile ? 1 : 2) : 3}
                                grid={{
                                    rows: isTablet || isMobile ? 2 : 2,
                                }}
                                spaceBetween = {10}
                                pagination={{
                                    clickable: true
                                }}
                                modules={[Grid, Pagination]}
                                className="w-full ml-auto mr-auto"
                            >
                                {!isLoading && favoritePlants.data.map((plant, index) => (
                                    <SwiperSlide
                                        key={index}
                                    className="h-full"
                                    >
                                    <PlantCard
                                        plant={plant}
                                        refreshPlants={null}
                                        isDashboard
                                    />
                                </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </section>
            </section>
            {/* <aside className="w-full lg:w-1/4 bg-white dark:bg-blue-gray-900 rounded-3xl h-fit">
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
                
            </aside> */}
        </main>
    );
};

export default Home;
