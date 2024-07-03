
import ExpenseModel from "../models/expense.model";
import service from "../service/expense.service";


async function getAllExpenses() {
    return service.getAllExpenses();
}


async function createExpense(income: ExpenseModel) {
    return service.createExpense(income);
}