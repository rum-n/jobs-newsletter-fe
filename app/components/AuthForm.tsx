'use client'

import { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`

interface AuthFormProps {
  initialMode?: 'login' | 'signup'
  onSuccess?: () => void
}

export default function AuthForm({ initialMode = 'signup', onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login')

  return (
    <Container>
      {isLogin ? (
        <LoginForm
          onToggleForm={() => setIsLogin(false)}
        />
      ) : (
        <SignupForm
          onToggleForm={() => setIsLogin(true)}
        />
      )}
    </Container>
  )
}