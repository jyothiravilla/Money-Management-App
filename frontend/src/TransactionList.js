// frontend/src/TransactionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = () => {
        axios.get('http://localhost:5000/api/transactions')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the transactions!', error);
            });
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            {transactions.length === 0 ? (
                <p>No transactions available.</p>
            ) : (
                <ul className="list-group">
                    {transactions.map(transaction => (
                        <li key={transaction.id} className="list-group-item">
                            {transaction.description} - ${transaction.amount} on {new Date(transaction.date).toLocaleDateString()} ({transaction.type})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;