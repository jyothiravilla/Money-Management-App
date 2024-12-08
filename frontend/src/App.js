// frontend/src/App.js
import React from 'react';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import IncomeExpenseChart from './IncomeExpenseChart';

const App = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Money Management App</h1>
            <AddTransaction />
            <TransactionList />
            <IncomeExpenseChart />
        </div>
    );
};

export default App;