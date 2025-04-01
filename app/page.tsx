"use client"
import ExpenseItem from "@/components/items/expense_items";
import currencyBrFormatter from "@/lib/formatters/currency_formatter";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState, useRef, useEffect } from "react";
import Modal from "@/components/modals/modal";
import ExpenseModel from "./expense/models/expense.model";
import expenseController from "./expense/controller/expense.controller";
import ExpenseForm from "@/components/forms/expense.form";
import { CategoryModel } from "./category/models/category.model";
import { set } from "mongoose";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<
    React.JSX.Element | undefined
  >(undefined);
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
  const [saldo, setSaldo] = useState<number>(0);
  const [expected, setExpected] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  // Track selected month (0-11 corresponds to Jan-Dec)
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const router = useRouter();

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro", "Todos"
  ];

  async function requiredData(): Promise<void> {

    await Promise.all([
      expenseController.getExpensesByMonth(selectedMonth).then((data) => {
        setExpenses(data.expenses);
        setSaldo(data.total);
        setExpected(data.expected);
      }),
      expenseController.getCategoryWithTotalExpenseValue().then((data) => {
        setCategories(data);
      }),
    ]);
  }

  useEffect(() => {
    requiredData();
  }, [selectedMonth]);

  return (
    <>
      {/* Modal */}
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setModalChildren={setModalChildren}
      >
        {modalChildren}
      </Modal>
      {/* Main */}
      <main className="container mx-auto">
        {/* Horizontal list of months */}
        <section className="py-3">
          <h3 className="text-2xl">Filter by Month</h3>
          <div className="flex overflow-x-auto py-2 gap-4">
            {months.map((month, index) => (
              <button
                key={month}
                className={`px-4 py-2 rounded ${selectedMonth === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
                  }`}
                onClick={() => setSelectedMonth(index)}
              >
                {month}
              </button>
            ))}
          </div>
        </section>

        {/* Balance */}
        <div className="
          grid grid-cols-1
          md:grid-cols-2
          gap-4
          py-6
        ">
          <section className="py-3">
            <small className="text-gray-400 text-md">Saldo</small>
            <h2 className="text-4xl font-bold">{currencyBrFormatter(saldo)}</h2>
          </section>
          <section className="py-3">
            <small className="text-gray-400 text-md">Valor previsto</small>
            <h2 className="text-4xl font-bold">{currencyBrFormatter(expected)}</h2>
          </section>
        </div>

        {/* Buttons */}
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              router.push("/expense?isIncome=true");
            }}
            className="btn btn-primary"
          >
            + Income
          </button>
          <button
            onClick={() => {
              router.push("/expense?isIncome=false");
            }}
            className="btn btn-primary-outline"
          >
            - Expense
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My expenses/incomes</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((item, index) => {
              return (
                <ExpenseItem
                  key={item._id?.toString() ?? index}
                  onClick={() => {
                    const isIncome = item.amount >= 0;
                    router.push(`/expense?isIncome=${isIncome}&id=${item._id}`);
                  }}
                  onDelete={() => {
                    expenseController.deleteExpense(item).then(() => {
                      requiredData();
                    });
                  }}
                  title={item.title}
                  amount={item.amount}
                  color={item.category?.color ?? "#000"}
                />
              );
            })}
          </div>
        </section>

        {/* Expenses by category */}
        <section className="py-6">
          <div className="flex">
            <h3 className="text-2xl px-3">Expenses/Incomes by category</h3>
            <button
              onClick={() => {
                router.push('/category');
              }}
              className="btn btn-primary"
            >
              Add Category
            </button>
          </div>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: categories.map((item) => item.name),
                datasets: [
                  {
                    label: categories.map((item) => item.name).join(","),
                    data: categories.map((item) => item.totalExpenses),
                    backgroundColor: categories.map((item) => item.color),
                    borderColor: ["#f9f9f9"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}