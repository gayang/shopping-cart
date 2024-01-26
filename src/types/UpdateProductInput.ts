import CreateProductInput from "./CreateProductInput"

interface UpdateProductInput {
    //update: Partial<CreateProductInput>,
    _id: string,
    name: string,
    price: number,
    description: string,
    category:{id:string, name:string},
    stock: number,
    sizes:number[]
    images: string[],
}

export default UpdateProductInput;