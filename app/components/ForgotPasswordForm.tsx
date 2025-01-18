import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import * as z from 'zod'

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

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError ? '#ff0000' : '#00c853'};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true)
    setMessage('')
    setIsError(false)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to process request')
      }

      setMessage(responseData.message)
    } catch (error) {
      console.error('Error in forgot password:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      })
      setIsError(true)
      setMessage(error instanceof Error ? error.message : 'Failed to process request')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        {errors.email && <Message isError>{errors.email.message}</Message>}

        {message && <Message isError={isError}>{message}</Message>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Reset Password'}
        </Button>
      </InputGroup>
    </Form>
  )
}