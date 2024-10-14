import { CategoryModel } from "../models/category.model";
import ExpenseModel from "../models/expense.model";
import repository from "../repository/expense.repository";

interface GetAllExpensesProps {
  total: number;
  expenses: ExpenseModel[];
}

async function getAllExpenses(): Promise<GetAllExpensesProps> {
  const result: GetAllExpensesProps = await repository.getAllExpenses();
  return result;
}

async function getCategoryWithTotalExpenseValue() {
  const category = await repository.getCategoryWithTotalExpenseValue();
  const categoryModel: CategoryModel[] = category.map((data: any) => {
    return {
      _id: data._id,
      name: data.name,
      color: data.color,
      totalExpenses: data.totalExpense,
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
  return expenses.expenses.filter((expense) => expense.amount > 0);
}

async function returnExpenses() {
  const expenses = await getAllExpenses();
  return expenses.expenses.filter((expense) => expense.amount < 0);
}

async function createExpense(income: ExpenseModel) {
  return await repository.createExpense(income);
}

const service = {
  getAllExpenses,
  returnIncomes,
  returnExpenses,
  createExpense,
  getTotalExpenses,
  getCategoryWithTotalExpenseValue,
};

export default service;
