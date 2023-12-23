import {
    Button,
    Chip,
    Dialog,
    DialogBody,
    DialogHeader,
    Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentThemeMode } from "../../../features/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
    faBattery4,
    faCircleInfo,
    faClockRotateLeft,
    faHeart as faHeartSolid,
    faSignal,
} from "@fortawesome/free-solid-svg-icons";

import { useUpdatePlantMutation } from "../../../features/slices/plantsEndpoints";
import Swal from "sweetalert2";

const DetailsPlant = ({ plant, refresh }) => {
    const currentMode = useSelector(selectCurrentThemeMode);
    const [editPlant, { error }] = useUpdatePlantMutation();

    const [open, setOpen] = useState(false);
    const [favorite, setFavorite] = useState(Boolean(plant?.favorite));

    const handleOpen = () => setOpen(!open);

    const handleUpdate = async () => {
        setFavorite(!favorite);

        const editedPlant = await editPlant({
            id: plant.id,
            favorite: !favorite,
        }).unwrap();

        console.log(editedPlant);
		console.log(error)
		setOpen(false)
		Swal.fire({
			title:'success',
			icon:'success',
			text: `${!favorite ? "Added" : "Removed"} to favorites!`
		})

		refresh()
    };

    const renderModuleInformation = () => {
        const information = JSON.parse(plant.module_information);

        const arr = [faBattery4, faSignal, faClockRotateLeft];

        if (information) {
            return Object.keys(information).map((val, index) => (
                <div
                    className=" flex flex-col justify-center items-center mt-4"
                    key={index}
                >
                    <h3 className=" flex justify-center  items-center gap-2 text-blue-gray-700 text-sm">
                        <FontAwesomeIcon icon={arr[index]} />
                        {val}
                    </h3>
                    <p className=" text-blue-gray-200 dark:text-white font-light text-sm">
                        {information[val]}
                    </p>
                </div>
            ));
        }
    };

    return (
        <>
            <Button variant="gradient" color="blue" onClick={handleOpen}>
                View More
            </Button>

            <Dialog
                open={open}
                handler={handleOpen}
                size="sm"
                className="bg-white dark:bg-blue-gray-900"
            >
                <DialogHeader className="flex flex-row items-center justify-between w-full pl-4">
                    <div>
                        <Typography
                            variant="h2"
                            className="font-lexend-exa font-bold text-3xl lg:text-4xl"
                            color={currentMode === "dark" ? "white" : null}
                        >
                            {plant.name}
                        </Typography>
                    </div>
                    <Chip color="green" value={plant.ref_plant} />
                    <div>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleUpdate}
                        >
                            <FontAwesomeIcon
                                className="w-6 h-6"
                                icon={favorite ? faHeartSolid : faHeart}
                            />
                        </Button>
                    </div>
                </DialogHeader>
                <DialogBody className="flex flex-col items-center gap-10">
                    <div className=" flex flex-row justify-around">
                        <div className=" flex flex-col justify-center items-center">
                            <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 text-xl">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                Created on
                            </h3>
                            <p className=" text-blue-gray-200 dark:text-white font-light text-l">
                                {new Date(plant.created_at).toDateString()}
                            </p>
                        </div>
                    </div>
                    <div className=" flex flex-row justify-around ">
                        <div className=" flex flex-col justify-center items-center">
                            <h3 className=" flex justify-center  items-center gap-3 text-blue-gray-700 text-xl">
                                <FontAwesomeIcon icon={faCircleInfo} />
                                Module Information
                            </h3>
                            <div className="w-full flex flex-row justify-evenly gap-8">
                                {renderModuleInformation()}
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default DetailsPlant;
