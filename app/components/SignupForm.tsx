'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

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
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.lg};

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
    transition: opacity 0.3s ease;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError ? '#ff0000' : '#00c853'};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`

const SignInText = styled.p`
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

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignupData = z.infer<typeof signupSchema>

interface SignupFormProps {
  onToggleForm?: () => void
}

export default function SignupForm({ onToggleForm }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data: SignupData) => {
    setIsLoading(true)
    setMessage('')
    setIsError(false)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create account')
      }

      setMessage('Account created successfully! Redirecting...')
      setTimeout(() => {
        router.push('/profile')
      }, 2000)
    } catch (error) {
      setIsError(true)
      setMessage(error instanceof Error ? error.message : 'Failed to create account')
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

          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          {message && <Message isError={isError}>{message}</Message>}

          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </InputGroup>
      </Form>
      <SignInText>
        Already have an account? <button onClick={onToggleForm}>Sign in</button>
      </SignInText>
    </>
  )
}