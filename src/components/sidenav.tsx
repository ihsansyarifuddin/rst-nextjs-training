'use client'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faClipboardList, faPlus, faTasks} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useEffect, useState} from "react";
import {getAuthUser} from "@/middleware";
import {getCookie} from "cookies-next"
import {ProfileButton} from "@/components/profile-btn";
import {NewProjectSlider} from "@/components/sliders/new-project-slider";
import {NewTaskSlider} from "@/components/sliders/new-task-slider";

type Props = {
    isExpanded: boolean
}

export function Sidenav(prop: Props) {
    const [user, setUser] = useState({} as User)
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false)

    useEffect(() => {
        setUser(getAuthUser(getCookie('_token')!))
    }, [])

    const width = prop.isExpanded ? 'w-[14rem]' : 'w-[80px]'

    return (
        <div className={ 'sidenav h-screen bg-gradient-to-tl from-purple-950 to-fuchsia-950 flex flex-col ' + width }>
            <div className='text-center border-gray-400 border-b py-3 mx-5'>
                <p className='font-bold text-2xl'>{ prop.isExpanded ? 'Tasker' : 'T' }</p>
            </div>

            <ul className='mt-5 border-gray-400 border-b pb-5'>
                <Link href='/console'>
                    <li className='leading-9 ps-5 hover:bg-blue-950 hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faChartLine} className='w-[20px]'/> Dashboard
                    </li>
                </Link>

                <Link href='/console/project'>
                    <li className='leading-9 ps-5 hover:bg-blue-950 hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faClipboardList} className='w-[20px]'/> Projects
                    </li>
                </Link>

                <Link href='/console/task'>
                    <li className='leading-9 ps-5 hover:bg-blue-950 hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faTasks} className='w-[20px]'/> Tasks
                    </li>
                </Link>
            </ul>

            <button type='button' className='mt-3 ps-5 py-2 text-start bg-indigo-800 hover:bg-indigo-950 hover:cursor-pointer' onClick={() => setIsNewProjectOpen(!isNewProjectOpen)}>
                <FontAwesomeIcon icon={faPlus} className='w-[20px] me-2'/> New Project
            </button>
            <button type='button' className='mt-3 ps-5 py-2 text-start bg-blue-800 hover:bg-blue-950 hover:cursor-pointer' onClick={() => setIsNewTaskOpen(!isNewTaskOpen)}>
                <FontAwesomeIcon icon={faPlus} className='w-[20px] me-2'/> New Task
            </button>

            <div className='flex flex-grow justify-center'>
                <ProfileButton username={user.username} user_id={user.user_id} email={user.email}/>
            </div>

            <NewProjectSlider isOpen={isNewProjectOpen} callback={setIsNewProjectOpen}/>
            <NewTaskSlider isOpen={isNewTaskOpen} callback={setIsNewTaskOpen}/>
        </div>
    )
}