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

export default function StatusPieChart({

    published,

    draft

}) {

    const data = {

        labels: [

            "Published",

            "Draft"

        ],

        datasets: [

            {

                data: [

                    published,

                    draft

                ],

                backgroundColor: [

                    "#198754",

                    "#6c757d"

                ],

                borderWidth: 1

            }

        ]

    };

    return (

        <Pie data={data} />

    );

}