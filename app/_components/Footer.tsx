import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="bg-orange-500 h-14 flexRBetween bottom-0 w-full relative">
            <div className="flex self-center">
                <Image
                    src="/image/logo.png"
                    width={40}
                    height={40}
                    alt="Picture of the logo"
                    className="ml-1.5"
                />
            </div>
            <div>
                <ul className="flex">
                    <li>INFO</li>
                    <li>&copy; @j-wisdom-h</li>
                </ul>
            </div>
        </footer>
    )
}
export default Footer
