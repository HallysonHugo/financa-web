import { connection, Schema, Types } from "mongoose";

export default interface ExpenseSchemaModel {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  categoryId?: Types.ObjectId;
  installments?: number;
  tax?: number;
  amount: number;
  date: Date;
  done: boolean;
}

const ExpenseSchema = new Schema<ExpenseSchemaModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  installments: {
    type: Number,
    default: 1,
    required: false,
  },
  categoryId: {
    type: Types.ObjectId,
    required: true,
  },
  tax: {
    type: Number,
    default: 0,
    required: false,
  },
  amount: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

const ExpenseMongo = connection
  ?.useDb("test")
  .model<ExpenseSchemaModel>("Expense", ExpenseSchema);

export { ExpenseSchema, ExpenseMongo };
