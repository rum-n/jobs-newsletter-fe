'use client'

import React from 'react'
import styled from 'styled-components'
import SignupForm from '../components/SignupForm'

const Main = styled.main``

const HeroSection = styled.section`
  padding: 8rem 2rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
`

const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

export default function SignupPage() {
  return (
    <Main>
      <HeroSection>
        <Container>
          <Title>Sign Up</Title>
          <SignupForm />
        </Container>
      </HeroSection>
    </Main>
  )
}