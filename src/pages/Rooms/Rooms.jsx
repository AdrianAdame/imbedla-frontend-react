/** Material Tailwind */
import { Spinner, Typography } from "@material-tailwind/react";

/** Components */
import AddRoom from "./components/AddRoom";
import RoomCard from "./components/RoomCard";

/** Hooks */
import { useSelector } from "react-redux";
import { useEffect } from "react";

/** Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSunPlantWilt } from "@fortawesome/free-solid-svg-icons";

/** Endpoints */
import { selecteCurrentUserId } from "../../features/userSlice";
import { useLazyGetRoomsQuery } from "../../features/slices/roomsEndpoints";

const Rooms = () => {
  const userId = useSelector(selecteCurrentUserId);

  const [getRooms, { data: rooms, isSuccess, isLoading }] =
    useLazyGetRoomsQuery();

  const getLocalRoom = () => {
    getRooms(userId);
  };
  
  useEffect(() => {
    getLocalRoom();
  }, []);

  const renderCards = () => {
    if (rooms !== undefined) {
      if (rooms.data.length === 0) {
        return (
          <>
            <div className=" w-full h-full flex flex-col gap-4 justify-center items-center bg-white rounded-xl">
              <h1 className="text-green-600 text-3xl">
                You don't have any rooms
              </h1>
              <FontAwesomeIcon
                icon={faSunPlantWilt}
                className=" w-10 h-10 text-gray-700"
              />
            </div>
          </>
        );
      } else {
        return (
          <section className="w-full grid sm:px-0 md:px-10 lg:px-20 xl:px-36 gap-4 grid-cols-0 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 auto-rows-[18rem] lg:auto-rows-[10rem] min-h-[20rem] max-h-fit overflow-auto">
            {isSuccess &&
              rooms.data.map((room, i) => (
                <RoomCard key={i} room={room} refreshRooms={getLocalRoom} />
              ))}
          </section>
        );
      }
    } else if (isLoading) {
      return (
        <>
          <div className=" w-full h-full flex flex-col justify-center items-center bg-white rounded-xl">
            <h1 className=" text-green-600 text-3xl">Loading ...</h1>
            <Spinner color="green" className=" w-10 h-10" />
          </div>
        </>
      );
    }
  };

  return (
    <main className="h-full flex flex-col flex-wrap lg:flex-nowrap justify-start ">
      <div className="flex justify-center lg:justify-between p-2 w-full h-fit">
        <div>
          <div className="flex gap-2 justify-center lg:justify-start">
            <Typography
              variant="h1"
              className="font-lexend-exa font-bold text-3xl lg:text-4xl"
            >
              MY ROOMS
            </Typography>
          </div>
          <Typography
            variant="paragraph"
            className="font-lexend text-sm lg:text-base text-center lg:text-left"
          >
            Create, Edit and Update your rooms
          </Typography>
        </div>
        <AddRoom refreshRooms={getLocalRoom} />
      </div>
      <div className="p-4 text-center lg:text-right w-full">
        Secondary navbar view | Grid or list style
      </div>
      {renderCards()}
    </main>
  );
};

export default Rooms;
