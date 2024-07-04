import ExpenseModel from "../models/expense.model";
import axiosInstance from "@/app/service/axios.connection";

const expenseModel = "/expense/"

async function getAllExpenses() {
    const expenses = await axiosInstance.get(expenseModel);
    return expenses.data as ExpenseModel[];
}

async function getTotalExpenses() {
    const expenses = await axiosInstance.get(expenseModel + "total");
    return expenses;
}

async function createExpense(expense: ExpenseModel) {
    console.log(expense);
    await axiosInstance.post(expenseModel, {
        title: expense.title,
        description: expense.description,
        category: expense.category._id,
        installments: expense.installments,
        tax: expense.tax,
        amount: expense.amount,
        date: expense.date,
        done: expense.done
    });
}

async function updateExpense(expense: ExpenseModel) {
}

async function deleteExpense(expense: ExpenseModel) {

}

const repository = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses

}

export default repository;