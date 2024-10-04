interface ExpenseFormProps {
    descriptionRef: React.RefObject<HTMLInputElement>,
    amountRef: React.RefObject<HTMLInputElement>,
    dateRef: React.RefObject<HTMLInputElement>,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    isIncome: boolean
}

export default function ExpenseForm({ descriptionRef, amountRef, dateRef, onClick, isIncome }: ExpenseFormProps) {
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
                        ref={amountRef}
                        placeholder="Infome o valor" />
                </div>
                {/* Add date picker */}
                <div className="input-group">
                    <label htmlFor="date">Data</label>
                    <input
                        type="date"
                        name="date"
                        required
                        ref={dateRef}
                        placeholder="Infome a data" />
                </div>
                {
                    isIncome ? <button type="submit" onClick={onClick} className="btn btn-primary">Adicionar Ganho</button> :
                        <button type="submit" onClick={onClick} className="btn btn-danger">Adicionar Gasto</button>
                }

            </form>
        </>
    )

}