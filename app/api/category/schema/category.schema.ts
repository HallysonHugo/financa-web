import { connection, Schema, Types } from "mongoose";

interface CategorySchemaModel {
  _id?: Types.ObjectId;
  name: string;
  color: string;
  totalExpenses: number;
}

const CategorySchema = new Schema<CategorySchemaModel>({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  totalExpenses: {
    type: Number,
    required: true,
  },
});

const CategoryMongo = connection
  ?.useDb("test")
  .model<CategorySchemaModel>("Category", CategorySchema);

export { CategorySchema, CategoryMongo };
