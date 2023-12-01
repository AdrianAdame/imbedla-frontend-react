import { useParams } from "react-router-dom"

const Plant = () => {
    const {roomId, plantId} = useParams()

    return (<div>{`Plant with id ${plantId} in room with id: ${roomId}`}</div>)
}

export default Plant