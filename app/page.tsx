"use client";
import ExpenseItem, { ExpenseItemProps } from "@/components/items/expense_items";
import currencyBrFormatter from "@/lib/formatters/currency_formatter";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState } from "react";
import Modal from "@/components/modals/modal";

ChartJS.register(ArcElement, Tooltip, Legend);


const expenseItemsData: ExpenseItemProps[] = [
  {
    color: "red",
    title: "Comida",
    amount: -100
  },
  {
    color: "blue",
    title: "Transporte",
    amount: -50
  },
  {
    color: "green",
    title: "Salário",
    amount: 500
  }
]

export default function Home() {
  //change the modal children and open the modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.JSX.Element | undefined>(undefined);

  return (<>
    {/* Modal */}
    <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} setModalChildren={setModalChildren}>
      {modalChildren}
    </Modal>
    {/* Main */}
    <main className="container mx-auto">
      {/* Balance */}
      <section className="py-3">
        <small className="text-gray-400 text-md">Saldo</small>
        <h2 className="text-4xl font-bold">{currencyBrFormatter(10000)}</h2>
      </section>
      {/* Buttons */}
      <section className="flex items-center gap-2 py-3">
        <button onClick={() => {
          setModalIsOpen(true);
          setModalChildren(<h1>Modal aberto ganhos</h1>);
        }} className="btn btn-primary">
          + Ganhos
        </button>
        <button onClick={() => {
          setModalIsOpen(true);
          setModalChildren(<h1>Modal aberto gastos</h1>);
        }} className="btn btn-primary-outline">
          - Gastos
        </button>
      </section>
      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">Meus gastos</h3>
        <div className="flex flex-col gap-4 mt-6">
          {/* Expense items. Three ways to render a list of items using map*/}
          {expenseItemsData.map((item, index) => {
            return <ExpenseItem key={index} {...item} />
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
        <h3 className="text-2xl">Stats</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut data={{
            labels: expenseItemsData.map(item => item.title),
            datasets: [{
              label: "Gastos",
              data: expenseItemsData.map(item => item.amount),
              backgroundColor: expenseItemsData.map(item => item.color),
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
