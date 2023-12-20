import { Chip } from "@material-tailwind/react";

const PlantCardGeneric = ({plant}) => {    
    return (
        <div className={`flex flex-col border-l-8 border-green-300 lg:h-5/6 h-80 justify-start items-center bg-white dark:bg-blue-gray-900 rounded-xl shadow-xl p-2 font-lexend`}>
            <div className={` flex flex-row items-center justify-between w-full pl-4`}>
                <div>
                    <h1 className={`text-xl mb-2 dark:text-white`}>
                        {plant.latin}
                    </h1>
                        <div className=" flex gap-3">
                            <h3 className="w-max">
                                <Chip
                                    color="green"
                                    value={plant.category}
                                    size="sm"
                                />
                            </h3>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default PlantCardGeneric