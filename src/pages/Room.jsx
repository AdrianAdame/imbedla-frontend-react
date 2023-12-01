import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Typography } from "@material-tailwind/react"
import { useParams } from "react-router-dom"
const Room = () => {
    const { id } = useParams()
    return (
        <main className="h-full flex flex-wrap">
            <div className="flex justify-center lg:justify-between p-2 w-full h-fit">
                    <div>
                        <div className="flex gap-2 justify-center lg:justify-start">
                            <Typography variant="h1" className="font-lexend-exa font-bold text-3xl lg:text-4xl">
                                ROOM NAME
                            </Typography>
                        </div>
                        <Typography variant="paragraph" className="font-lexend text-sm lg:text-base text-center lg:text-left">
                            Create, edit and visualize your plants assigned to this room
                        </Typography>
                    </div>
                    <Button size="lg" color="green" className="hidden lg:flex items-center gap-3 rounded-full">
                        <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                        Add new Plant
                    </Button>
                    <Button size="lg" color="green" className="fixed bottom-3 right-3 flex items-center gap-3 lg:hidden rounded-full">
                        <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                        New Plant
                    </Button>
                </div>
        </main>
    )
}

export default Room