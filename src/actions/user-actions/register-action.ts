'use server'

import { z } from "zod"
import {redirect} from "next/navigation";

const credential = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export async function register(prevState: any, formData: FormData) {
    const parsed = credential.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    const res = await fetch(`${process.env.TASKER_API_HOST}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsed)
    }).then(async data => {
        if (data.status === 201) {
            return 201
        } else {
            const json = await data.json()

            return {
                message: json['message']
            }
        }
    }).catch(error => {
        return {
            message: error.message
        }
    })

    if (res === 201) redirect('/login')

    return res
}