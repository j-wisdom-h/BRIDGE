interface User {
    name: string
    email: string
    password: string
    gender: string
    address: string
    birthday: string
}

interface IsignUp extends User {
    confirmPassword: string
}

interface IsignIn {
    email: string
    password: string
}

export type { IsignIn, IsignUp, User }
