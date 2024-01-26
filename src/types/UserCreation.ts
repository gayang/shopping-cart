interface UserCreation {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string,
    avatar?: string,
    phoneNumber?:string
}
export default UserCreation;