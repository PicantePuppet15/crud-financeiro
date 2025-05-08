import { z } from 'zod';

export const transactionFormSchema = z.object({
  value: z.string().nonempty('Valor é obrigatório'),
  description: z.string().optional(),
  isIncome: z.boolean(),
  type: z.string().nonempty('Valor é obrigatório'),
});

export type TransactionFormData = z.infer<typeof transactionFormSchema>;
