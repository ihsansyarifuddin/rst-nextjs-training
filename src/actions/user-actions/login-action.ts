'use server'

import {z} from "zod"

const credential = z.object({
    email: z.string(),
    password: z.string()
})

export async function login(prevState: any, formData: FormData) {
    const parsed = credential.parse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    return await fetch('https://tasker.my.id/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsed),
        cache: 'no-store'
    }).then(async data => {
        const json = await data.json()
        if (data.status === 200) {
            const token = json['data']['token']
            return {
                message: 'success',
                token: token
            }
        } else {
            return {
                message: json['message'],
                token: null
            }
        }
    }).catch(error => {
        return {
            message: error.message,
            token: null
        }
    })
}