// Icons
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Endpoints
import { useDeletePlantMutation } from "../../../features/slices/plantsEndpoints";

// Alerts
import Swal from "sweetalert2";

const DeletePlants = ({ plants, refreshPlants }) => {
  const [deletePlant, {}] = useDeletePlantMutation();

  const handleOpen = () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deletePlant(plants);
        } catch (error) {
          console.log(error);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then((close) => {
          if (close) {
            refreshPlants();
          }
        });
      }
    });
  };

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
  );
};

export default DeletePlants;
