/** Hooks */
import { useState } from "react";
import { useSelector } from "react-redux";
import { json, useNavigate, useParams } from "react-router-dom";

/** Components */
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

/** Manager for Icons */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Manager for forms  */
import { useFormik } from "formik";
import * as Yup from "yup";

/** Connect to Backend */
import { selecteCurrentUserId } from "../../../features/userSlice";

// Alerts
import Swal from "sweetalert2";
import { useCreatePlantMutation } from "../../../features/slices/plantsEndpoints";

const AddRoom = ({ refreshPlants }) => {
  const [open, setOpen] = useState(false);

  const [createPlantApi, { isLoading }] = useCreatePlantMutation();
  const handleOpen = () => setOpen(!open);

  // Global varibles
  const userId = selecteCurrentUserId;
  const { roomId } = useParams();

  const navigate = useNavigate();

  const handleCreateRoom = async (values) => {
    handleOpen();

    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, created it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const createdPlant = await createPlantApi(values).unwrap();
          handleOpen();
          refreshPlants();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      user_id: useSelector(userId),
      room_id: roomId,
      ref_plant: "",
      module_information: {},
      module_specs: {},
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please type plants name"),
      ref_plant: Yup.string().required("Please type plants ref"),
    }),
    onSubmit: (values) => handleCreateRoom(values),
  });

  return (
    <>
      <Button
        size="lg"
        color="green"
        className="hidden lg:flex items-center gap-3 rounded-full"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
        Create New Plant
      </Button>
      <Button
        size="lg"
        color="green"
        className="!fixed z-10 bottom-3 right-3 flex items-center gap-3 md:hidden rounded-full"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
        New Plant
      </Button>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Create a new room.</DialogHeader>
        <DialogBody>
          <div className="flex flex-col justify-center items-center h-full lg:gap-5 md:gap-8 gap-6 p-5 lg:p-4">
            <Input
              className=" bg-white"
              color="green"
              label="Name of plants"
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              required
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.touched.name)}
            />
            <Input
              className=" bg-white"
              color="green"
              label="Ref of plants"
              type="text"
              name="ref_plant"
              id="ref_plant"
              value={formik.values.ref_plant}
              required
              onChange={formik.handleChange}
              error={
                formik.touched.ref_plant && Boolean(formik.touched.ref_plant)
              }
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={formik.handleSubmit}
          >
            Create
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddRoom;
