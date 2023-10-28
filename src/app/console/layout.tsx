'use client'

import './../globals.css'
import {Sidenav} from "@/components/sidenav";

export default function ConsoleLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='w-screen h-screen flex'>
            <div className='flex-initial'>
                <Sidenav isExpanded={true}/>
            </div>
            <div className='flex-1'>
                {children}
            </div>
        </section>
    )
}
