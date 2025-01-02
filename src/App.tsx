import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Reports from './components/Reports';

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="add" element={<AddTransaction />} />
            <Route path="transactions" element={<TransactionList />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TransactionProvider>
  );
}

export default App;