'use server'

import {z} from "zod";
import {cookies} from "next/headers";
import {isTokenExpired} from "@/middleware";
import {redirect} from "next/navigation";

const task = z.object({
    title: z.string(),
    url: z.string().nullable(),
    description: z.string().nullable(),
    status: z.number(),
    project_id: z.number()
})

export async function createTask(prevState: any, formData: FormData) {
    const jwt = cookies().get('_token')?.value
    if (isTokenExpired(jwt)) {
        redirect('/login')
    }

    const parsed = task.parse({
        title: formData.get('name'),
        url: formData.get('url'),
        description: formData.get('description'),
        status: Number(formData.get('status')),
        project_id: Number(formData.get('project'))
    })

    return await fetch('https://tasker.my.id/api/v1/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(parsed)
    }).then(async data => {
        return {
            message: 'Success',
            data: await data.json()
        }
    }).catch(err => {
        return {
            message: err.message,
            data: null
        }
    })
}