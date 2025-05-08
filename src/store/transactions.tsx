import { TransactionProps } from '@/app/page';
import { create } from 'zustand';

type State = {
  transactions: TransactionProps[];
};

type Actions = {
  setTransactions(transactions: TransactionProps[]): void;
  addTransaction: (transaction: TransactionProps) => void;
  updateTransaction: (transaction: TransactionProps) => void;
  removeTransaction: (id: string) => void;
};

export const useTransactionStore = create<State & Actions>((set) => ({
  transactions: [],
  setTransactions: (transactions: TransactionProps[]) => set({ transactions }),
  addTransaction: (transaction: TransactionProps) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  updateTransaction: (transaction: TransactionProps) =>
    set((state) => ({
      transactions: state.transactions.map((item) =>
        item.id === transaction.id ? transaction : item
      ),
    })),
  removeTransaction: (id: string) =>
    set((state) => ({
      transactions: state.transactions.filter((item) => item.id !== id),
    })),
}));
