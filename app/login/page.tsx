'use client'

import React from 'react'
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import { useSearchParams } from 'next/navigation';

const LoginContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError ? '#ff0000' : '#00c853'};
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: center;
`


const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default function LoginPage() {
  const searchParams = useSearchParams()
  const verified = searchParams.get('verified')
  const message = verified ? 'Email verified successfully! You can now login.' : ''

  return (
    <LoginContainer>
      <Title>Welcome Back</Title>
      <Message>{message}</Message>
      <LoginForm />
    </LoginContainer>
  )
}


