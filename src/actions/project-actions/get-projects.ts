'use server'

import {cookies} from "next/headers";
import {isTokenExpired} from "@/middleware";
import {redirect} from "next/navigation";

export async function getAll() {
    const jwt = cookies().get('_token')?.value
    if (isTokenExpired(jwt)) {
        redirect('/login')
    }

    return await fetch(`${process.env.TASKER_API_HOST}/api/v1/project`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }).then(async data => {
        return await data.json()
    }).catch(error => {
        return {
            message: error.message
        }
    })
}