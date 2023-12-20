import { SignUpForm } from '@/_component/AuthForm'

export default function Signup() {
    return (
        <div className="grow flex justify-center flex-col h-full">
            <h2 className="text-4xl text-center orange mb-3.5 font-semibold">
                LET’S START BRIDGE!
            </h2>
            <SignUpForm />
        </div>
    )
}
