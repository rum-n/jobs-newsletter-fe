'use client'

import React from 'react'
import styled from 'styled-components'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default function ForgotPasswordPage() {
  return (
    <Container>
      <Title>Reset Password</Title>
      <ForgotPasswordForm />
    </Container>
  )
}