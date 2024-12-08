// frontend/src/AddTransaction.js
import React, { useState } from 'react';
import axios from 'axios';
import ResetTransactions from './ResetTransactions';

const AddTransaction = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('income');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/transactions', {
            description,
            amount,
            date,
            type
        })
        .then(response => {
            console.log('Transaction added:', response.data);
            // Optionally, you can clear the form or update the transaction list here
        })
        .catch(error => {
            console.error('There was an error adding the transaction!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-start mb-3">
            <div className="form-group">
                <label>Description</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Amount</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Date</label>
                <input 
                    type="date" 
                    className="form-control" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Type</label>
                <select 
                    className="form-control" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className="button-group">
                <button type="submit" className="btn btn-custom btn-custom-size mb-2">Add Transaction</button>
                <ResetTransactions />
            </div>
        </form>
    );
};

export default AddTransaction;