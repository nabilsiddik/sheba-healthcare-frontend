'use server'
import z from 'zod'
import cookie, { parse } from 'cookie'
import { cookies } from 'next/headers'

const userLoginZodSchema = z.object({
    email: z.email('Email is required'),
    password: z.string('Password is required').min(6, "Password minimum length is 6"),
})

export const userLogin = async(currentState: any, formData: any) => {
    try{
        let accessTokenObj: null | any = null
        let refreshTokenObj: null | any = null

        const userData = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const validatedUserData = userLoginZodSchema.safeParse(userData)

        if(!validatedUserData.success){
            return {
                success: false,
                errors: validatedUserData.error.issues.map((issue) => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    }
                })
            }
        }

        console.log(validatedUserData)

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)

        })
        
        const result = await res.json()
        const setCookieHeaders = res.headers.getSetCookie()

        if(setCookieHeaders && setCookieHeaders.length > 0){
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie)

                if(parsedCookie['accessToken']){
                    accessTokenObj = parsedCookie
                }
                if(parsedCookie['refreshToken']){
                    refreshTokenObj = parsedCookie
                }
            })
        }else{
            throw new Error('No set-cookie header found')
        }

        if(!accessTokenObj){
            throw new Error('Access Token object not found in cookies')
        }

        if(!refreshTokenObj){
            throw new Error('Refresh Token object not found in cookies')
        }

        console.log({
            accessTokenObj,
            refreshTokenObj
        })

        const cookieStore = await cookies()
        cookieStore.set('accessToken', accessTokenObj.accessToken, {
            httpOnly: true,
            maxAge: parseInt(accessTokenObj['Max-Age'] || 1000 * 60 * 60),
            path: accessTokenObj.Path || '/',
            secure: true,
            sameSite: accessTokenObj.SameSite
        })
        cookieStore.set('refreshToken', refreshTokenObj.refreshToken,{
            httpOnly: true,
            maxAge: parseInt(refreshTokenObj['Max-Age']),
            path: refreshTokenObj.Path || '/',
            secure: true,
            sameSite: refreshTokenObj.SameSite
        })
        

        return result

    }catch(err: any){
        console.log('Error while user loging', err)
        return {error: 'User login failed'}
    }
}