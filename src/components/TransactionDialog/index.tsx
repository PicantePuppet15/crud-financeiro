'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import {
  TransactionFormData,
  transactionFormSchema,
} from '@/schemas/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { postTransaction, putTransaction } from '@/http/fetch';
import { useTransactionStore } from '@/store/transactions';
import { TransactionProps } from '@/app/page';

export function TransactionDialog({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: TransactionProps;
}) {
  const { addTransaction, updateTransaction } = useTransactionStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const methods = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          value: 'R$ 00,00',
          description: '',
          isIncome: true,
          type: '',
        },
  });

  const onSubmit: SubmitHandler<TransactionFormData> = async (data) => {
    try {
      const body = {
        value: Number(data.value.replace(/\D/g, '')),
        type: data.type,
        isIncome: data.isIncome,
        description: data.description,
      };
      if (defaultValues) {
        putTransaction({
          ...body,
          id: defaultValues.id,
          createdAt: defaultValues.createdAt,
        }).then((data) => {
          updateTransaction(data);
        });
      } else {
        const newTransaction = await postTransaction(body);

        addTransaction(newTransaction);
        methods.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (defaultValues)
      methods.setValue(
        'value',
        (Number(defaultValues?.value) / 100).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <FormProvider {...methods}>
        <DialogContent>
          <DialogHeader className="mb-5">
            <DialogTitle>Nova transação</DialogTitle>
            <DialogDescription>
              Adicione uma nova transação a tabela
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={methods.handleSubmit(async (data) => {
              await onSubmit(data);
              setIsDialogOpen(false);
            })}
          >
            <div>
              <div className="flex gap-2">
                <div>
                  <label htmlFor="type" className="mb-1 text-gray-300 text-sm">
                    Tipo de transação
                  </label>
                  <Input
                    placeholder="ex.: Mercado, Padaria, etc."
                    className={`mb-4 ${
                      methods.formState.errors.type
                        ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-900'
                        : 'border-gray-300'
                    }`}
                    {...methods.register('type')}
                    name="type"
                    onError={(e) => {
                      console.log(e);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="mb-1 text-gray-300 text-sm"
                  >
                    Descrição (opcional)
                  </label>
                  <Input
                    placeholder="ex.: Conta de luz"
                    className={`mb-4 ${
                      methods.formState.errors.description
                        ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-900'
                        : 'border-gray-300'
                    }`}
                    {...methods.register('description')}
                    name="description"
                    onError={(e) => {
                      console.log(e);
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="value" className="mb-1 text-gray-300 text-sm">
                  Valor
                </label>
                <div className="mb-4 flex items-center gap-1">
                  <Input
                    className={`${
                      methods.formState.errors.value
                        ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-900'
                        : 'border-gray-300'
                    }`}
                    {...methods.register('value')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      const number = Number(raw) / 100;

                      const formatted = number.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      });

                      methods.setValue('value', formatted); // salva formatado no estado
                    }}
                    name="value"
                  />
                </div>
              </div>
              <div>
                <RadioGroup
                  defaultValue={
                    defaultValues
                      ? defaultValues.isIncome
                        ? 'income'
                        : 'expenses'
                      : 'income'
                  }
                  onValueChange={(value) =>
                    methods.setValue('isIncome', value === 'income')
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="income" id="income" />
                    <Label htmlFor="income">Entrada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expenses" id="expenses" />
                    <Label htmlFor="expenses">Saída</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="mb-4 hover:cursor-pointer hover:bg-green-600 hover:text-black text-white px-3 py-1 rounded-lg bg-green-800 transition ease-in-out duration-300"
              >
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
