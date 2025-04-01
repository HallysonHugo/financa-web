export default function CategoryForm({ update }: { update: boolean }) {
    return (
        <main>
            <form>
                <div>
                    <label htmlFor="name">Category Name</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="color">Category Color</label>
                    <input type="text" id="color" name="color" />
                </div>
            </form>
            {update ? (
                <button className="btn btn-primary">Update category</button>
            ) : (
                <button className="btn btn-primary">Add category</button>
            )}
        </main>
    );
}