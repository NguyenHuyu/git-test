'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

interface FormProps {
    email?: string
    password?: string
    confirm_password?: string
}

export default function Form({ email, confirm_password, password }: FormProps) {
    const params = useSearchParams()?.get("params")

    const [emailInput, setEmailInput] = React.useState<string>(email || '')
    const [passwordInput, setPasswordInput] = React.useState<string>(password || '')
    const [message, setMessage] = React.useState<string>('')



    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput, password: passwordInput })
        })
            .then(async res => {
                const data = await res.json()
                if (data.status === 404) {
                    alert("Email không đúng")
                    setMessage("Email không đúng")
                } else if (data.status === 405) {
                    alert("Password không đúng")
                    setMessage("Password không đúng")
                } else if (data.status === 200) {
                    alert("Đăng nhập thành công")
                    setMessage("Đăng nhập thành công")
                } else if (data.status === 500) {
                    alert("Thông tin không đúng")
                    setMessage("Thông tin không đúng")
                }
            })
    }


    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <h1 className='text-center text-2xl font-bold'> {params === "DK" ? "Đăng Kí" : "Đăng nhập"} </h1>
            <div className='flex gap-4'>
                <label className='bg-orange-400 p-2 rounded-md flex flex-1'>Email </label>
                <input
                    type="email"
                    aria-label="email"
                    name='email'
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)} className='border border-black  w-full rounded-md px-2' />
            </div>
            <div className='flex gap-4'>
                <label className='bg-orange-400 p-2 rounded-md flex-1'>Password </label>
                <input
                    id="passwordInput"
                    value={passwordInput}
                    type="password"
                    name='password'
                    onChange={(e) => setPasswordInput(e.target.value)}
                    aria-label="password" className='border border-black  w-full rounded-md px-2' />
            </div>
            {
                params === "DK" &&
                <div className='flex gap-4'>
                    <label className='bg-orange-400 p-2 rounded-md flex-1'>Confirm Password </label>
                    <input id="passwordInput" value={confirm_password} type="password" aria-label="password" className='border border-black  w-full rounded-md px-2' />
                </div>
            }
            {message && (
                <div className="bg-green-200 p-2 rounded-md text-center hidden">{message}</div>
            )}
            <div className='flex w-full justify-center'>
                <button className='p-2 bg-red-300 rounded-lg' type='submit'>Submit</button>
            </div>
        </form>
    )
}
