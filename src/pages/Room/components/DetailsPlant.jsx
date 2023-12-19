import { Button, Dialog, DialogHeader } from "@material-tailwind/react";
import React, { useState } from "react";

const DetailsPlant = ({}) => {
  const [open, setOpen] =  useState(false)

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button variant="gradient" color="blue" onClick={handleOpen}>
        See more details
      </Button>

      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader>Details Plant</DialogHeader>
      </Dialog>
    </>
  );
};

export default DetailsPlant;
