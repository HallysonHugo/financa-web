import { ExpenseModel } from "@/app/expense/models/expense.model";
import { connectMongo } from "@/app/service/db.connection";

export async function GET(request: Request) {
    await connectMongo();
    const result = await ExpenseModel?.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        }
    ]);
    const expenses = result?.map((expense) => {
        return {
            ...expense,
            category: expense.category[0]
        }
    });
    return new Response(JSON.stringify(expenses), { status: 200 });
}

export async function POST(request: Request) {
    await connectMongo();
    const body = await request.json();
    const expense = await ExpenseModel?.create(body);
    return new Response(JSON.stringify(expense), { status: 201 });
}

export async function PUT(request: Request) {
    await connectMongo();
    const body = await request.json();
    const expense = await ExpenseModel?.updateOne(body._id);
    return new Response(JSON.stringify(expense), { status: 200 });
}

export async function DELETE(request: Request) {
    await connectMongo();
    const body = await request.json();
    const expense = await ExpenseModel?.deleteOne({ _id: body._id });
    return new Response(JSON.stringify(expense), { status: 200 });
}
