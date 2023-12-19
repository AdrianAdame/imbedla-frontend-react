// Icons
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Endpoints
import { useDeleteRoomMutation } from "../../../features/slices/roomsEndpoints";

// Alerts
import Swal from "sweetalert2";

const DeleteRoom = ({ room, refreshRooms }) => {
  const [deleteRoom, {}] = useDeleteRoomMutation();

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
        deleteRoom(room);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then((close) => {
          if (close) {
            refreshRooms();
          }
        });
      }
    });
  };

  return (
    <>
      <div
        className=" flex items-center gap-3 text-red-800"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faTrash} />
        <p>Delete</p>
      </div>
    </>
  );
};

export default DeleteRoom;
