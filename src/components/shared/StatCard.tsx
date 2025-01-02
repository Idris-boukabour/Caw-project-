import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  type: 'income' | 'expense' | 'balance';
}

const colorMap = {
  income: 'bg-green-50 text-green-600 border-green-200',
  expense: 'bg-red-50 text-red-600 border-green-200',
  balance: 'bg-blue-50 text-blue-600 border-blue-200',
};

const StatCard: React.FC<StatCardProps> = ({ title, amount, icon: Icon, type }) => (
  <div className={`rounded-xl border p-6 ${colorMap[type]} transition-transform hover:scale-105`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="text-2xl font-bold mt-1">{amount.toFixed(2)} DZD</p>
      </div>
      <Icon className="h-8 w-8 opacity-80" />
    </div>
  </div>
);

export default StatCard;