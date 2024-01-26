interface User {
    _id: string,
    firstName: string,
    lastName:string,
    email: string,
    password: string,
    role: string,
    avatar?: string,
    phoneNumber?:number
}
export default User;