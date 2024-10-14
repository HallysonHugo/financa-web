import { connectMongo } from "@/app/service/db.connection";
import ExpenseSchemaModel, { ExpenseMongo } from "./schema/expense.schema";
import ExpenseModel from "@/app/expense/models/expense.model";
import { Types } from "mongoose";

export async function GET(request: Request) {
  await connectMongo();
  const result = await ExpenseMongo.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
  ]);
  const expenses = result?.map((expense) => {
    return {
      ...expense,
      category: expense.category[0],
    };
  });
  const total = expenses?.reduce((acc, expense) => acc + expense.amount, 0);
  return new Response(
    JSON.stringify({
      total: total,
      expenses: expenses,
    }),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  await connectMongo();
  const body: ExpenseModel = await request.json();
  const expenseSchemaModel: ExpenseSchemaModel = {
    title: body.title,
    description: body.description,
    categoryId: body.category?._id,
    installments: body.installments,
    tax: body.tax,
    amount: body.amount,
    date: body.date,
    done: body.done,
  };
  const expense = await ExpenseMongo.create(expenseSchemaModel);
  return new Response(JSON.stringify(expense), { status: 201 });
}

export async function PUT(request: Request) {
  await connectMongo();
  const body = await request.json();
  const expense = await ExpenseMongo.updateOne(body._id);
  return new Response(JSON.stringify(expense), { status: 200 });
}

export async function DELETE(request: Request) {
  await connectMongo();
  const body = await request.json();
  const expense = await ExpenseMongo.deleteOne({ _id: body._id });
  return new Response(JSON.stringify(expense), { status: 200 });
}
