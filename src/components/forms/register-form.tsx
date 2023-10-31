'use client'

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom"
import {SubmitButton} from "@/components/submit-btn";
import {register} from "@/actions/user-actions/register-action";

const initialState = {
    message: null,
}

export function RegisterForm() {
    const [state, action] = useFormState(register, initialState)

    return (
        <form action={ action }>
            <div className='mt-5 min-w-[400px]'>
                <label htmlFor="name-input" className='block text-sm font-medium leading-6 text-start'>Name</label>
                <input name='name' id='name-input' type="text" className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'/>
            </div>

            <div className='mt-5 min-w-[400px]'>
                <label htmlFor="email-input" className='block text-sm font-medium leading-6 text-start'>Email</label>
                <input name='email' id='email-input' type="text" className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'/>
            </div>

            <div className='mt-5 min-w-[400px]'>
                <label htmlFor="password-input" className='block text-sm font-medium leading-6 text-start'>Password</label>
                <input name='password' id='password-input' type="password" className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'/>
            </div>

            <div className='mt-10'>
                <SubmitButton text={'Register'} width={'w-full'}/>
            </div>

            <p
                className={ 'mt-4 bg-red-800 rounded-sm text-start px-3 py-2 text-sm animate-bounce' + (state?.message === null ? ' hidden' : '')}
            >{state?.message}</p>
        </form>
    )
}