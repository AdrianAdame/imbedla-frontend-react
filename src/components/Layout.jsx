import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="lg:w-full lg:h-full bg-[#EEEEEE] flex flex-col">
            <Header />
            <div className="max-w-full py-4 px-4 min-h-[calc(100vh-5rem)] flex-1">
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
