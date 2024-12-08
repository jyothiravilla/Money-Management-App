// frontend/src/IncomeExpenseChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const IncomeExpenseChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Income',
                data: [],
                borderColor: '#8E5572',
                backgroundColor: 'rgba(142, 85, 114, 0.2)',
                fill: true,
            },
            {
                label: 'Expenses',
                data: [],
                borderColor: '#8A716A',
                backgroundColor: 'rgba(138, 113, 106, 0.2)',
                fill: true,
            },
        ],
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/transactions')
            .then(response => {
                const transactions = response.data;
                const incomeData = {};
                const expenseData = {};

                transactions.forEach(transaction => {
                    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
                    if (transaction.type === 'income') {
                        incomeData[month] = (incomeData[month] || 0) + parseFloat(transaction.amount);
                    } else if (transaction.type === 'expense') {
                        expenseData[month] = (expenseData[month] || 0) + parseFloat(transaction.amount);
                    }
                });

                const labels = Object.keys(incomeData).sort((a, b) => new Date(`1 ${a} 2020`) - new Date(`1 ${b} 2020`));
                const income = labels.map(label => incomeData[label] || 0);
                const expenses = labels.map(label => expenseData[label] || 0);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Income',
                            data: income,
                            borderColor: '#8E5572',
                            backgroundColor: 'rgba(142, 85, 114, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'Expenses',
                            data: expenses,
                            borderColor: '#8A716A',
                            backgroundColor: 'rgba(138, 113, 106, 0.2)',
                            fill: true,
                        },
                    ],
                });
            })
            .catch(error => {
                console.error('There was an error fetching the transactions!', error);
            });
    }, []);

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#8E5572', // Change x-axis labels color to #8E5572
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#8E5572', // Change y-axis labels color to #8E5572
                    callback: function(value) {
                        return '$' + value;
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#8E5572', // Change legend labels color to #8E5572
                },
            },
        },
    };

    return (
        <div style={{ backgroundColor: '#F2F7F2', padding: '20px', borderRadius: '10px' }}>
            <h2 className="text-center mb-4" style={{ color: '#8E5572' }}>Income vs Expenses</h2>
            {chartData.labels.length > 0 ? (
                <Line data={chartData} options={options} />
            ) : (
                <p className="text-center" style={{ color: '#8E5572' }}>No data available</p>
            )}
        </div>
    );
};

export default IncomeExpenseChart;