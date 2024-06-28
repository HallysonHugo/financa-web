import currencyBrFormatter from "@/lib/formatters/currency_formatter";

interface ExpenseItemProps {
    color: string;
    title: string;
    amount: number;
}

function ExpenseItem({ color, title, amount }: ExpenseItemProps) {
    return (
        <button>
            <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                <div className="flex items-center gap-2">
                    <div className="w-[25px] h-[25px] rounded-full bg-yellow-500" style={{
                        backgroundColor: color,
                    }} />
                    <h4 className="capitalize">{title}</h4>
                </div>
                <p>{amount < 0 ?
                    <span className="text-red-500">{currencyBrFormatter(amount)}</span> :
                    <span className="text-green-500">{currencyBrFormatter(amount)}</span>
                }</p>
            </div>
        </button>
    )
}

export default ExpenseItem;