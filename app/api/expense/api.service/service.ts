import { connectMongo } from "@/app/service/db.connection";
import { ExpenseMongo } from "../schema/expense.schema";
import { Types } from "mongoose";

async function getExpenseById({ expenseId }: { expenseId: string }) {
    const expense = await ExpenseMongo.findById(new Types.ObjectId(expenseId));
    return expense;
}


async function getExpensesByMonth({ month }: { month?: string | null }) {
    const matchQuery = month ? {
        date: {
            // check if the month is the same as the one in the query parameter
            $gte: new Date(new Date().getFullYear(), parseInt(month), 1),
            $lt: new Date(new Date().getFullYear(), parseInt(month) + 1, 0),
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

    // Only sum what is paid
    const total = expenses.reduce((acc, expense) => {
        if (expense.done) {
            return acc + expense.amount;
        }
    }, 0) ?? 0;
    const expected = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return {
        total,
        expected,
        expenses,
    }
}

export const apiService = {
    getExpenseById,
    getExpensesByMonth,
}