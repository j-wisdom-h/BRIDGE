interface IsignUp {
    name: string
    email: string
    password: string
    confirmPassword: string
    gender: string
    address: string
    birthday: string
}

interface IsignIn {
    email: string
    password: string
}

export type { IsignIn, IsignUp }
