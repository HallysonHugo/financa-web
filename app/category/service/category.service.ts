async function getAllCategories() {
    const response = await fetch("/api/category");
    return response.json();
}




export const categoryService = {
    getAllCategories
}