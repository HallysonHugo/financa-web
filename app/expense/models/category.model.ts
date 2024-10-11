import { connection, Schema, Types } from "mongoose";

interface Category {
    _id?: Types.ObjectId;
    name: string;
    color: string;
    totalExpenses: number;
}


const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    totalExpenses: {
        type: Number,
        required: true
    }
});

const CategoryModel = connection?.useDb('test').model<Category>('Category', CategorySchema);

export { CategorySchema, CategoryModel };
export type { Category };
