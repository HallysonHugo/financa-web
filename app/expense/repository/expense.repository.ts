import ExpenseModel from "../models/expense.model";

async function getAllExpenses() {
  const response = await fetch("/api/expense");
  return await response.json();
}

async function getCategoryWithTotalExpenseValue() {
  const response = await fetch("/api/category/total");
  return response.json();
}

async function getTotalExpenses() {
  const response = await fetch("/api/expense/total");
  return response.json();
}

async function createExpense(expense: ExpenseModel) {
  console.log(expense);
  const response = await fetch("/api/expense", {
    body: JSON.stringify(expense),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function updateExpense(expense: ExpenseModel) {
  const response = await fetch("/api/expense", {
    body: JSON.stringify(expense),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function deleteExpense(expenseId: string) {
  const response = await fetch("/api/expense", {
    body: JSON.stringify({ _id: expenseId }),
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function getExpensesByMonth(month: number) {
  const response = await fetch(`/api/expense?month=${month}`);
  return response.json();
}

async function getCategories() {
  const response = await fetch("/api/category");
  return response.json();
}

const repository = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getTotalExpenses,
  getCategoryWithTotalExpenseValue,
  getCategories,
  getExpensesByMonth,
};

export default repository;
