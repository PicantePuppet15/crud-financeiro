'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { deleteTransaction, fetchAllData } from '@/http/fetch';
import { useCallback, useEffect } from 'react';
import { useTransactionStore } from '@/store/transactions';
import { TransactionDialog } from '../TransactionDialog';

export function TransactionsTable({}) {
  const { setTransactions, transactions, removeTransaction } =
    useTransactionStore();

  const getTransactions = useCallback(async () => {
    try {
      const data = await fetchAllData();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  }, [setTransactions]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);
  const handleDelete = async (id: string) => {
    deleteTransaction(id);
    removeTransaction(id);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right ">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="flex-1">{item.type}</TableCell>
                <TableCell className="font-medium flex-1">
                  {item.description ? item.description : '--'}
                </TableCell>
                <TableCell className="flex-1">
                  {new Date(item.createdAt).toLocaleDateString('pt-br')}
                </TableCell>
                <TableCell
                  className={`text-right font-semibold flex-1 ${
                    item.isIncome ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {(Number(item.value) / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell className="w-0">
                  <TransactionDialog defaultValues={item}>
                    <Button className="bg-transparent hover:bg-blue-600 hover:cursor-pointer text-white">
                      <Pencil size={18} />
                    </Button>
                  </TransactionDialog>
                </TableCell>
                <TableCell className="w-0">
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="bg-transparent hover:bg-red-700 hover:cursor-pointer text-white"
                  >
                    <Trash size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
