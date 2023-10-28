'use client'

type Props = {
    isExpanded: boolean
}

export function Sidenav(prop: Props) {
    const width = prop.isExpanded ? 'w-[14rem]' : 'w-[80px]'

    return (
        <div className={ 'sidenav h-screen p-5 bg-gradient-to-tl from-purple-950 to-fuchsia-950 ' + width }>
            <div className='text-center border-b'>
                <p className='font-bold text-2xl'>{ prop.isExpanded ? 'Tasker' : 'T' }</p>
            </div>


        </div>
    )
}