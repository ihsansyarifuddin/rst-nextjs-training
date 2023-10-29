'use client'

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom"
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createProject} from "@/actions/project-actions/create-project";
import {useState} from "react";
import {SubmitButton} from "@/components/submit-btn";

type Props = {
    isOpen: boolean
    callback: any
}

const initialState = {
    message: null
}

type CreateProjectReq = {
    name: string
    description: string
    status: string
}

export function NewProjectSlider(props: Props) {
    const [state, action] = useFormState(createProject, initialState)
    const [request, setRequest] = useState({} as CreateProjectReq)

    if (state?.message === 'Success') {
        setRequest({ name: '', description: '', status: '' })
        state.message = ''
        props.callback(false)
    }

    return (
        <div className={'slider h-screen bg-purple-800 p-5 ' + (props.isOpen ? 'slider-open' : 'slider-close')}>
            <div className='flex justify-between'>
                <span className='font-bold'>New Project</span>
                <span onClick={() => props.callback(false)} className='hover:cursor-pointer'>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </div>

            <form action={ action }>
                <div className='mt-5 w-full'>
                    <label htmlFor="name-input" className='block text-sm font-medium leading-6'>Project Name</label>
                    <input
                        name='name'
                        id='name-input'
                        type="text"
                        className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'
                        value={request.name}
                        onChange={event => { setRequest({ name: event.target.value, description: request.description, status: request.status }) }}
                    />
                </div>
                <div className='mt-5 w-full'>
                    <label htmlFor="description-input" className='block text-sm font-medium leading-6'>Description</label>
                    <textarea
                        name="description"
                        id="description-input"
                        className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'
                        value={request.description}
                        onChange={event => { setRequest({ name: request.name, description: event.target.value, status: request.status }) }}
                    ></textarea>
                </div>
                <div className='mt-5 w-full'>
                    <label htmlFor="status-input" className='block text-sm font-medium leading-6'>Status <small className='text-red-400'>(Use comma for multi statuses)</small></label>
                    <textarea
                        name="status"
                        id="status-input"
                        className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'
                        value={request.status}
                        onChange={event => { setRequest({ name: request.name, description: request.description, status: event.target.value }) }}
                    ></textarea>
                    <small className='text-red-400'>Automatically add Done as finish status</small>
                </div>
                <div className='mt-10'>
                    <SubmitButton text={'Create'} width={'w-full'}/>
                </div>
            </form>
        </div>
    )
}