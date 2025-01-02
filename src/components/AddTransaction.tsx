import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../context/TransactionContext';
import { TransactionCategory, TransactionType, ExpenseCategory, IncomeCategory } from '../types/transaction';
import Button from './shared/Button';
import Card from './shared/Card';

const AddTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useTransactions();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Other' as TransactionCategory,
    type: 'expense' as TransactionType,
    notes: '',
  });

  const expenseCategories: ExpenseCategory[] = [
    'Groceries',
    'Transportation',
    'Entertainment',
    'Housing',
    'Utilities',
    'Healthcare',
    'Education',
    'Shopping',
    'Dining',
    'Other'
  ];

  const incomeCategories: IncomeCategory[] = [
    'Salary',
    'Freelance',
    'Investment',
    'Business',
    'Rental',
    'Gift',
    'Other'
  ];

  const handleTypeChange = (type: TransactionType) => {
    setFormData({
      ...formData,
      type,
      category: 'Other' // Reset category when switching types
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = {
      id: Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    navigate('/transactions');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <Button
            type="button"
            variant={formData.type === 'income' ? 'primary' : 'secondary'}
            onClick={() => handleTypeChange('income')}
            className="flex-1"
          >
            Income
          </Button>
          <Button
            type="button"
            variant={formData.type === 'expense' ? 'danger' : 'secondary'}
            onClick={() => handleTypeChange('expense')}
            className="flex-1"
          >
            Expense
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (DZD)
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as TransactionCategory })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {formData.type === 'expense' ? (
              expenseCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))
            ) : (
              incomeCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Add Transaction
        </Button>
      </form>
    </Card>
  );
};

export default AddTransaction;