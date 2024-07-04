import CategoryModel from "./category.model";

export default interface ExpenseModel {
    _id?: string;
    title: string;
    description: string;
    category: CategoryModel;
    installments?: number;
    tax?: number;
    amount: number;
    date: Date;
    done: boolean;
}