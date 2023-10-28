import {Inter} from 'next/font/google'
import './../globals.css'
import {Sidenav} from "@/components/sidenav";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className + " h-screen w-screen flex"}>
            <div className='flex-initial'>
                <Sidenav isExpanded={true}/>
            </div>
            <div className='flex-1'>
                {children}
            </div>
        </body>
        </html>
    )
}
