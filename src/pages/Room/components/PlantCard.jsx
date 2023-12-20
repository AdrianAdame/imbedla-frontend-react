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

const PlantCard = ({ plant, refreshPlants, isDashboard = false }) => {
    const renderPlantModules = (array) => {
        const arr = JSON.parse(array);

        if (arr.length > 0) {
            return arr.map((val, index) => {

                let icon = {
                    fig: null,
                    color: {
                        light: "",
                        dark: ""
                    }
                };

                if (val.type === "Humidity") {
                    icon.fig = faWater;
                    icon.color.light = "text-blue-700"
                    icon.color.dark = "dark:text-light-blue-300"
                }

                if (val.type === "Luminosity") {
                    icon.fig = faSun;
                    icon.color.light = "text-orange-700"
                    icon.color.dark = "dark:text-orange-300"
                }

                return (
					<Tooltip content={val.type} key={index}>
						<p className={`${icon.color.light} ${icon.color.dark} font-light text-md`}>
                        	<FontAwesomeIcon icon={icon.fig} />
                    	</p>
					</Tooltip>
                );
            });
        } else {
            return <p className=" text-red-500 dark:text-red-300 font-light text-sm">
			No specs monitoring
		</p>
        }
    };

    return (
        <div className={`flex flex-col border-l-8 border-green-300 lg:h-5/6 h-${!isDashboard ? "80" : "25"} justify-start items-center bg-white dark:bg-blue-gray-900 rounded-xl shadow-xl p-5 m-5 font-lexend`}>
            <div className={` flex flex-row items-center justify-between w-full pl-${!isDashboard ? "4" : "0"}`}>
                <div>
                    <h1 className={`${!isDashboard ? "text-xl" : "text-l"} mb-2 dark:text-white`}>
                        {plant.name}
                    </h1>
                    {!isDashboard ? (
                        <div className=" flex gap-3">
                            <h3 className="w-max">
                                <Chip
                                    color="green"
                                    value={plant.ref_plant}
                                    size="sm"
                                />
                            </h3>
                        </div>
                    ) : (null)}
                </div>
                {
                    !isDashboard ? (
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
                            <MenuList className=" w-min z-10 bg-white">
                                <MenuItem>
                                    <DeletePlants
                                        refreshPlants={refreshPlants}
                                        plants={plant}
                                    />
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                    ) : (
                            <div className=" flex gap-3">
                                <h3 className="w-max">
                                    <Chip
                                        color="green"
                                        value={plant.ref_plant}
                                        size="sm"
                                    />
                                </h3>
                            </div>
                        )
                }
            </div>
            <div className={` flex flex-col text-lg w-full h-full pt-${!isDashboard ? "5" : "2"} justify-start gap-${!isDashboard ? "8" : "1"}`}>
                <div className={`flex flex-row justify-${!isDashboard ? 'around' : 'start'}`}>
                    <div className=" flex flex-col justify-center items-center">{
                        !isDashboard ? (
                            <><h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 text-sm">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                Created on:
                            </h3><p className=" text-blue-gray-200 dark:text-white font-light text-sm">
                                    {new Date(plant.created_at).toDateString()}
                                </p></>
                        ) : (
                            <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-300 text-sm">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            {new Date(plant.created_at).toDateString()}
                        </h3>
                        )
                    }
                    </div>
                </div>

                <div className={`flex flex-row justify-${!isDashboard ? 'around' : 'start'}`}>
                    <div className=" flex flex-col justify-center items-center">
                        {!isDashboard ? (
                            <>
                                <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 text-sm">
                            Monitoring
                        </h3>
						<div className="flex flex-row justify-around w-full">
                        {renderPlantModules(plant.module_specs)}
						</div>
                            </>
                        ) : (
                            <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 text-sm">
                            {renderPlantModules(plant.module_specs)}
                        </h3>
                        )}
                    </div>
                </div>
            </div>

            {!isDashboard && (
                <div className=" fixed bottom-12 right-8">
                    <DetailsPlant plant={plant} refresh={refreshPlants}/>
                </div>
            )}

        </div>
    );
};

export default PlantCard;
