'use server'

import {cookies} from "next/headers";
import {isTokenExpired} from "@/middleware";
import {redirect} from "next/navigation";

export async function filterByProject(id: number|null|undefined) {
    const jwt = cookies().get('_token')?.value
    if (isTokenExpired(jwt)) {
        redirect('/login')
    }

    let filter = ''
    if (id !== null && id != undefined) filter = `project_id=${id}`

    return await fetch(`${process.env.TASKER_API_HOST}/api/v1/task/filter?${filter}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }).then(async data => {
        return await data.json()
    }).catch(err => {
        return {
            message: err.message
        }
    })
}