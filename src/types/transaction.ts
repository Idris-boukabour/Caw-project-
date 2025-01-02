export type ExpenseCategory =
  | 'Groceries'
  | 'Transportation'
  | 'Entertainment'
  | 'Housing'
  | 'Utilities'
  | 'Healthcare'
  | 'Education'
  | 'Shopping'
  | 'Dining'
  | 'Other';

export type IncomeCategory =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Business'
  | 'Rental'
  | 'Gift'
  | 'Other';

export type TransactionCategory = ExpenseCategory | IncomeCategory;
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: TransactionCategory;
  type: TransactionType;
  notes?: string;
}