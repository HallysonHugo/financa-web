import { connectMongo } from "@/app/service/db.connection";
import { CategoryMongo } from "./schema/category.schema";

export async function GET(request: Request) {
  await connectMongo();
  const result = await CategoryMongo.find();
  return new Response(JSON.stringify(result), { status: 200 });
}
