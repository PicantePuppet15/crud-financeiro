import { TransactionDialog } from '@/components/TransactionDialog';
import { TransactionsTable } from '@/components/TransactionsTable';
import { Button } from '@/components/ui/button';

export interface TransactionProps {
  id: string;
  description?: string;
  value: string;
  type: string;
  isIncome: boolean;
  createdAt: Date;
}

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="flex items-center flex-col container">
        <h1 className="py-4 font-semibold text-[1.25rem]">
          Bem vindo ao tal do crud financeiro
        </h1>
        <TransactionDialog>
          <Button className="mb-4 hover:cursor-pointer hover:bg-gray-600 hover:text-white text-black px-3 py-1 rounded-lg bg-white transition ease-in-out duration-300">
            Adicionar nova transação
          </Button>
        </TransactionDialog>
        <TransactionsTable />
      </div>
    </main>
  );
}
