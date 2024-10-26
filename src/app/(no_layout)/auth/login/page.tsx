"use client"

import { useFormik } from "formik";
import * as Yup from "yup";

import { CustomButton, FormContainer, FormDiv, TextField } from "@/components/Forms";
import { LoginProps } from "@/types/auth";
import { AuthService } from "@/services/auth-service";

export default function LoginPage() {
  const { errors, isSubmitting, getFieldProps, handleSubmit } = useFormik<LoginProps>({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Por favor, insira seu email.'),
      password: Yup.string().required('Por favor, insira sua senha.')
    }),
    onSubmit: async (values) => {
      const { data, statusCode, message } = await AuthService.login(values);

      if (statusCode) console.log(statusCode, message, data);

      console.log(statusCode, message, data)
    }
  })

  return (
    <>
        <title>Login</title>
        <meta name="description" content="Login Page" />

      <div className='h-screen flex flex-row bg-gradient-to-b from-black via-gray-900 to-[#00294D]'>
        <div className='flex flex-col gap-10 items-center m-auto bg-white px-4 py-10 rounded-md'>
          <h2 className="font-bold text-lg">Login Frontend Fusion</h2>
          <FormContainer
            onSubmit={handleSubmit}
            className='max-w-[360px] w-[360px] m-auto h-auto'
          >
            <FormDiv className='flex flex-col gap-6 justify-center'>
              <TextField
                type='text'
                label='Email'
                placeholder='jhondoe53@email.com'
                {...getFieldProps('email')}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                type='password'
                label='Password'
                placeholder='12345678'
                {...getFieldProps('password')}
                error={!!errors.password}
                helperText={errors.password}
              />
              <CustomButton
                loading={isSubmitting}
                type="submit"
                className='w-32 self-center border-black/75 text-black hover:scale-105 duration-100'
              >
                Login
              </CustomButton>
            </FormDiv>
          </FormContainer>
        </div>
      </div>
    </>
  )
}