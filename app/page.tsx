"use client";
import ExpenseItem from "@/components/items/expense_items";
import currencyBrFormatter from "@/lib/formatters/currency_formatter";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState, useRef } from "react";
import Modal from "@/components/modals/modal";
import ExpenseModel from "./expense/models/expense.model";
import expenseController from "./expense/controller/expense.controller";

ChartJS.register(ArcElement, Tooltip, Legend);



const expenseItemsData: ExpenseModel[] = [
  {
    color: "red",
    title: "Comida",
    amount: -100,
    date: new Date(),
    done: false
  },
  {
    color: "blue",
    title: "Transporte",
    amount: -50,
    date: new Date(),
    done: false
  },
  {
    color: "green",
    title: "Salário",
    amount: 500,
    date: new Date(),
    done: false
  }
]

export default function Home() {
  //change the modal children and open the modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.JSX.Element | undefined>(undefined);
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
  const addRefreshPrevent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


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
          setModalChildren(<>
            <form className="flex flex-col gap-4">
              <div className="input-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  min={0.01}
                  step={0.01}
                  name="description"
                  required
                  placeholder="Infome a descricão" />
              </div>
              <div className="input-group">
                <label htmlFor="amount">Ganhos</label>
                <input
                  type="number"
                  min={0.01}
                  step={0.01}
                  name="amount"
                  required
                  placeholder="Infome o valor" />
              </div>
              <button onClick={() => {

              }} type="submit" className="btn btn-primary">Adicionar Ganho</button>
            </form>
          </>);
        }} className="btn btn-primary">
          + Ganhos
        </button>
        <button onClick={() => {
          setModalIsOpen(true);
          setModalChildren(
            <>
              <form className="flex flex-col gap-4">
                <div className="input-group">
                  <label htmlFor="description">Descrição</label>
                  <input
                    type="text"
                    min={0.01}
                    step={0.01}
                    name="description"
                    required
                    placeholder="Infome a descricão" />
                </div>

                <div className="input-group">
                  <label htmlFor="amount">Gastos</label>
                  <input
                    type="number"
                    min={0.01}
                    step={0.01}
                    name="amount"
                    required
                    placeholder="Infome o valor" />
                </div>
                {/* Add date picker */}
                <div className="input-group">
                  <label htmlFor="date">Data</label>
                  <input
                    type="date"
                    name="date"
                    required
                    placeholder="Infome a data" />
                </div>

                <button type="submit" className="btn btn-danger">Adicionar Gasto</button>

              </form>
            </>
          );
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
