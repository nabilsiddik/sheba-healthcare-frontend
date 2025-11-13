'use client'

import { LogOutIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { userLogout } from '@/services/auth/userLogout'
import { toast } from 'sonner'

const LogoutButton = () => {

    // User logout
    const handleLogout = async() => {
        await userLogout()
        toast.success('User loged out.')
    }

    return (
        <Button onClick={handleLogout} className='w-full cursor-pointer'>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Logout</span>
        </Button>
    )
}

export default LogoutButton
