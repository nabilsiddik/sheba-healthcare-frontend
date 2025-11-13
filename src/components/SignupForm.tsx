'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { registerPatient } from "@/services/auth/registerPatient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { getFieldError } from "@/utils/getFieldError"
import { toast } from "sonner"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [state, formAction, isPending] = useActionState(registerPatient, null)

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        {/* name field  */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input name="name" id="name" type="text" placeholder="Ex: Nabil Siddik" />

          {getFieldError(state, 'patient.name') &&
            <FieldDescription className="text-red-600">
              {getFieldError(state, 'patient.name')}
            </FieldDescription>
          }

        </Field>

        {/* email field  */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input name="email" id="email" type="email" placeholder="example@gmail.com" />

          {getFieldError(state, 'patient.email') &&
            <FieldDescription className="text-red-600">
              {getFieldError(state, 'patient.email')}
            </FieldDescription>
          }

        </Field>

        {/* address field  */}
        <Field>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Input name="address" id="address" type="text" placeholder="Ex: Gulshan, Dhaka 1212" />
        </Field>


        {/* gender field */}
        <Select name="gender">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
            <SelectItem value="OTHERS">Others</SelectItem>
          </SelectContent>

          {getFieldError(state, 'patient.gender') &&
            <FieldDescription className="text-red-600">
              {getFieldError(state, 'patient.gender')}
            </FieldDescription>
          }
        </Select>

        {/* password field  */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input name="password" id="password" type="password" placeholder="Type Secure password" />

          {getFieldError(state, 'password') &&
            <FieldDescription className="text-red-600">
              {getFieldError(state, 'password')}
            </FieldDescription>
          }
        </Field>

        {/* confirm password  */}
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input name="confirmPassword" id="confirmPassword" type="password" placeholder="Confirm Password" />

          {getFieldError(state, 'confirmPassword') &&
            <FieldDescription className="text-red-600">
              {getFieldError(state, 'confirmPassword')}
            </FieldDescription>
          }
        </Field>


        <Field>
          <Button type="submit" disabled={isPending}>{isPending ? 'Creating...' : 'Create Account'}</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <FcGoogle />
            Sign up with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href={'/login'}>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
