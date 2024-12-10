'use client'

import styled from 'styled-components'
import SignupForm from './components/SignupForm'

const Main = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%);
`

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
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #0070f3 0%, #00a6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

export default function Home() {
  return (
    <Main>
      <HeroSection>
        <Container>
          <Title>Find Your Dream Remote Job</Title>
          <Subtitle>
            Get personalized remote job opportunities delivered to your inbox weekly.
          </Subtitle>
          <SignupForm />
        </Container>
      </HeroSection>
    </Main>
  )
}