'use client'

import {useState} from "react";
import {filterByProject} from "@/actions/task-actions/filter-task";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

type Props = {
    project_id: number|null|undefined
}

export function TaskTable() {
    const [data, setData] = useState([] as TaskFilter[])

    filterByProject(null).then(data => {
        setData(data.data)
    }).catch(err => {
        console.log(err.message)
    })

    return (
        <tbody>
        {data.map((task, idx) => {
            return (
                <tr key={task.id} data-id={task.id} className='hover:bg-blue-950'>
                    <td>{task.title}</td>
                    <td>{task.project}</td>
                    <td>{task.external_url}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td className='flex justify-end'>
                        <button type='button' className='rounded-sm bg-fuchsia-600 px-2 text-center'>
                            <FontAwesomeIcon icon={faTrash} size={"sm"}/>
                        </button>
                    </td>
                </tr>
            )
        })}
        </tbody>
    )
}