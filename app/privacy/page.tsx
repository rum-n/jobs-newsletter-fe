'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Main = styled.main`
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 2.5rem;
`

const Section = styled.section`
  margin-bottom: 3rem;
  
  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1rem;
    font-size: 1.75rem;
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }
`

const LastUpdated = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-style: italic;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.input};
`

export default function PrivacyPolicy() {
  return (
    <Main>
      <Container>
        <Title>Privacy Policy</Title>

        <Section>
          <h2>Introduction</h2>
          <p>
            At Remote Jobs Newsletter, we take your privacy seriously. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our service.
          </p>
        </Section>

        <Section>
          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Email address</li>
            <li>Job preferences and interests</li>
            <li>Account credentials</li>
            <li>Communication preferences</li>
          </ul>
        </Section>

        <Section>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Send personalized job newsletters</li>
            <li>Improve our service and user experience</li>
            <li>Communicate with you about your account</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
        </Section>

        <Section>
          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your
            information only in the following circumstances:
          </p>
          <ul>
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>With service providers who assist in our operations</li>
          </ul>
        </Section>

        <Section>
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </Section>

        <Section>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Update your preferences</li>
          </ul>
        </Section>

        <Section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <Link href="mailto:privacy@example.com">privacy@example.com</Link>
          </p>
        </Section>

        <LastUpdated>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </LastUpdated>
      </Container>
    </Main>
  )
}