'use client'

import {useEffect, useState} from "react";
import {getAll} from "@/actions/project-actions/get-projects";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export function ProjectTable() {
    const [data, setData] = useState([] as Project[])

    useEffect(() => {
        getAll().then(d => {
            setData(d.data)
        }).catch(err => {
            console.log(err.message)
        })
    }, []);

    return (
        <tbody>
            {data.map((project, idx) => {
                return (
                    <tr key={project.id} data-id={project.id} className='hover:bg-blue-950'>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.status.length} status</td>
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