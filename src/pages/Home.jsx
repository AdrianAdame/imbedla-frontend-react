import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Home = () => {

    return (
        <main className="flex h-85">
            <section className="w-3/4 p-4">
                <div>
                    <div className="flex gap-2">
                        <Typography variant="h1" className="font-lexend-exa font-light text-3xl">
                            Welcome again,
                        </Typography>
                        <Typography variant="h1" className="font-lexend-exa font-bold text-3xl">
                            Adrian Adame
                        </Typography>
                    </div>
                    <Typography variant="paragraph" className="font-lexend text-base">
                        View and manage your favorite selected plants and rooms
                    </Typography>
                </div>
                <section className="grid gap-4 grid-cols-3 grid-rows-3">
                    <span>Holi</span>
                    <span>Holi</span>
                    <span>Holi</span>
                    <span>Holi</span>
                    <span>Holi</span>
                    <span>Holi</span>
                    <span>Holi</span>
                    <span>Holi</span>
                    <span>Holi</span>
                </section>
            </section>
            <aside className="w-1/4 bg-white rounded-3xl">
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