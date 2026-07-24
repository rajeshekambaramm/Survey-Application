import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
//import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    //const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(formData);

            if (!data.success) {
                setError(data.message);
                return;
            }
            localStorage.setItem("token", data.access_token);

// We'll load the user from /auth/me later
            navigate("/dashboard");

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Invalid email or password"
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow">
                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button className="btn btn-primary w-100">
                                    Login
                                </button>

                            </form>

                            <div className="text-center mt-3">
                                Don't have an account?{" "}
                                <Link to="/register">
                                    Register
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
