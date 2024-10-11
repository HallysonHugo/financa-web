import { ExpenseModel } from "@/app/expense/models/expense.model";
import { connectMongo } from "@/app/service/db.connection";
import exp from "constants";

export async function GET(request: Request) {
    await connectMongo();
    const result = await ExpenseModel.find();
    const total = result.map((expense) => expense.amount).reduce((acc, curr) => acc + curr, 0);
    return new Response(JSON.stringify(total), { status: 200 });
}