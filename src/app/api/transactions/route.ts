import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export const prisma = new PrismaClient();

interface DataType {
  value: number;
  type: string;
  isIncome: boolean;
  description?: string;
}

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const { description, value, type, isIncome } = await req.json();

  const data: DataType = { value, type, isIncome };

  if (description) {
    data.description = description;
  }

  if (value <= 0) {
    return NextResponse.json(
      { error: 'Valor deve ser maior que zero' },
      { status: 400 }
    );
  }

  if (!type) {
    return NextResponse.json(
      { error: 'Tipo da transação é obrigatório' },
      { status: 400 }
    );
  }

  const newTransaction = await prisma.transaction.create({
    data,
  });

  return NextResponse.json(newTransaction, { status: 201 });
}
