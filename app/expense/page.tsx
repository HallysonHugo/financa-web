"use client"
import expenseController from "@/app/expense/controller/expense.controller";
import { CategoryModel } from "@/app/category/models/category.model";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function ExpenseForm() {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const searchParams = useSearchParams();
    let descriptionRef = useRef<HTMLInputElement>(null);
    let amountRef = useRef<HTMLInputElement>(null);
    let dateRef = useRef<HTMLInputElement>(null);
    let installmentsRef = useRef<HTMLInputElement>(null);
    let isFullValueRef = useRef<HTMLInputElement>(null);
    const isIncome = searchParams.get("isIncome") === "true";
    const expenseId = searchParams.get("id");


    useEffect(() => {
        expenseController.getCategories().then((data) => {
            setCategories(data);
        });
        if (expenseId) {
            expenseController.getExpenseById(expenseId).then((data) => {
                console.log(data);
                descriptionRef.current!.value = data.description;
                amountRef.current!.value = data.amount.toString() > "0" ? data.amount.toString() : (data.amount * -1).toString();
                dateRef.current!.value = data.date.split("T")[0];
                installmentsRef.current!.value = data.installments?.toString() ?? 1;
            });
        }
    }, []);

    async function addExpenseOrIncome(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        e.preventDefault();
        const description = descriptionRef.current?.value;
        const amount = amountRef.current?.value;
        const date = dateRef.current?.value;
        const installments = installmentsRef.current?.value
        //TODO: implement isFullValue
        const isFullValue = isFullValueRef.current?.checked ?? false;
        if (!description || !amount || !date || !installments) {
            return;
        }
        await expenseController.addExpense(description, amount, new Date(date), isIncome, false, parseInt(installments ?? "1"));

    }
    async function updateExpense(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const description = descriptionRef.current?.value;
        const amount = amountRef.current?.value;
        const date = dateRef.current?.value;
        const installments = installmentsRef.current?.value
        if (!description || !amount || !date || !installments) {
            return;
        }
        // await expenseController.updateExpense(expenseId, ));
    }
    return (
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
                        ref={descriptionRef}
                        placeholder="Infome a descricão"
                    />
                </div>
                {/* Create a dropdown with categories */}
                <div className="input-group">
                    <label htmlFor="category">Categoria</label>
                    <select
                        className="px-4 py-2 bg-slate-600 rounded-xl"
                        name="category"
                        required
                    >
                        {categories.map((category) => (
                            <option
                                className="capitalize text-gray-800"
                                key={category._id?.toString()}
                                value={category._id?.toString()}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="amount">Gastos</label>
                    <input
                        type="number"
                        min={0.01}
                        step={0.01}
                        name="amount"
                        required
                        ref={amountRef}
                        placeholder="Infome o valor"
                    />
                </div>
                <div>
                    {/* a checkbox to verify if it will be the whole value or the installment value */}
                    <input type="checkbox" name="installmentValue" />
                    <label htmlFor="installmentValue">Valor da parcela</label>
                </div>
                {
                    !isIncome && (
                        <div className="input-group">
                            <label htmlFor="installments">Parcelas</label>
                            <input
                                type="number"
                                min={1}
                                step={1}
                                name="installments"
                                required
                                placeholder="Infome o número de parcelas"
                                ref={installmentsRef}
                            />
                        </div>
                    )
                }
                {/* Add date picker */}
                <div className="input-group">
                    <label htmlFor="date">Data</label>
                    <input
                        type="date"
                        name="date"
                        required
                        ref={dateRef}
                        placeholder="Infome a data"
                    />
                </div>
                <div>
                    {/* a checkbox to verify if it will be the whole value or the installment value */}
                    <input type="checkbox" name="paid" ref={isFullValueRef} />
                    <label htmlFor="paid">Pago ou recebido</label>
                </div>
                {expenseId ? (
                    <button type="submit" onClick={addExpenseOrIncome} className="btn btn-primary">
                        Editar
                    </button>
                ) :

                    isIncome ? (
                        <button type="submit" onClick={addExpenseOrIncome} className="btn btn-primary">
                            Adicionar Ganho
                        </button>
                    ) : (
                        <button type="submit" onClick={addExpenseOrIncome} className="btn btn-danger">
                            Adicionar Gasto
                        </button>
                    )}
            </form>
        </>
    );
}
