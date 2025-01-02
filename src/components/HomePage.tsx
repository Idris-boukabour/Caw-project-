import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import Card from './shared/Card';
import StatCard from './shared/StatCard';
import { format } from 'date-fns';

const HomePage: React.FC = () => {
  const { state } = useTransactions();

  const totalIncome = state.transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Masroofy</h1>
        <p className="text-gray-600">Track your expenses, achieve your financial goals</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Income"
          amount={totalIncome}
          icon={ArrowUpCircle}
          type="income"
        />
        <StatCard
          title="Total Expenses"
          amount={totalExpenses}
          icon={ArrowDownCircle}
          type="expense"
        />
        <StatCard
          title="Balance"
          amount={balance}
          icon={Wallet}
          type="balance"
        />
      </div>

      <Card className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <span className="text-sm text-gray-500">Last 5 transactions</span>
        </div>
        <div className="divide-y">
          {state.transactions.slice(-5).map((transaction) => (
            <div
              key={transaction.id}
              className="py-4 flex items-center justify-between hover:bg-gray-50 rounded-lg px-4 -mx-4"
            >
              <div>
                <p className="font-medium text-gray-900">{transaction.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">
                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </span>
                  <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full">
                    {transaction.category}
                  </span>
                </div>
              </div>
              <p className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'} {transaction.amount.toFixed(2)} DZD
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomePage;