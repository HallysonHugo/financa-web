import expenseController from "@/app/expense/controller/expense.controller";
import { CategoryModel } from "@/app/expense/models/category.model";
import { useEffect, useState } from "react";

interface ExpenseFormProps {
  descriptionRef: React.RefObject<HTMLInputElement>;
  amountRef: React.RefObject<HTMLInputElement>;
  dateRef: React.RefObject<HTMLInputElement>;
  installmentsRef: React.RefObject<HTMLInputElement>;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isIncome: boolean;
}

export default function ExpenseForm({
  descriptionRef,
  amountRef,
  dateRef,
  onClick,
  isIncome,
  installmentsRef,
}: ExpenseFormProps) {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  useEffect(() => {
    expenseController.getCategories().then((data) => {
      setCategories(data);
    });
  }, []);
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
        {isIncome ? (
          <button type="submit" onClick={onClick} className="btn btn-primary">
            Adicionar Ganho
          </button>
        ) : (
          <button type="submit" onClick={onClick} className="btn btn-danger">
            Adicionar Gasto
          </button>
        )}
      </form>
    </>
  );
}
