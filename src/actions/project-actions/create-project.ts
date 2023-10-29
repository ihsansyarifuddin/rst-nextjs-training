'use server'

import {z} from "zod";
import {cookies} from "next/headers";
import {isTokenExpired} from "@/middleware";
import {redirect} from "next/navigation";

const project = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string()
})

export async function createProject(prevState: any, formData: FormData) {
    const jwt = cookies().get('_token')?.value
    if (isTokenExpired(jwt)) {
        redirect('/login')
    }

    const parsed = project.parse({
        name: formData.get('name'),
        description: formData.get('description'),
        status: formData.get('status')
    })

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    }

    const resProject = await fetch('https://tasker.my.id/api/v1/project', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            name: parsed.name,
            description: parsed.description
        })
    }).then(async data => {
        return {
            message: 'OK',
            data: await data.json()
        }
    }).catch(err => {
        return {
            message: err.message,
            data: null
        }
    })

    if (resProject.data === null) {
        return {
            message: `Create project failed. Error: ${resProject.message}`
        }
    }

    let statuses = parsed.status.split(',')
    statuses.push('Done')

    return await fetch('https://tasker.my.id/api/v1/status', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            names: statuses,
            project_id: resProject.data.data.id
        })
    }).then(data => {
        return {
            message: 'Success'
        }
    }).catch(err => {
        return {
            message: `Project created, but failed to create the Statuses. Error: ${err.message}`
        }
    })
}