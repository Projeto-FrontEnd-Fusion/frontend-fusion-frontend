"use client"

import { useFormik } from "formik";
import * as Yup from "yup";

import { CustomButton, FormContainer, FormDiv, TextField } from "@/components/Forms";
import { LoginProps } from "@/types/auth";

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
    onSubmit: async (values) => console.log(values)
  })

  return (
    <div className='flex flex-row h-screen'>
      <div className='flex items-center m-auto '>
        <FormContainer
          onSubmit={handleSubmit}
          className='max-w-[400px] w-[400px] m-auto h-auto'
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
  )
}