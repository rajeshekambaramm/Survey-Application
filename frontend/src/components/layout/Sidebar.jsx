import {
    NavLink,
    useNavigate
} from "react-router-dom";

import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";

import {
    FaHome,
    FaClipboardList,
    FaPlusCircle,
    FaChartBar,
    FaSignOutAlt,
    FaUserCircle,
    FaUser
} from "react-icons/fa";

export default function Sidebar({

    open,

    setOpen

}) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

useEffect(() => {

    loadProfile();

}, []);

const loadProfile = async () => {
    try {
        const data = await getProfile();
        setUser(data);
    } catch (error) {
        console.log(error);
    }
};

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <div
        className={
            open
                ? "sidebar sidebar-open bg-dark text-white d-flex flex-column"
                : "sidebar bg-dark text-white d-flex flex-column"
            }
        >

            <div>

                <h3 className="text-center py-4">

                    Survey App

                </h3>

                <hr className="text-secondary"/>

                <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className={({isActive})=>
                        isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                    }
                >

                    <FaHome />

                    <span>Dashboard</span>

                </NavLink>

                <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className={({isActive})=>
                        isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                    }
                >

                    <FaClipboardList />

                    <span>My Surveys</span>

                </NavLink>

                <NavLink
                    to="/create-survey"
                    onClick={() => setOpen(false)}
                    className={({isActive})=>
                        isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                    }
                >

                    <FaPlusCircle />

                    <span>Create Survey</span>

                </NavLink>

                <NavLink
                    to="/analytics"
                    onClick={() => setOpen(false)}
                    className="sidebar-link"
                >

                    <FaChartBar />

                    <span>Analytics</span>

                </NavLink>

                <NavLink
    to="/profile"
    onClick={() => setOpen(false)}
    className={({ isActive }) =>
        isActive
            ? "sidebar-link active"
            : "sidebar-link"
    }
>

    <FaUser />

    <span>My Profile</span>

</NavLink>

            </div>
            

            <div className="mt-auto">

                <hr className="text-secondary"/>

                <div className="sidebar-user">

    <FaUserCircle size={28} />

    <div>

        <strong>

            {user?.username || "User"}

        </strong>

        <br />

        <small>

            {user?.email || ""}

        </small>

    </div>

</div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <FaSignOutAlt/>

                    Logout

                </button>

            </div>

        </div>

    );

}