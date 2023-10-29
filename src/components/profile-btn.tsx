'use client'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";
import {deleteCookie} from "cookies-next"
import {redirect, RedirectType} from "next/navigation";
import {useState} from "react";

function logout() {
    deleteCookie('_token')
    window.location.replace('/login')
}

export function ProfileButton(user: User) {
    const [isLogout, setLogout] = useState(false)

    return (
        <div className='inline-flex shadow-sm min-w-[80%] text-sm mt-auto mb-5' role='group'>
            <button type='button' className='rounded-bl rounded-tl bg-fuchsia-600 hover:bg-fuchsia-800 px-3 py-2 shadow-sm' onClick={logout}>
                <FontAwesomeIcon icon={faSignOut} flip='horizontal'/>
            </button>
            <button type='button' className='rounded-br rounded-tr bg-fuchsia-600 px-3 py-2 shadow-sm font-semibold w-full' disabled={true}>
                {user.username}
            </button>
        </div>
    )
}