'use server'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { IUserInfo } from "@/types/user.types"
import { getCookie } from "@/utils/tokenHandler"

export const getUserInfo = async(): Promise<IUserInfo | null> => {
    const accessToken = await getCookie('accessToken')

    if(!accessToken){
        return null
    }

    const verifiedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload

    if(!verifiedToken){
        return null
    }

    const userInfo: IUserInfo = {
        email: verifiedToken.email,
        role: verifiedToken.role
    }

    return userInfo
}