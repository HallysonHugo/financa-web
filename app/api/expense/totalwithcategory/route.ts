import { ExpenseModel } from "@/app/expense/models/expense.model";
import { connectMongo } from "@/app/service/db.connection";

export async function GET(request: Request) {
    await connectMongo();
    const expenses = await ExpenseModel.find();
    const categories = expenses.map(expense => expense.category[0]);
    //return a list of object withou duplicated categories _id
    const uniqueCategories = [];
    categories.forEach(category => {
        if (!uniqueCategories.some(e => e._id.toString() === category._id.toString())) {
            uniqueCategories.push(category);
        }
    });
    //then we should calculate the total expense value for each category
    const categoryTotalExpense = uniqueCategories.map(category => {
        const totalExpense = expenses
            .filter(expense => expense.category[0]._id.toString() === category._id.toString())
            .reduce((acc, curr) => acc + curr.amount, 0);
        return {
            category,
            totalExpense
        };
    });
    return new Response(JSON.stringify(categoryTotalExpense), { status: 200 });
}