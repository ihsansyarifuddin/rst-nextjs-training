import Link from "next/link";
import {RegisterForm} from "@/components/forms/register-form";

export const metadata = {
    title: "Tasker - Register"
};

export default function Register() {
    return (
        <div className='rounded-md shadow-sm text-center p-5 bg-gradient-radial from-purple-950 to-fuchsia-950'>
            <p className='font-bold text-2xl'>Register</p>

            <RegisterForm/>

            <p className='mt-4 text-sm'>Already have an account? <Link href='/login' className='underline decoration-solid'>Login here!</Link></p>
        </div>
    )
}