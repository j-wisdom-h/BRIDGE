export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-1/2 h-full mx-auto flex justify-center items-center">
            {children}
        </div>
    )
}
