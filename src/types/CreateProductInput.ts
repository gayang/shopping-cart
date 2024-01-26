interface CreateProductInput{
    name: string,
    price: number,
    description: string,
    category: string,
    images?: string[],
    stock: number,
    sizes?:number[]
}
export default CreateProductInput;