import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    const { email, password }: any = await req.json()

    if (email === 'test@example.com' && password === 'password') {
        return Response.json({
            status: 200,
        })
    } else if (email !== 'test@example.com' && password === 'password') {
        return Response.json({
            status: 404,
        })
    } else if (password !== 'password' && email === 'test@example.com') {
        return Response.json({
            status: 405,
        })
    } else if (password !== 'password' && email !== 'test@example.com') {
        return Response.json({
            status: 500,
        })
    }
}
