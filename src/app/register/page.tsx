"use client"

import * as Yup from 'yup';
import { useFormik } from "formik";

import { api } from '@/utils';

import { TextField, FormContainer, CustomButton, FormDiv } from '@/components/Forms';
import { RegisterProps } from '@/types/auth';

export function RegisterPage() {
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
    <div className='flex flex-row h-screen'>
      <div className='flex items-center m-auto'>
        <FormContainer
          onSubmit={handleSubmit}
          className='max-w-[400px] w-[400px] m-auto h-auto'
        >
          <FormDiv className='flex flex-col gap-6 justify-center'>
            <TextField
              type='text'
              label='Username'
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
              label='Full Name'
              placeholder='jhondoe53'
              {...getFieldProps('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              type='date'
              label='Date Of Birth'
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
  )
}