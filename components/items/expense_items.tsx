import ExpenseModel from "@/app/expense/models/expense.model";
import currencyBrFormatter from "@/lib/formatters/currency_formatter";
interface ExpenseItemProps {
  color: string;
  title: string;
  amount: number;
  onClick?: () => void;
  onDelete?: () => void;
}

function ExpenseItem({
  color,
  title,
  amount,
  onClick,
  onDelete,
}: ExpenseItemProps) {
  return (
    <button onClick={onClick}>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-yellow-500"
            style={{
              backgroundColor: color,
            }}
          />
          <h4 className="capitalize">{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <p>
            {amount < 0 ? (
              <span className="text-red-500">
                {currencyBrFormatter((amount *= -1))}
              </span>
            ) : (
              <span className="text-green-500">
                {currencyBrFormatter(amount)}
              </span>
            )}
          </p>
          <button onClick={onDelete}>
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </button>
  );
}

export default ExpenseItem;
