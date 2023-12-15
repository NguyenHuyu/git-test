import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    const { email, password }: any = await req.json()


    if (email === 'test@example.com' && password === 'password') {
        return Response.json({
            status: 200,
            body: {
                message: 'Login Success!'
            }
        })


    } else if (email !== 'test@example.com' && password === 'password') {
        return Response.json({
            status: 404,
            body: {
                message: 'Email không đúng'
            }
        })

    } else if (password !== 'password' && email === 'test@example.com') {
        return Response.json({
            status: 405,
            body: {
                message: 'Password không đúng'
            }
        })
    } else if (password !== 'password' && email !== 'test@example.com') {
        return Response.json({
            status: 500,
            body: {
                message: 'Lỗi hệ thống'
            }
        })
    }
}
