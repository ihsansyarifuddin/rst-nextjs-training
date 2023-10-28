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
        body: JSON.stringify(parsed)
    }).then(async data => {
        if (data.status === 200) {
            return {
                message: 'Login success!'
            }
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
}