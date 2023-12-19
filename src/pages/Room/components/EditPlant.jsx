import React from 'react'

const EditPlant = () => {
    const [deletePlant, {}] = useDeletePlantMutation();

  return (
    <>
    <div
        className=" w-full flex items-center gap-3 text-red-800"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faTrash} />
        <p>Delete</p>
      </div>
    </>
  )
}

export default EditPlantfe