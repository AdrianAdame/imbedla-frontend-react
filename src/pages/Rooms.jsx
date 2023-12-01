import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Typography } from "@material-tailwind/react"

const Rooms = () => {
    return (
        <main className="h-full flex flex-col flex-wrap lg:flex-nowrap justify-start">
                <div className="flex justify-center lg:justify-between p-2 w-full h-fit">
                    <div>
                        <div className="flex gap-2 justify-center lg:justify-start">
                            <Typography variant="h1" className="font-lexend-exa font-bold text-3xl lg:text-4xl">
                                MY ROOMS
                            </Typography>
                        </div>
                        <Typography variant="paragraph" className="font-lexend text-sm lg:text-base text-center lg:text-left">
                            Create, Edit and Update your rooms
                        </Typography>
                    </div>
                    <Button size="lg" color="green" className="hidden lg:flex items-center gap-3 rounded-full">
                        <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                        Create New Room
                    </Button>
                    <Button size="lg" color="green" className="fixed bottom-3 right-3 flex items-center gap-3 lg:hidden rounded-full">
                        <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                        New Room
                    </Button>
                </div>
                <div className="p-4 text-center lg:text-right w-full">
                    Secondary navbar view | Grid or list style
                </div>
                <section className="w-full grid gap-4 grid-cols-8 lg:grid-cols-12 auto-rows-[10rem] min-h-[20rem] max-h-fit overflow-auto">
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-4 row-span-1 lg:row-span-2 lg:col-span-4 rounded-lg bg-white">
                        Room component
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-4 row-span-1 lg:row-span-2 lg:col-span-4 rounded-lg bg-white">
                        Room component
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-4 row-span-1 lg:row-span-2 lg:col-span-4 rounded-lg bg-white">
                        Room component
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-4 row-span-1 lg:row-span-2 lg:col-span-4 rounded-lg bg-white">
                        Room component
                    </div>

                </section>
        </main>
    )
}

export default Rooms