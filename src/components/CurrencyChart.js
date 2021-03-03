import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";

const CurrencyChart = ({ rawData, toCurrency }) => {
    const ref = useRef();
    const sourceData = {x:[], y:[]};

    // Get data from rawData for x and y column of the chart
    const populateSourceData = (source) => {
        // Dates have to be sorted first, then populate sourceData with the help of this sorted array of keys
        const keys = Object.keys(source).sort();

        // Iterate over keys, check if currency is equal to selected currency, use only those rate values
        for(const key of keys) {
            for(const innerKey in source[key]) {
                if(innerKey === toCurrency) {
                    sourceData.x.push(key);
                    sourceData.y.push(source[key][innerKey]);
                }
            }
        }
    };

    populateSourceData(rawData);
   
    useEffect(() => {
        const ChartRef = ref.current.getContext("2d");    
        const CurrencyChart = new Chart(ChartRef, {
            type: 'line',
            data: {
                labels: sourceData.x,
                datasets: [{
                    label: `Currency rate changes for ${toCurrency}`,
                    data: sourceData.y,
                    borderColor: [
                        'rgba(0, 0, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: "black",
                        fontSize: 18,
                    }
                },    
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: Math.min(...sourceData.y),
                            suggestedMax: Math.max(...sourceData.y)
                        }
                    }]
                }
            }
        });

        // Remove old chart before re-render, old chart stays there the new one just overlaps it - this fixes the issue
        return () => {
            CurrencyChart.destroy();
        }
    }, [rawData, toCurrency]);

    return (
        <canvas id="myChart" width="300" height="200" ref={ref}></canvas>
    );
};

export default CurrencyChart;