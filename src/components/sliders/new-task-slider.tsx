'use client'

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getAll} from "@/actions/project-actions/get-projects";
import {optional} from "zod";
import {getById} from "@/actions/project-actions/get-by-id";
import {SubmitButton} from "@/components/submit-btn";
import {createTask} from "@/actions/task-actions/create-task";

type Props = {
    isOpen: boolean
    callback: any
}

const initialState = {
    message: null
}


type CreateTaskReq = {
    title: string
    url: string
    description: string
    project: number,
    status: number
}
export function NewTaskSlider(props: Props) {
    const [state, action] = useFormState(createTask, initialState)
    const [data, setData] = useState([] as Project[])
    const [status, setStatus] = useState([] as Status[])
    const [request, setRequest] = useState({title: '', url: '', description: '', project: 0, status: 0} as CreateTaskReq)

    useEffect(() => {
        getAll().then(result => {
            if (result.message === 'Success') {
                setData(result.data as Project[])
            } else {
                setData([])
            }
        }).catch(err => {
            setData([])
        })
    }, [])

    if (state?.message === 'Success') {
        setRequest({ title: '', url: '', description: '', project: 0, status: 0 })
        state.message = ''
        props.callback(false)
    }

    return (
        <div className={'slider bg-gray-700 ' + (props.isOpen ? 'slider-open' : 'slider-close')}>
            <div className='slider-content bg-purple-800 p-5 h-100'>
                <div className='flex justify-between'>
                    <span className='font-bold'>New Task</span>
                    <span onClick={() => props.callback(false)} className='hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </div>

                <form action={action}>
                    <div className='mt-5 w-full'>
                        <label htmlFor="project-input" className='block text-sm font-medium leading-6'>Project</label>
                        <select
                            name="project"
                            id="project-input"
                            className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'
                            value={request.project === undefined? 0 : request.project}
                            onChange={event => {
                                getById(Number(event.target.value)).then(data => {
                                    setStatus(data.data.status as Status[])
                                })
                                setRequest({ title: request.title, url: request.url, description: request.description, project: Number(event.target.value), status: request.status })
                            }}
                        >
                            <option value='0' disabled={true}>-----Choose Project-----</option>
                            {data.map((value, idx) => {
                                return (
                                    <option key={value.id} value={value.id}>{value.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='mt-5 w-full'>
                        <label htmlFor="name-input" className='block text-sm font-medium leading-6'>Task Title</label>
                        <input
                            name='name'
                            id='name-input'
                            type="text"
                            className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'
                            value={request.title}
                            onChange={event => { setRequest({ title: event.target.value, url: request.url, description: request.description, project: request.project, status: request.status }) }}
                        />
                    </div>
                    <div className='mt-5 w-full'>
                        <label htmlFor="url-input" className='block text-sm font-medium leading-6'>URL</label>
                        <input
                            name='url'
                            id='url-input'
                            type="text"
                            className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'
                            value={request.url}
                            onChange={event => { setRequest({ title: request.title, url: event.target.value, description: request.description, project: request.project, status: request.status }) }}
                        />
                    </div>
                    <div className='mt-5 w-full'>
                        <label htmlFor="description-input" className='block text-sm font-medium leading-6'>Description</label>
                        <textarea
                            name="description"
                            id="description-input"
                            className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'
                            value={request.description}
                            onChange={event => { setRequest({ title: request.title, url: request.url, description: event.target.value, project: request.project, status: request.status }) }}
                        ></textarea>
                    </div>
                    <div className='mt-5 w-full'>
                        <label htmlFor="status-input" className='block text-sm font-medium leading-6'>Status</label>
                        <select
                            name="status"
                            id="status-input"
                            className='bg-fuchsia-950 border-gray-600 mt-1 px-3 py-2 border-2 shadow-sm b placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1'
                            value={request.status === undefined ? 0 : request.status}
                            onChange={event => { setRequest({ title: request.title, url: request.url, description: request.description, project: request.project, status: Number(event.target.value) }) }}
                        >
                            <option value="0" disabled={true}>-----Choose Status-----</option>
                            {status.map((value, idx) => {
                                return (
                                    <option key={value.id} value={value.id}>{value.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className='mt-10'>
                        <SubmitButton text={'Create'} width={'w-full'}/>
                    </div>
                </form>
            </div>
        </div>
    )
}