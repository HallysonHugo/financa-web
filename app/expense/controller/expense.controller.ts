
import ExpenseModel from "../models/expense.model";
import service from "../service/expense.service";

async function getAllExpenses() {
    return service.getAllExpenses();
}


async function addExpense(description: string, amount: string, date: Date, isIncome: boolean) {
    if (!description || !amount || !date) {
        return;
    }
    let convertedAmout;
    if (isIncome) {
        convertedAmout = parseFloat(amount);
    } else {
        convertedAmout = parseFloat(amount) * -1;
    }
    const expense = {
        title: description,
        description: description,
        amount: convertedAmout,
        date: new Date(date),
        category: {
            _id: "6686bb3a7e758d21a17d2316",
            name: "Outros",
            color: "#000000",
            totalExpenses: 0
        },
        done: false
    };
    expenseController.createExpense(expense);
}

async function getTotalExpenses() {
    return service.getTotalExpenses();
}


async function createExpense(income: ExpenseModel) {
    return service.createExpense(income);
}

const expenseController = {
    getAllExpenses,
    createExpense,
    getTotalExpenses,
    addExpense
}

export default expenseController;