interface Filter {
    perPage:number,
    pageNo: number,
    sorting:string,
    categoryId?:string,
    maxPrice?: number,
    minPrice?: number
    
}
export default Filter