'use server'
import z from 'zod'

const createPatientValidationSchema = z.object({
    password: z.string().nonempty('Password is required'),
    confirmPassword: z.string().nonempty('Confirm password is required'),
    patient: z.object({
        name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters'),
        email: z.string().nonempty('Email is required'),
        address: z.string().optional(),
        gender: z.enum(['MALE', 'FEMALE', 'OTHERS'], {
            error: 'Gender is required'
        }),
        profilePhoto: z.string().optional()
    })
}).refine(data => data.password === data.confirmPassword, {
    message: 'password do not match',
    path: ['confirmPassword']
})

export const registerPatient = async (_currentState: any, formData: any) => {
    try {

        const patientData = {
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            patient: {
                name: formData.get("name"),
                email: formData.get("email"),
                address: formData.get("address"),
                gender: formData.get("gender"),
            },
        };
        const validated = createPatientValidationSchema.safeParse(patientData)

        if (!validated.success) {
            console.log(validated)
            return {
                success: false,
                errors: validated.error.issues.map((issue) => {
                    return {
                        field: issue.path.join('.'),
                        message: issue.message
                    }
                })
            }
        }

        const formatedPatientData = {
            password: formData.get('password'),
            patient: {
                name: formData.get('name'),
                email: formData.get('email'),
                address: formData.get('address'),
                gender: formData.get('gender')
            }
        }

        const newFormData = new FormData()
        newFormData.append('data', JSON.stringify(formatedPatientData))

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/create-patient`, {
            method: 'POST',
            body: newFormData
        })
            .then(res => res.json())

        return res

    } catch (err: any) {
        console.log('Error while registering patient', err)
        return { error: 'Registration failed' }
    }
}