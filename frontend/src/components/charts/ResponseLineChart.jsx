import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function ResponseLineChart({ trend }) {

    const data = {

        labels: trend.map(item => item.date),

        datasets: [

            {

                label: "Responses",

                data: trend.map(
                    item => item.responses
                ),

                borderColor: "#0d6efd",

                backgroundColor: "rgba(13,110,253,0.25)",

                fill: true,

                tension: 0.4,

                pointRadius: 5,

                pointHoverRadius: 7

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: true

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    precision: 0

                }

            }

        }

    };

    return (

        <Line
            data={data}
            options={options}
        />

    );

}