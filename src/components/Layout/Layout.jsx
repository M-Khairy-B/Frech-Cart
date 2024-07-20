import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import offlineimage from "../../image/download (14).svg";

import { Offline, Online } from "react-detect-offline";
export default function Layout() {
    return (
        <React.Fragment>
            <Navbar />
            <Online>
                <div className=" mx-auto">
                    <Outlet className="py-14 mx-auto"></Outlet>
                </div>
            </Online>
            <Offline>
                <div className=" flex-col flex justify-center items-center">
                    <img
                        className=" w-1/3 py-4 mx-auto"
                        src={offlineimage}
                        alt="offline image"
                    />
                    <p className="font-bold text-xl flex justify-center items-center text-center text-red-400">
                        Not Internet Please Check WIFI
                    </p>
                </div>
            </Offline>
            <Footer />
        </React.Fragment>
    );
}
