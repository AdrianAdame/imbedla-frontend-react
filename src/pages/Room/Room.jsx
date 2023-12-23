/** Icons */
import {
    faCalendarAlt,
    faLeaf,
    faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Hooks */
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

/** Endpoints */
import { useGetRoomByIdQuery } from "../../features/slices/roomsEndpoints";
import { useLazyGetPlantsQuery } from "../../features/slices/plantsEndpoints";

/** Material Tailwind */
import { Spinner, Typography } from "@material-tailwind/react";

/** Sliders */
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

/** Components */
import AddPlants from "./components/AddPlants";
import PlantCard from "./components/PlantCard";

// Styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { selectCurrentThemeMode } from "../../features/userSlice";

const Room = () => {
    const currentMode = useSelector(selectCurrentThemeMode);
    const { roomId } = useParams();

    const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

    const { data: room, isLoading } = useGetRoomByIdQuery(roomId);

    const [getPlants, { data: plants, isSuccess, isLoadingPlants }] =
        useLazyGetPlantsQuery();

    const getLocalPlants = () => {
        getPlants(roomId);
    };

    useEffect(() => {
        getLocalPlants();
    }, []);

    if (isLoading) {
        return (
            <div className=" w-full h-full flex flex-col justify-center items-center rounded-xl">
                <h1 className=" text-green-600 dark:text-green-300 text-3xl">Loading room information...</h1>
                <Spinner color="green" className=" w-10 h-10" />
          </div>
        );
    }

    return (
        <main className="h-full flex flex-col flex-wrap lg:flex-nowrap justify-start ">
            <div className="flex justify-center lg:justify-between p-2 w-full h-max">
                <div>
                    <div className="flex gap-2 justify-center lg:justify-start">
                        <Typography
                            variant="h1"
                            className="font-lexend-exa font-bold text-3xl lg:text-4xl"
                            color={currentMode === "dark" ? "white" : null}
                        >
                            {!isLoading && room.room.name}
                        </Typography>
                    </div>
                    <Typography
                        variant="paragraph"
                        className="font-lexend text-sm lg:text-base text-center lg:text-left"
                        color={currentMode === "dark" ? "white" : null}
                    >
                        Create, edit and visualize your plants assigned to this
                        room
                    </Typography>
                </div>
                <AddPlants refreshPlants={getLocalPlants} />
            </div>

            <div className="w-full h-full flex flex-col lg:flex-row p-2 gap-8">
                <div className="w-full lg:w-1/4 bg-white dark:bg-blue-gray-900 rounded-lg p-4 flex flex-col justify-between">
                    <Typography
                        variant="h3"
                        className="font-lexend-exa font-bold text-xl lg:text-2xl mb-2 text-center"
                        color={currentMode === "dark" ? "white" : null}
                    >
                        Room Information
                    </Typography>
                    <div className=" flex flex-col justify-center gap-2 items-center">
                        <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 dark:text-white font-lexend">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            Created on:
                        </h3>
                        <p className=" text-blue-gray-200 font-lexend font-light">
                            {new Date(room.room.created_at).toDateString()}
                        </p>
                    </div>

                    <div className=" flex flex-col justify-center gap-2 items-center">
                        <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 dark:text-white font-lexend">
                            <FontAwesomeIcon icon={faTree} />
                            Number of plants:
                        </h3>
                        <p className=" text-blue-gray-200 font-lexend font-light">
                            {room.room.total_plants === ""
                                ? "0"
                                : room.room.total_plants}
                        </p>
                    </div>

                    <div className=" flex flex-col justify-center gap-2 items-center">
                        <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 dark:text-white font-lexend">
                            <FontAwesomeIcon icon={faLeaf} />
                            Latest plant:
                        </h3>
                        <p className=" text-blue-gray-200 font-lexend font-light">
                            {room.room.latest_plant_name === ""
                                ? "None"
                                : room.room.latest_plant_name}
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-3/4 rounded-lg flex flex-col justify-center items-center gap-1">
				<Typography
                        variant="h3"
                        className="font-lexend-exa font-bold text-xl lg:text-2xl text-center"
                        color={currentMode === "dark" ? "white" : null}
                    >
                        Your plants
                    </Typography>
					<div className="w-full h-full">
                        {isLoadingPlants ? (
                            <div>Loading plants </div>
                        ) : (
                            <Swiper
                                slidesPerView={isTablet ? (isMobile ? 1 : 2) : 3}
                                spaceBetween={10}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[FreeMode, Pagination]}
                                className="h-full"
                            >
                                {isSuccess && plants.data.length > 0 ? (
                                    plants.data.map((plant, i) => (
                                        <SwiperSlide
                                            key={i}
                                            className="h-full"
                                        >
                                            <PlantCard
                                                plant={plant}
                                                refreshPlants={getLocalPlants}
                                            />
                                        </SwiperSlide>
                                    ))) : (
                                        <div>No plants registered</div>
                                    )}
                            </Swiper>
                        )}
					</div>
                </div>
            </div>
        </main>
    );
};

export default Room;
