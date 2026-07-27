import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function SurveyChart({ surveys }) {

    const data = {
        labels: surveys.map(s => s.title),
        datasets: [
            {
                label: "Questions",
                data: surveys.map(
                    s => s.questions?.length || 0
                ),
            },
            {
                label: "Responses",
                data: surveys.map(
                    s => s.responseCount || 0
                ),
            }
        ]
    };

    return (
        <Bar data={data} />
    );
}