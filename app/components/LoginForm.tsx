'use client'

import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import PasswordWrapper from './PasswordWrapper'
// import Link from 'next/link'
// import { theme } from '../theme'

// Reuse the styled components from SignupForm
const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const SignUpText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};

  button {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
})

type LoginData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onToggleForm?: () => void
}

export default function LoginForm({ onToggleForm }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to login')
      }

      router.push('/profile')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Input
            {...register('email')}
            type="email"
            placeholder="Email"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <PasswordWrapper register={register} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          {/* <Link href="/forgot-password" style={{ textAlign: 'right', fontSize: '0.875rem', color: theme.colors.primary }}>
            Forgot password?
          </Link> */}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </InputGroup>
      </Form>
      <SignUpText>
        No account yet? <button onClick={onToggleForm}>Sign up</button>
      </SignUpText>
    </>
  )
}