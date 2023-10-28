'use client'

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom"

type Props = {
    text: string,
    width: string
}

export function SubmitButton(props: Props) {
    const { pending } = useFormStatus()

    return (
        <button
            type='submit'
            disabled={pending}
            className={ props.width + ' rounded-md bg-fuchsia-600 hover:bg-fuchsia-800 px-3 py-2 shadow-sm font-bold'}
        >{ props.text }</button>
    )
}