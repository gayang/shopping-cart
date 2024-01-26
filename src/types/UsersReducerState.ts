import User from "./User"

export interface UsersReducerState {
    users: User[]
    currentUser?: User | null
    user : User | null
    error?: string
    loading: boolean
}

export default UsersReducerState