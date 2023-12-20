/** Icons Manager */
import {
    faCalendarAlt,
    faEllipsisV,
    faSun,
    faWater,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Material Tailwind */
import {
    Button,
    Chip,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
	Tooltip,
} from "@material-tailwind/react";

/** Components */
import DeletePlants from "./DeletePlants";
import DetailsPlant from "./DetailsPlant";

const PlantCard = ({ plant, refreshPlants }) => {
    console.log(plant);

    const renderPlantModules = (array) => {
        const arr = JSON.parse(array);

        if (arr.length > 0) {
            return arr.map((val, index) => {

                let icon = null;

                if (val.type === "Humidity") {
                    icon = faWater;
                }

                if (val.type === "Luminosity") {
                    icon = faSun;
                }

                return (
					<Tooltip content={val.type} key={index}>
						<p className=" text-blue-gray-400 dark:text-white font-light text-md">
                        	<FontAwesomeIcon icon={icon} />
                    	</p>
					</Tooltip>
                );
            });
        } else {
            return <p className=" text-red-300 dark:text-white font-light text-sm">
			No specs to monitor
		</p>
        }
    };

    return (
        <div className="flex flex-col border-l-8 border-green-300 lg:h-5/6 h-80 justify-start items-center bg-white dark:bg-blue-gray-900 rounded-xl shadow-xl p-5 m-5 font-lexend">
            <div className=" flex flex-row items-center justify-between w-full pl-4">
                <div>
                    <h1 className=" text-xl mb-2 dark:text-white">
                        {plant.name}
                    </h1>
                    <div className=" flex gap-3">
                        <h3 className="w-max">
                            <Chip
                                color="green"
                                value={plant.ref_plant}
                                size="sm"
                            />
                        </h3>
                    </div>
                </div>
                <div>
                    <Menu placement="right-start">
                        <MenuHandler>
                            <Button
                                variant="text"
                                color="green"
                                className=" text-xl"
								size="sm"
                            >
                                <FontAwesomeIcon
                                    className=" w-full"
                                    icon={faEllipsisV}
                                />
                            </Button>
                        </MenuHandler>
                        <MenuList className=" w-min z-10 bg-white dark:bg-blue-gray-500">
                            <MenuItem>
                                <DeletePlants
                                    refreshPlants={refreshPlants}
                                    plants={plant}
                                />
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
            <div className=" flex flex-col text-lg w-full h-full pt-5 justify-start gap-8">
                <div className=" flex flex-row justify-around">
                    <div className=" flex flex-col justify-center items-center">
                        <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 text-sm">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            Created on:
                        </h3>
                        <p className=" text-blue-gray-200 dark:text-white font-light text-sm">
                            {new Date(plant.created_at).toDateString()}
                        </p>
                    </div>
                </div>

                <div className=" flex flex-row justify-around">
                    <div className=" flex flex-col justify-center items-center">
                        <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 text-sm">
                            Monitoring
                        </h3>
						<div className="flex flex-row justify-around w-full">
                        {renderPlantModules(plant.module_specs)}
						</div>
                    </div>
                </div>
            </div>

            <div className=" fixed bottom-12 right-8">
                <DetailsPlant plant={plant} refresh={refreshPlants}/>
            </div>
        </div>
    );
};

export default PlantCard;
