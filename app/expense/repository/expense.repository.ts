import Expense from "../models/expense.model";



async function getAllExpenses(): Promise<Expense[]> {
    const response = await fetch('/api/expense')
    return response.json();
}

async function getCategoryWithTotalExpenseValue() {
    const response = await fetch('/api/expense')
    return response.json();
}

async function getTotalExpenses() {
    const response = await fetch('/api/expense/total')
    return response.json();
}

async function createExpense(expense: Expense) {
    console.log(expense);
    const response = await fetch('/api/expense', {
        body: JSON.stringify(expense),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

async function updateExpense(expense: Expense) {
    const response = await fetch('/api/expense', {
        body: JSON.stringify(expense),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

async function deleteExpense(expense: Expense) {
    const response = await fetch('/api/expense', {
        body: JSON.stringify(expense),
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

const repository = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
    getCategoryWithTotalExpenseValue

}

export default repository;