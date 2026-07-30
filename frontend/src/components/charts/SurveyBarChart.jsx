import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function SurveyBarChart({
    total,
    published,
    draft,
    responses
}) {

    const data = {
        labels: [
            "Total",
            "Published",
            "Draft",
            "Responses"
        ],
        datasets: [
            {
                label: "Survey Statistics",
                data: [
                    total,
                    published,
                    draft,
                    responses
                ],
                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#6c757d",
                    "#ffc107"
                ]
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <Bar
            data={data}
            options={options}
        />
    );
}