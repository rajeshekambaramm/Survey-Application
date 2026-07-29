import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function SurveyPieChart({
    published,
    draft
}) {

    const data = {
        labels: ["Published", "Draft"],
        datasets: [
            {
                data: [published, draft],
                backgroundColor: [
                    "#198754",
                    "#6c757d"
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="card shadow border-0 p-3">
            <h5 className="mb-3">
                Survey Status
            </h5>

            <Pie data={data} />
        </div>
    );
}