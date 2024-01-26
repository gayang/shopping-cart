interface Product {
    _id: string,
    name: string,
    price: number,
    description: string,
    category: {
        _id: string,
        name: string
    },
    stock: number,
    sizes: number[],
    images: string[],
}
export default Product;