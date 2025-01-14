'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
  max-width: 800px;
  margin: 5rem auto 3rem auto;
  padding: 2rem 2rem;

  @media (max-width: 768px) {
    margin: 1rem auto 0 auto;
    padding: 1rem;
  }
`

const Section = styled.section`
  margin-bottom: 3rem;
  
  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1rem;
    font-size: 1.75rem;
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
  }
`

export default function AboutPage() {
  return (
    <Container>
      <Section>
        <h2>Short and sweet</h2>
        <p>
          Daily Observable was founded with a simple yet powerful mission: to bridge the gap between talented professionals and remote opportunities. Great work can happen anywhere, and this platform helps make that possible.
        </p>
      </Section>

      <Section>
        <h2>Get in Touch</h2>
        <p>
          Have questions or suggestions? We&apos;d love to hear from you. Reach out at{' '}
          <Link href="mailto:jobs@dailyobservable.com" style={{ color: 'inherit' }}>
            jobs@dailyobservable.com
          </Link>
        </p>
      </Section>
    </Container>
  )
}