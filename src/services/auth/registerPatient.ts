'use server'
import { serverFetch } from '@/lib/serverFetch';
import { userLogin } from './userLogin';
import { zodValidator } from '@/lib/zodVlidator';
import { registerPatientValidationZodSchema } from '@/zod/auth.validation';

export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            address: formData.get("address"),
            gender: formData.get("gender"),
        };

        // Validate with zod
        if (zodValidator(payload, registerPatientValidationZodSchema).success === false) {
            return zodValidator(payload, registerPatientValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerPatientValidationZodSchema).data;

        const registerData = {
            password: validatedPayload.password,
            patient: {
                name: validatedPayload.name,
                email: validatedPayload.email,
                address: validatedPayload.address,
                gender: validatedPayload.gender
            }
        }

        const newFormData = new FormData()
        newFormData.append('data', JSON.stringify(registerData))

        if (formData.get('file')) {
            newFormData.append('file', formData.get('file') as Blob)
        }

        const res = await serverFetch.post('/user/create-patient', {
            body: newFormData
        })

        const result = await res.json()

        if (result.success) {
            await userLogin(_currentState, formData);
        }

        return result

    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        console.log('Error while registering patient', error)
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}