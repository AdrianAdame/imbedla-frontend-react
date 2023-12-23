// Forms managers
import { useFormik } from "formik";
import * as Yup from "yup";

// Components
import { Input, Option, Select } from "@material-tailwind/react";

const FormRooms = ({ handleSend }) => {
  
  return (
    <>
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
    </>
  );
};

export default FormRooms;
