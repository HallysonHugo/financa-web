"use client"
import { useEffect, useState } from "react";
import { CategoryModel } from "./models/category.model";
import { categoryService } from "./service/category.service";

export default function CategoryPage() {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    useEffect(() => {
        categoryService.getAllCategories().then((data) => {
            setCategories(data);
        });
    }, []);
    return (
        // a page to create, update and delete categories
        <main>
            <h1>Category Page</h1>
            <div>
                <ul>
                    {categories.map((category) => (
                        <li key={category._id?.toString()}>{category.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <button className="btn btn-primary" >Add category</button>
            </div>
        </main>
    );
}