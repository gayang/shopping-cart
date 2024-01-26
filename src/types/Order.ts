interface Order {
    user: string,
    products: string,
    shipping: {
        address: string,
        method: string,
        cost: number
    },
    payment: {
        method: string,
        status: string,
    },
    total: number
}
export default Order;