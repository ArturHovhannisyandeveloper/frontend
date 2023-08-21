import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";

export default function DefaultLayout() {
    const { user, setUser } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get('/user');
                if (resp.status === 200) {
                    setUser(resp.data.data);
                }
            } catch (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }
            }
        })();
    }, []);

    if (!user) {
        return <Navigate to="/" />;
    }

    const handleLogout = async () => {
        try {
            const resp = await axios.post('/logout');
            if (resp.status === 200) {
                localStorage.removeItem("user");
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <nav className="bg-white border-grey-200 px-2 py-3 ">
                <div className="container flex flex-wrap item-center justify-between mx-auto">
                    <a href="#" className="flex item-center"> 
                        <img src="https://picsum.photos/200" alt="Logo" className="h-6 mr-3" />
                        <span className="self-center text-xl whitespace-nowrap">ArtFullstack</span>
                    </a>
                    <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex item-center p-2 ml-3 text-sm text-grey-500 rounded-lg hover:bg-grey-100 focus:outline-none focus:ring-grey-200"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                    >
                        <span>Open main menu</span>
                        <svg 
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000.svg"
                        >
                            <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                            ></path>
                        </svg>

                    </button>
                    <div className="w-full" id="navbar-default">
                        <ul className="flex flex-col p-4 border-grey-100 rounded-lg bg-grey-50">
                            <li>
                                <NavLink to="/ptofile">Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-grey-700 rounded hover:bg-grey-100" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="container flex justify-center flex-col items-center mt-10"> 
               <Outlet/>
            </main>
        </>
    )

}