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

const Room = () => {
  const { roomId } = useParams();

  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

  const { data: room, isLoading } = useGetRoomByIdQuery(roomId);

  const [getPlants, { data: plants, isSuccess, isLoadingPlants }] =
    useLazyGetPlantsQuery();

  const getLocalPlants = () => {
    getPlants(roomId);
  };

  console.log(room);
  useEffect(() => {
    getLocalPlants();
  }, []);

  if (isLoading) {
    return (
      <div className=" flex flex-col justify-center items-center w-full h-full rounded-2xl bg-white">
        <h1 className=" text-green-500 font-bold text-3xl">
          Loading room information
        </h1>
        <Spinner className=" w-10 h-10" color="green" />
      </div>
    );
  }

  return (
    <main className="h-full flex flex-wrap w-full ">
      <div className="flex justify-center lg:justify-between p-2 w-full h-max">
        <div>
          <div className="flex gap-2 justify-center lg:justify-start">
            <Typography
              variant="h1"
              className="font-lexend-exa font-bold text-3xl lg:text-4xl"
            >
              {!isLoading && room.room.name}
            </Typography>
          </div>
          <Typography
            variant="paragraph"
            className="font-lexend text-sm lg:text-base text-center lg:text-left"
          >
            Create, edit and visualize your plants assigned to this room
          </Typography>
        </div>
        <AddPlants refreshPlants={getLocalPlants} />
      </div>

      <div
        className=" w-full h-5/6 sm:h-[70vh] rounded-2xl border-l-8 bg-white"
        style={{ borderColor: room.room.color }}
      >
        <div className=" flex flex-col text-lg w-full pt-5 justify-around h-full items-center">
          <div className="flex lg:flex-row sm:flex-col justify-around w-full h-1/6 sm:h-60">
            <div className=" flex flex-col justify-center items-center">
              <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700">
                <FontAwesomeIcon icon={faCalendarAlt} />
                Created on:
              </h3>
              <p className=" text-blue-gray-200 font-light">
                {new Date(room.room.created_at).toDateString()}
              </p>
            </div>

            <div className=" flex flex-col justify-center items-center">
              <h3 className=" flex justify-center items-center gap-3 text-blue-gray-700">
                <FontAwesomeIcon icon={faTree} />
                Number of plants:
              </h3>
              <p className=" text-blue-gray-200 font-light">
                {room.room.total_plants === "" ? "0" : room.room.total_plants}
              </p>
            </div>

            <div className=" flex flex-col justify-center items-center">
              <h3 className=" flex justify-center items-center gap-3 text-blue-gray-700">
                <FontAwesomeIcon icon={faLeaf} />
                Latest plant:
              </h3>
              <p className=" text-blue-gray-200 font-light">
                {room.room.latest_plant_name === ""
                  ? "None"
                  : room.room.latest_plant_name}
              </p>
            </div>
          </div>
          {!isSuccess && (
            <>
              <div className=" w-full h-full flex justify-center items-center">
                <Spinner color="green" className=" w-10 h-10" />
              </div>
            </>
          )}

          <div className=" w-full h-full ">
            <Swiper
              slidesPerView={isTablet ? (isMobile ? 1 : 2) : 3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className=" h-5/6 "
            >
              {isSuccess &&
                plants.data.map((plant, i) => (
                  <SwiperSlide
                    key={i}
                    className="flex h-full justify-center items-center"
                  >
                    <PlantCard plant={plant} refreshPlants={getLocalPlants} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Room;
