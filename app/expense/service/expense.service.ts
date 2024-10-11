import { Category } from "../models/category.model";
import Expense from "../models/expense.model";
import repository from "../repository/expense.repository";

async function getAllExpenses(): Promise<Expense[]> {
    return repository.getAllExpenses();
}

async function getCategoryWithTotalExpenseValue() {
    const category = await repository.getCategoryWithTotalExpenseValue();
    const categoryModel: Category[] = category.data.map((data: any) => {
        return {
            _id: data.category._id,
            name: data.category.name,
            color: data.category.color,
            totalExpenses: data.totalExpense
        };
    });
    return categoryModel;
}

async function getTotalExpenses() {
    const expenses = await repository.getTotalExpenses();
    return expenses.data as number;
}


async function returnIncomes() {
    const expenses = await getAllExpenses();
    return expenses.filter((expense) => expense.amount > 0);
}


async function returnExpenses() {
    const expenses = await getAllExpenses();
    return expenses.filter((expense) => expense.amount < 0);
}


async function createExpense(income: Expense) {
    return await repository.createExpense(income);
}

const service = {
    getAllExpenses,
    returnIncomes,
    returnExpenses,
    createExpense,
    getTotalExpenses,
    getCategoryWithTotalExpenseValue
};

export default service;
