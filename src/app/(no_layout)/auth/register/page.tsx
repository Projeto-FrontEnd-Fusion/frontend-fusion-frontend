"use client"

import * as Yup from 'yup';
import { useFormik } from "formik";

import { api } from '@/utils';
import { TextField, FormContainer, CustomButton, FormDiv } from '@/components/Forms';
import { RegisterProps } from '@/types/auth';

export default function RegisterPage() {
  const { errors, isSubmitting, getFieldProps, handleSubmit } = useFormik<RegisterProps>({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: {
      username: "",
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      // dateOfBirth: new Date().toLocaleDateString(),
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Por favor insira um nome de usuário'),
      email: Yup.string().required('Por favor insira um email válido.'),
      fullName: Yup.string().required('Por favor insira seu nome completo.'),
      password: Yup
        .string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
      confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Must match "password" field value'),
      // dateOfBirth: Yup.string().default(() => new Date().toLocaleDateString())
      // 
    }),
    onSubmit: async (values) => {
      console.log(values)
      await api.post('/auth/register', values)
    }
  })

  return (
    <>
      <title>Register</title>
      <meta name="description" content="Register Page" />

      <div className='flex flex-row h-screen bg-gradient-to-b from-black via-gray-900 to-[#00294D]'>
        <div className='flex flex-col gap-10 items-center m-auto bg-white px-4 py-10 rounded-md'>
          <h2 className='font-bold text-lg'>Register Frontend Fusion</h2>
          <FormContainer
            onSubmit={handleSubmit}
            className='max-w-[360px] w-[360px] m-auto h-auto'
          >
            <FormDiv className='flex flex-col gap-6 justify-center'>
              <TextField
                type='text'
                label='Nome de usuário'
                placeholder='jhondoe53'
                {...getFieldProps('username')}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                type='text'
                label='Email'
                placeholder='jhondoe53@email.com'
                {...getFieldProps('email')}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                type='text'
                label='Nome Completo'
                placeholder='jhondoe53'
                {...getFieldProps('fullName')}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
              <TextField
                type='password'
                label='Senha'
                placeholder=''
                {...getFieldProps('password')}
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                type='password'
                label='Confirmar Senha'
                placeholder=''
                {...getFieldProps('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              {/* <TextField
                type='date'
                label='Data de Nascimento'
                placeholder={new Date().toLocaleDateString()}
                {...getFieldProps('dateOfBirth')}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              /> */}
              <CustomButton
                loading={isSubmitting}
                type="submit"
                className='w-32 self-center border-black/75 text-black hover:scale-105 duration-100'
              >
                Cadastrar-se
              </CustomButton>
            </FormDiv>

          </FormContainer>
        </div>
      </div>
    </>
  )
}