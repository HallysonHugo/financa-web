import { connectMongo } from "@/app/service/db.connection";
import ExpenseSchemaModel, { ExpenseMongo } from "./schema/expense.schema";
import ExpenseModel from "@/app/expense/models/expense.model";
import { Types } from "mongoose";
import { match } from "assert";

export async function GET(request: Request) {
  await connectMongo();

  // Parse the URL to extract query parameters
  const { searchParams } = new URL(request.url);

  // For example, get the 'month' query parameter
  const month = searchParams.get('month');
  const matchQuery = month ? {
    date: {
      // check if the month is the same as the one in the query parameter
      $gte: new Date(new Date().getFullYear(), parseInt(month!), 1),
      $lt: new Date(new Date().getFullYear(), parseInt(month!) + 1, 0),
    }
  } : {};
  // You can now use 'month' in your MongoDB query if needed
  const result = await ExpenseMongo.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $match: matchQuery,
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
  const result = [];
  for (let i = 0; i < (body.installments ?? 1); i++) {
    const date = new Date(body.date)
    date.setMonth(date.getMonth() + i);
    const expenseSchemaModel: ExpenseSchemaModel = {
      title: body.title,
      description: body.description,
      categoryId: body.category?._id,
      installments: body.installments,
      tax: body.tax,
      amount: body.amount,
      date: date,
      done: false,
    };
    result.push(await ExpenseMongo.create(expenseSchemaModel));
  }
  return new Response(JSON.stringify(result), { status: 201 });
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
