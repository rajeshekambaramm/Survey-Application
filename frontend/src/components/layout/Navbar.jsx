import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar({ toggleSidebar }) {

    const { theme, toggleTheme } = useTheme();

    return (

        <nav className="navbar bg-white shadow-sm px-3">

            <button
                className="btn btn-outline-primary d-lg-none"
                onClick={toggleSidebar}
            >
                <FaBars />
            </button>

            <h4 className="mb-0 ms-3">
                Survey Dashboard
            </h4>

            <button
                className="btn btn-outline-secondary ms-auto"
                onClick={toggleTheme}
            >
                {
                    theme === "light"
                        ? <FaMoon />
                        : <FaSun />
                }
            </button>

        </nav>

    );
}