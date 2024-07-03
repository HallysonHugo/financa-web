import ExpenseModel from "../models/expense.model";
import repository from "../repository/expense.repository";

async function getAllExpenses() {
    return repository.getAllExpenses();
}


async function returnIncomes() {
    const expenses = await getAllExpenses();
    return expenses.filter((expense) => expense.amount > 0);
}


async function returnExpenses() {
    const expenses = await getAllExpenses();
    return expenses.filter((expense) => expense.amount < 0);
}


async function createExpense(income: ExpenseModel) {
    return await repository.createExpense(income);
}

const service = {
    getAllExpenses,
    returnIncomes,
    returnExpenses,
    createExpense
};

export default service;
