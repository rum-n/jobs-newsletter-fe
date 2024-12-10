'use client'

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
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  
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
  padding: 0.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0051cc;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2)
  })
  
  type SignupData = z.infer<typeof signupSchema>
  
  export default function SignupForm() {
    const [isLoading, setIsLoading] = useState(false)
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
      resolver: zodResolver(signupSchema)
    })
  
    const onSubmit = async (data: SignupData) => {
      setIsLoading(true)
      try {
        // Implement signup logic
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        
        if (!response.ok) throw new Error('Signup failed')
        
        // Handle successful signup
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Input
            {...register('name')}
            placeholder="Full Name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
  
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
  
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </InputGroup>
      </Form>
    )
  }