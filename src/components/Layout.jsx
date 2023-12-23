import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/userSlice";

const Layout = () => {
    const user = useSelector(selectCurrentUser)

    return (
        <div className="lg:w-full lg:h-full bg-gray-200 dark:bg-[#121212] flex flex-col">
            <Header user={user || {}}/>
            <div className="max-w-full py-4 px-4 min-h-[calc(100vh-5rem)] flex-1">
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
