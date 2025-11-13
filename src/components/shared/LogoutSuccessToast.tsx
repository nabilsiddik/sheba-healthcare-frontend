'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

const LogoutSuccessToast = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    if (searchParams.get('logedOut') === 'true') {
      toast.success('User loged out successfully')

      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('logedOut')
      router.replace(newUrl.toString())
    }

  }, [searchParams, router])

  return null
}

export default LogoutSuccessToast
