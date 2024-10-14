import { connection, Schema, Types } from "mongoose";

interface CategoryModel {
  _id?: Types.ObjectId;
  name: string;
  color: string;
  totalExpenses: number;
}

export type { CategoryModel };
