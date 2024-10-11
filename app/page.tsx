"use client";
import ExpenseItem from "@/components/items/expense_items";
import currencyBrFormatter from "@/lib/formatters/currency_formatter";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState, useRef, useEffect } from "react";
import Modal from "@/components/modals/modal";
import Expense from "./expense/models/expense.model";
import expenseController from "./expense/controller/expense.controller";
import ExpenseForm from "@/components/forms/expense.form";
import { Category } from "./expense/models/category.model";

ChartJS.register(ArcElement, Tooltip, Legend);



export default function Home() {
  //change the modal children and open the modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.JSX.Element | undefined>(undefined);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [saldo, setSaldo] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);


  async function requiredData(): Promise<void> {
    await Promise.all([
      expenseController.getAllExpenses().then((data) => {
        setExpenses(data);
      }),
      expenseController.getTotalExpenses().then((data) => {
        setSaldo(data);
      }),
      expenseController.getCategoryWithTotalExpenseValue().then((data) => {
        setCategories(data);
      }),
    ]);
  }

  useEffect(() => {
    requiredData();
  }, []);

  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);


  return (<>
    {/* Modal */}
    <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} setModalChildren={setModalChildren}>
      {modalChildren}
    </Modal>
    {/* Main */}
    <main className="container mx-auto">
      {/* Balance */}
      <section className="py-3">
        <small className="text-gray-400 text-md">Wallet</small>
        <h2 className="text-4xl font-bold">{currencyBrFormatter(saldo)}</h2>
      </section>
      {/* Buttons */}
      <section className="flex items-center gap-2 py-3">
        <button onClick={() => {
          setModalIsOpen(true);
          setModalChildren(<ExpenseForm
            isIncome={true}
            descriptionRef={descriptionRef}
            amountRef={amountRef}
            dateRef={dateRef}
            onClick={(e) => {
              e.preventDefault();
              const description = descriptionRef.current?.value;
              const amount = amountRef.current?.value;
              const date = dateRef.current?.value;
              if (!description || !amount || !date) {
                return;
              }
              expenseController.addExpense(description, amount, new Date(date), true).then(() => {
                requiredData().then(() => {
                  setModalIsOpen(false);
                });
              });
            }} />);
        }} className="btn btn-primary">
          + Income
        </button>
        <button onClick={() => {
          setModalIsOpen(true);
          setModalChildren(<ExpenseForm
            isIncome={false}
            descriptionRef={descriptionRef}
            amountRef={amountRef}
            dateRef={dateRef}
            onClick={(e) => {
              e.preventDefault();
              const description = descriptionRef.current?.value;
              const amount = amountRef.current?.value;
              const date = dateRef.current?.value;
              if (!description || !amount || !date) {
                return;
              }
              expenseController.addExpense(description, amount, new Date(date), false).then(() => {
                requiredData().then(() => {
                  setModalIsOpen(false);
                });
              });
            }} />);
        }} className="btn btn-primary-outline">
          - Expense
        </button>
      </section>
      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">My expenses/incomes</h3>
        <div className="flex flex-col gap-4 mt-6">
          {/* Expense items. Three ways to render a list of items using map*/}
          {expenses.map((item, index) => {
            return <ExpenseItem key={index} title={item.title} amount={item.amount} color={item.category.color} />
          })}
          {/* {expenseItemsData.map((expense) => (
            <ExpenseItem key={expense.title} {...expense} />
          ))} */}
          {/* {expenseItemsData.map((expense) => (
            <ExpenseItem key={expense.title} color={expense.color} title={expense.title} amount={expense.amount} />
          ))} */}
        </div>
      </section>
      {/* chats */}
      <section className="py-6">
        <h3 className="text-2xl">Expenses/Incomes by category</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut data={{
            //category must not show more than 1 time
            labels: categories.map(item => item.name),
            datasets: [{
              label: "Expenses by category",
              data: categories.map(item => item.totalExpenses),
              backgroundColor: categories.map(item => item.color),
              borderColor: ["#f9f9f9"],
              borderWidth: 1
            }]
          }} />
        </div>
      </section>
    </main>
  </>
  )
}
