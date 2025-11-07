export const getFieldError = (state: any, fieldName: string) => {
    if (state?.errors) {
      const error = state?.errors?.find((error: any) => error.field === fieldName)
      return error?.message
    }else{
      return null
    }
  }