import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="bg-[url('./assets/background-img.jpg')] bg-cover bg-no-repeat bg-center flex flex-col">
            <Header />
            <div className="max-w-full py-4 px-4 h-screen">
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
