import { connection, Schema, Types } from "mongoose";
import { Category, CategorySchema } from "./category.model";

export default interface Expense {
    _id?: Types.ObjectId;
    title: string;
    description: string;
    category: Category;
    installments?: number;
    tax?: number;
    amount: number;
    date: Date;
    done: boolean;
}

const ExpenseSchema = new Schema<Expense>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: CategorySchema,
        required: true
    },
    installments: {
        type: Number,
        required: false
    },
    tax: {
        type: Number,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

const ExpenseModel = connection?.useDb('test').model<Expense>('Expense', ExpenseSchema);

export { ExpenseSchema, ExpenseModel };
