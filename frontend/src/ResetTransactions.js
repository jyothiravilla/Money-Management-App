// frontend/src/ResetTransactions.js
import React from 'react';
import axios from 'axios';

const ResetTransactions = () => {
    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all transactions? This action cannot be undone.')) {
            axios.post('http://localhost:5000/api/reset-transactions')
                .then(response => {
                    alert(response.data.message);
                    // Optionally, you can refresh the transaction list here
                })
                .catch(error => {
                    console.error('There was an error resetting the transactions!', error);
                });
        }
    };

    return (
        <button onClick={handleReset} className="btn btn-custom btn-custom-size">Reset Transactions</button>
    );
};

export default ResetTransactions;