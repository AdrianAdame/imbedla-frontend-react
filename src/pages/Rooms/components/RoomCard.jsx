import {
  faBath,
  faBed,
  faCalendarAlt,
  faCouch,
  faEllipsisV,
  faLeaf,
  faSunPlantWilt,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import DeleteRoom from "./DeleteRoom";
import EditRoom from "./EditRoom";

const RoomCard = ({ room, refreshRooms }) => {
  const navigate = useNavigate();

  const types = {
    living: {
      icon: faCouch,
      color: "green",
    },
    bed: {
      icon: faBed,
      color: "blue",
    },
    bath: {
      icon: faBath,
      color: "black",
    },
    Garden: {
      icon: faSunPlantWilt,
      color: "red",
    },
    yard: {
      icon: faSunPlantWilt,
      color: "red",
    },
  };
  const renderType = (type) => <Chip color={types[type].color} value={type} />;

  const handleSend = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <>
      <div
        className={`flex flex-col font-lexend items-center border-l-8 justify-between py-5 px-4 flex-[1_1_100%] col-span-2 row-span-1 lg:row-span-2 lg:col-span-4 rounded-lg bg-white`}
        style={{ borderColor: room.color }}
      >
        <div className=" flex flex-row items-center justify-between w-full pl-4">
          <div>
            <h1 className=" text-2xl">{room.name}</h1>
            <div className=" flex gap-3">
              <h3 className=" text-xl w-max">{renderType(room.type)}</h3>
              <FontAwesomeIcon
                className="w-6 h-6"
                icon={types[room.type].icon}
              />
            </div>
          </div>
          <div>
            <Menu placement="bottom-end">
              <MenuHandler>
                <Button variant="text" color="green" className=" text-2xl">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </Button>
              </MenuHandler>
              <MenuList className=" w-min z-10">
                <MenuItem>
                  <EditRoom room={room} refreshRooms={refreshRooms} />
                </MenuItem>
                <MenuItem>
                  <DeleteRoom room={room} refreshRooms={refreshRooms} />
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <div className=" flex flex-col text-lg w-full h-full pt-5 justify-around">
          <div className=" flex flex-row justify-around">
            <div className=" flex flex-col justify-center items-center">
              <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700">
                <FontAwesomeIcon icon={faCalendarAlt} />
                Created on:
              </h3>
              <p className=" text-blue-gray-200 font-light">
                {new Date(room.created_at).toDateString()}
              </p>
            </div>

            <div className=" flex flex-col justify-center items-center">
              <h3 className=" flex justify-center items-center gap-3 text-blue-gray-700">
                <FontAwesomeIcon icon={faTree} />
                Number of plants:
              </h3>
              <p className=" text-blue-gray-200 font-light">{room.total_plants}</p>
            </div>
          </div>

          <div className=" flex flex-col justify-center items-center">
            <h3 className=" flex justify-center items-center gap-3 text-blue-gray-700">
              <FontAwesomeIcon icon={faLeaf} />
              Latest plant:
            </h3>
            <p className=" text-blue-gray-200 font-light">{room.latest_plant_name}</p>
          </div>
        </div>

        <div className=" flex flex-row justify-end w-full">
          <Button onClick={handleSend} color="green" variant="text">
            View Details
          </Button>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
