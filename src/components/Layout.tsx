import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Wallet, PlusCircle, List, PieChart } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => `
    flex items-center space-x-2 px-4 py-2 rounded-md transition-colors
    ${isActive(path) 
      ? 'bg-indigo-700 text-white' 
      : 'text-indigo-100 hover:bg-indigo-700'}
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <Wallet className="h-8 w-8" />
              <span className="text-2xl font-bold">Masroofy</span>
            </Link>
            <div className="flex space-x-2">
              <Link to="/" className={linkClass('/')}>
                <PieChart className="h-5 w-5" />
                <span>Overview</span>
              </Link>
              <Link to="/add" className={linkClass('/add')}>
                <PlusCircle className="h-5 w-5" />
                <span>Add</span>
              </Link>
              <Link to="/transactions" className={linkClass('/transactions')}>
                <List className="h-5 w-5" />
                <span>Transactions</span>
              </Link>
              <Link to="/reports" className={linkClass('/reports')}>
                <PieChart className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;