/** Icons Manager */
import { faEllipsisV, faPlantWilt, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Material Tailwind */
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

/** Components */
import DeletePlants from "./DeletePlants";
import DetailsPlant from "./DetailsPlant";

const PlantCard = ({ plant, refreshPlants }) => {
  return (
    <div className="flex flex-col gap-3 border-l-8 border-green-300 h-5/6 justify-center items-center bg-white rounded-xl shadow-xl p-5 m-5">
      <div className="fixed top-8 right-8">
        <Menu placement="bottom-end">
          <MenuHandler>
            <Button variant="text" color="green" className=" text-2xl">
              <FontAwesomeIcon className=" w-full" icon={faEllipsisV} />
            </Button>
          </MenuHandler>
          <MenuList className=" w-min z-10">
            <MenuItem>Edit</MenuItem>
            <MenuItem>
              <DeletePlants refreshPlants={refreshPlants} plants={plant} />
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <h1 className=" uppercase font-bold ">{plant.name}</h1>
      <p>Created on: {new Date(plant.created_at).toDateString()}</p>
      <FontAwesomeIcon icon={faPlantWilt}/>

      <div className=" fixed bottom-16 left-10">
        <FontAwesomeIcon icon={faSun} color="orange"/>
      </div>

      <div className=" fixed bottom-16 right-10">
        <DetailsPlant/>
      </div>
    </div>
  );
};

export default PlantCard;
