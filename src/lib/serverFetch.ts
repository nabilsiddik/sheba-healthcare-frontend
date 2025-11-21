import { getCookie } from "@/utils/tokenHandler"

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const serverFetchHelper = async (endPoint: string, options: RequestInit) => {
    const { headers, ...restOptions } = options
    const accessToken = await getCookie('accessToken')

    const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}${endPoint}`, {
        headers: {
            ...headers,
            Cookie: accessToken ? `accessToken=${accessToken}` : ''
        },
        ...restOptions
    })

    return response
}

export const serverFetch = {
    get: async (endPoint: string, options?: RequestInit) => serverFetchHelper(endPoint, {...options, method: 'GET'}),
    
    post: async (endPoint: string, options: RequestInit) => serverFetchHelper(endPoint, {...options, method: 'POST'}),

    put: async (endPoint: string, options: RequestInit) => serverFetchHelper(endPoint, {...options, method: 'PUT'}),

    patch: async (endPoint: string, options: RequestInit) => serverFetchHelper(endPoint, {...options, method: 'PATCH'}),

    delete: async (endPoint: string, options?: RequestInit) => serverFetchHelper(endPoint, {...options, method: 'DELETE'})

}