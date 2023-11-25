import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Home = () => {

    return (
        <main className="h-full flex flex-wrap">
            <section className="w-full lg:w-3/4 p-4">
                <div className="p-2">
                    <div className="flex gap-2 justify-center lg:justify-start">
                        <Typography variant="h1" className="font-lexend-exa font-light  text-2xl lg:text-3xl">
                            Welcome again,
                        </Typography>
                        <Typography variant="h1" className="font-lexend-exa font-bold text-2xl lg:text-3xl">
                            Adrian Adame
                        </Typography>
                    </div>
                    <Typography variant="paragraph" className="font-lexend text-sm lg:text-base text-center lg:text-left">
                        View and manage your favorite selected plants and rooms
                    </Typography>
                </div>
                <section className="grid gap-4 grid-cols-12 auto-rows-[10rem] py-4">
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        xd
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        xd 2
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        xd 3
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        xd 4
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        xd 5
                    </div>
                    <div className="flex flex-col justify-between py-5 px-4 flex-[1_1_100%] col-span-12 row-span-1 lg:col-span-4 rounded-lg bg-white">
                        xd 6
                    </div>
                </section>
            </section>
            <aside className="w-full lg:w-1/4 bg-white rounded-3xl">
                <div className="flex items-center justify-between p-4 mx-auto">
                    <Typography
                        variant="h3"
                        className="font-lexend-deca text-lg"
                    >
                        Tips from our experts
                    </Typography>
                    <FontAwesomeIcon icon={faChevronDown} className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-center">
                    <div>Holi</div>
                    <div>Holi</div>
                    <div>Holi</div>
                    <div>Holi</div>
                </div>
            </aside>
        </main>
    );
};

export default Home;
