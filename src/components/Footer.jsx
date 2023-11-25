import { Typography } from "@material-tailwind/react"

const Footer = () => {
    return (
    <footer className="w-screen bg-blue-gray-100 p-8">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
            Imbedla Icon
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500
                        focus:text-blue-500"
                    >
                        About Us
                    </Typography>
                </li>
                <li>
                    <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                    Contribute
                    </Typography>
                </li>
                <li>
                    <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                    Contact Us
                    </Typography>
                </li>
            </ul>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue-gray" className="text-center font-normal">
            &copy; 2023 Imbedla
        </Typography>
    </footer>
    )
}

export default Footer