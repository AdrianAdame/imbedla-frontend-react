// Icon
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// // Alerts
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Dialog, Input, Option, Select, DialogBody } from "@material-tailwind/react";

import { useFormik } from "formik";
import * as Yup from "yup";

const EditRoom = ({ rooms, refreshRooms }) => {
  const handleSend = (values) => console.log(values);

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "#000000",
      type: "",
      // user_id: useSelector(selecteCurrentUserId),
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please type room name"),
      color: Yup.string().required("Please select room color"),
      type: Yup.string().required("Please select room type"),
      // user_id: Yup.string(),
    }),
    onSubmit: handleSend,
  });

  const dialog = () => {
    const mySwal = withReactContent(Swal);
    return mySwal
      .fire({
        html: <></>,
      })
      .then((res) => {});
  };

  return (
    <>
      <div className=" flex items-center gap-3 text-blue-800" onClick={dialog}>
        <FontAwesomeIcon icon={faEdit} />
        <p>Edit</p>
      </div>

      <Dialog>
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
      </Dialog>
    </>
  );
};

export default EditRoom;
