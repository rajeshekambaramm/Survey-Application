import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getProfile } from "../../services/userService";

export default function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const data = await getProfile();

            setUser(data);

        } catch (err) {

            console.log(err);

        }

    }

    return (

        <Card className="shadow border-0">

            <Card.Body>

                <h3>My Profile</h3>

                <hr />

                <p>

                    <strong>Username:</strong>

                    {" "}

                    {user?.username}

                </p>

                <p>

                    <strong>Email:</strong>

                    {" "}

                    {user?.email}

                </p>

            </Card.Body>

        </Card>

    );

}