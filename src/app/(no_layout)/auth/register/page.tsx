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
      dateOfBirth: new Date().toLocaleDateString(),
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Por favor insira um nome de usuário'),
      email: Yup.string().required('Por favor insira um email válido.'),
      fullName: Yup.string().required('Por favor insira seu nome completo.'),
      dateOfBirth: Yup.string().default(() => new Date().toLocaleDateString())
    }),
    onSubmit: async (values) => {
      await api.post('user', values)
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
                type='date'
                label='Data de Nascimento'
                placeholder={new Date().toLocaleDateString()}
                {...getFieldProps('dateOfBirth')}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              />
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