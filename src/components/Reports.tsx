import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useTransactions } from '../context/TransactionContext';
import Card from './shared/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports: React.FC = () => {
  const { state } = useTransactions();

  // Calculate category-wise expenses
  const categoryExpenses = state.transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Calculate monthly income vs expenses
  const monthlyData = state.transactions.reduce(
    (acc, t) => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' });
      if (t.type === 'income') {
        acc.income[month] = (acc.income[month] || 0) + t.amount;
      } else {
        acc.expenses[month] = (acc.expenses[month] || 0) + t.amount;
      }
      return acc;
    },
    { income: {} as Record<string, number>, expenses: {} as Record<string, number> }
  );

  const pieChartData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        data: Object.values(categoryExpenses),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(monthlyData.income),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyData.income),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: Object.values(monthlyData.expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Financial Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Expense Distribution by Category</h3>
          <div className="aspect-square">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Monthly Income vs Expenses</h3>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Reports;