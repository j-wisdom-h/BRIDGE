interface User {
    email: string
    password: string
}

interface IsignUp extends User {
    confirmPassword: string
}

export type { IsignUp, User }
