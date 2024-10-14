import { connectMongo } from "@/app/service/db.connection";
import { ExpenseMongo } from "../../expense/schema/expense.schema";
import { CategoryMongo } from "../schema/category.schema";

export async function GET(request: Request) {
  await connectMongo();
  const result = await CategoryMongo.aggregate([
    {
      $lookup: {
        from: "expenses",
        localField: "_id",
        foreignField: "categoryId",
        as: "expenses",
      },
    },
    {
      $project: {
        name: 1,
        color: 1,
        totalExpense: {
          $sum: "$expenses.amount",
        },
      },
    },
  ])
    .sort({ totalExpense: -1 })
    .exec();
  return new Response(JSON.stringify(result), { status: 200 });
}
