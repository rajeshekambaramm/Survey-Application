import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                background: "#f8f9fa"
            }}
        >

            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />

            <div className="flex-grow-1">

                <Navbar
                    toggleSidebar={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />
                <div className="container mt-4">
                    {children}
                </div>

            </div>
        </div>
    );
}