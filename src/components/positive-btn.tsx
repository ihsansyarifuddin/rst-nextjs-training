'use client'

type Props = {
    text: string
    width: string
}

export function PositiveButton(props: Props) {
    return (
        <button
            type='button'
            className={ props.width + ' rounded-md bg-fuchsia-600 hover:bg-fuchsia-800 px-3 py-2 shadow-sm font-bold'}
        >{ props.text }</button>
    )
}