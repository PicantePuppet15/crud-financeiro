import { prisma } from '../route';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'ID da transação é obrigatório' },
      { status: 400 }
    );
  }

  const updatedTransaction = await prisma.transaction.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(updatedTransaction, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const { description, value, type, isIncome } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID da transação é obrigatório' },
        { status: 400 }
      );
    }

    if (!description && !value && !type && !isIncome) {
      return NextResponse.json(
        { error: 'Nenhum campo foi alterado' },
        { status: 400 }
      );
    }

    if (value <= 0) {
      return NextResponse.json(
        { error: 'Valor deve ser maior que zero' },
        { status: 400 }
      );
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        description,
        value,
        type,
        isIncome,
      },
    });

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar transação', error: error },
      { status: 500 }
    );
  }
}
