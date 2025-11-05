import { LoginForm } from "@/components/LoginForm"
import { SignupForm } from "@/components/SignupForm"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <LoginForm/>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block" style={{
        backgroundImage: `url(${'/assets/images/auth/signup-bg.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
     
      </div>
    </div>
  )
}
