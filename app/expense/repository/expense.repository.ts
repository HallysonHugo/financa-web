import ExpenseModel from "../models/expense.model";

async function getAllExpenses() {
    return [] as ExpenseModel[];
}

async function createExpense(expense: ExpenseModel) {

}

async function updateExpense(expense: ExpenseModel) {

}

async function deleteExpense(expense: ExpenseModel) {

}

const repository = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense

}

export default repository;