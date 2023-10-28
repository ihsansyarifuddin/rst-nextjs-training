'use client'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faClipboardList, faPlus, faTasks} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {getAll} from "@/actions/project-actions/get-projects";
import {useEffect, useState} from "react";

type Props = {
    isExpanded: boolean
}

function fetchData() {
    return getAll().then(data => {
        if (data.message === 'Success') {
            return data.data
        } else {
            return []
        }
    })
}

export function Sidenav(prop: Props) {
    const [data, setData] = useState([])
    useEffect(() => {
        getAll().then(result => {
            if (result.message === 'Success') {
                setData(result.data)
            } else {
                setData([])
            }
        }).catch(err => {
            setData([])
        })
    }, [])

    console.log(data)

    const width = prop.isExpanded ? 'w-[14rem]' : 'w-[80px]'

    return (
        <div onLoadedData={getAll} className={ 'sidenav h-screen bg-gradient-to-tl from-purple-950 to-fuchsia-950 ' + width }>
            <div className='text-center border-gray-400 border-b py-3 mx-5'>
                <p className='font-bold text-2xl'>{ prop.isExpanded ? 'Tasker' : 'T' }</p>
            </div>

            <ul className='mt-5 border-gray-400 border-b pb-5'>
                <li className='leading-9 ps-5 hover:bg-blue-950 hover:cursor-pointer'>
                    <Link href='/console'>
                        <FontAwesomeIcon icon={faChartLine} className='w-[20px]'/> Dashboard
                    </Link>
                </li>
                <li className='leading-9 ps-5 hover:bg-blue-950 hover:cursor-pointer'>
                    <Link href='/project'>
                        <FontAwesomeIcon icon={faClipboardList} className='w-[20px]'/> Projects
                    </Link>
                </li>
                <li className='leading-9 ps-5 hover:bg-blue-950 hover:cursor-pointer'>
                    <Link href='/task'>
                        <FontAwesomeIcon icon={faTasks} className='w-[20px]'/> Tasks
                    </Link>
                </li>
            </ul>

            <p className='font-semibold ps-5 mt-1'>Your Projects</p>
            <ul className='mt-3 border-gray-400 border-b pb-5'>
                {data.map((dt, idx) => {
                    return (
                        <li key={dt.id} className='leading-6 ps-5 py-1.5 hover:bg-indigo-950 hover:cursor-pointer'>
                            <Link href={'/project/' + dt.id}>
                                {dt.name} <span className='ms-2 bg-blue-700 text-sm px-1 py-0.5 rounded-[4px]'>{dt.task.length}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <div className='mt-3 ps-5 py-2 bg-indigo-800 hover:bg-indigo-950 hover:cursor-pointer'>
                <FontAwesomeIcon icon={faPlus} className='w-[20px] me-2'/> New Project
            </div>
            <div className='mt-3 ps-5 py-2 bg-blue-800 hover:bg-blue-950 hover:cursor-pointer'>
                <FontAwesomeIcon icon={faPlus} className='w-[20px] me-2'/> New Task
            </div>
        </div>
    )
}