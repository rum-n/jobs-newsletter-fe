'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 600px;
  margin: 8rem auto;
  padding: 2rem;
  text-align: center;
`

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError ? '#ff0000' : '#00c853'};
  margin: 1rem 0;
`

const Button = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    opacity: 0.9;
  }
`

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided')
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify email')
        }

        setStatus('success')
        setMessage(data.message)
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : 'Failed to verify email')
      }
    }

    verifyEmail()
  }, [token])

  return (
    <Container>
      <h1>Email Verification</h1>
      {status === 'loading' && <Message>Verifying your email...</Message>}
      {status === 'success' && (
        <>
          <Message>{message}</Message>
          <Button onClick={() => router.push('/login')}>
            Proceed to Login
          </Button>
        </>
      )}
      {status === 'error' && <Message isError>{message}</Message>}
    </Container>
  )
}