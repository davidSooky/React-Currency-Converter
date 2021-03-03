import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";

const CurrencyChart = () => {
    const ref = useRef();

    useEffect(() => {
        const ChartRef = ref.current.getContext("2d");
        const CurrencyChart = new Chart(ChartRef, {
            type: 'line',
            data: {
                labels: ['2020-03-01', '2020-03-02', '2020-03-03', '2020-03-04', '2020-03-05'],
                datasets: [{
                    label: 'Currency rate changes',
                    data: [12, 19, 3, 5, 2, 3],
                    // backgroundColor: [
                    //     'rgba(255, 99, 132, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(255, 206, 86, 0.2)',
                    //     'rgba(75, 192, 192, 0.2)',
                    //     'rgba(153, 102, 255, 0.2)'
                    // ],
                    borderColor: [
                        'rgba(0, 0, 0, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // Remove old chart before re-render, sometimes the old chart stays there the new one just overlaps it
        return () => {
            CurrencyChart.destroy();
        }
    }, []);

    return (
        <canvas id="myChart" width="300" height="200" ref={ref}></canvas>
    );
};

export default CurrencyChart;