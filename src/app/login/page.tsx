import Link from "next/link";
import {PositiveButton} from "@/components/positive-btn";
import {LoginForm} from "@/components/forms/login-form";

export const metadata = {
    title: "Tasker - Login"
};

export default function Login() {
    return (
        <div className='rounded-md shadow-sm text-center p-5 bg-gradient-radial from-purple-950 to-fuchsia-950'>
            <p className='font-bold text-2xl'>Login</p>

            <LoginForm/>

            <p className='mt-4 text-sm'>Don&#39;t have an account? <Link href='/register' className='underline decoration-solid'>Create one!</Link></p>
        </div>
    )
}