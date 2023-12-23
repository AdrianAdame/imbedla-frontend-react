import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateRoomMutation } from "../../../features/slices/roomsEndpoints";
import { selecteCurrentUserId } from "../../../features/userSlice";


const AddRoom = ({ refreshRooms }) => {
  const [open, setOpen] = useState(false);
  const [createRoomApi, { isLoading: isCreateRoom }] = useCreateRoomMutation();

  const handleOpen = () => setOpen(!open);

  const navigate = useNavigate();

  const handleCreateRoom = async (values) => {
    try {
      const createdRoom = await createRoomApi(values).unwrap();
      refreshRooms();
      navigate(`/rooms/${createdRoom.room.id}`);
      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "#000000",
      type: "",
      user_id: useSelector(selecteCurrentUserId),
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please type room name"),
      color: Yup.string().required("Please select room color"),
      type: Yup.string().required("Please select room type"),
      user_id: Yup.string(),
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
        Create New Room
      </Button>
      <Button
        size="lg"
        color="green"
        className="!fixed z-10 bottom-3 right-3 flex items-center gap-3 md:hidden rounded-full"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
        New Room
      </Button>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Create a new room.</DialogHeader>
        <DialogBody>
          <div className="flex flex-col justify-center items-center h-full lg:gap-5 md:gap-8 gap-6 p-5 lg:p-4">
            <Input
              className=" bg-white"
              color="green"
              label="Name of room"
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
              label="Color"
              type="color"
              name="color"
              id="color"
              value={formik.values.color}
              required
              onChange={formik.handleChange}
              error={formik.touched.color && Boolean(formik.touched.color)}
            />
            <Select
              label="Select Type"
              name="type"
              id="type"
              value={formik.values.type}
              onChange={(e) => formik.setFieldValue("type", e)}
              error={formik.touched.type && Boolean(formik.touched.type)}
            >
              <Option value="living">Living Room</Option>
              <Option value="bed">Bedroom</Option>
              <Option value="yard">Yard</Option>
              <Option value="bath">Bathroom</Option>
            </Select>
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
