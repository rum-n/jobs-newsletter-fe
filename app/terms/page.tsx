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

export default function TermsAndConditions() {
  return (
    <Main>
      <Container>
        <Title>Terms and Conditions</Title>

        <Section>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using Remote Jobs Newsletter, you agree to be bound by these Terms and
            Conditions and our Privacy Policy. If you disagree with any part of these terms, you may
            not access our service.
          </p>
        </Section>

        <Section>
          <h2>2. Description of Service</h2>
          <p>
            Remote Jobs Newsletter provides a job listing and newsletter service that connects remote
            workers with employment opportunities. We aggregate job postings from various sources and
            deliver them to subscribers based on their preferences.
          </p>
        </Section>

        <Section>
          <h2>3. User Accounts</h2>
          <p>When creating an account, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain and update your information as needed</li>
            <li>Keep your password secure and confidential</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Be responsible for all activities under your account</li>
          </ul>
        </Section>

        <Section>
          <h2>4. Subscription and Payments</h2>
          <p>
            Our service may include paid features. By subscribing to a paid service, you agree to:
          </p>
          <ul>
            <li>Provide accurate billing information</li>
            <li>Pay all charges at the prices in effect when incurred</li>
            <li>Pay any applicable taxes</li>
            <li>Cancel your subscription according to our cancellation policy</li>
          </ul>
        </Section>

        <Section>
          <h2>5. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are owned by Remote Jobs
            Newsletter and are protected by international copyright, trademark, patent, trade secret,
            and other intellectual property laws.
          </p>
        </Section>

        <Section>
          <h2>6. User Content</h2>
          <p>
            Any content you submit to our service remains your property, but you grant us a license to
            use, modify, and display that content in connection with our service.
          </p>
        </Section>

        <Section>
          <h2>7. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to any part of the service</li>
            <li>Interfere with or disrupt the service</li>
            <li>Scrape or copy content without permission</li>
            <li>Impersonate others or provide false information</li>
          </ul>
        </Section>

        <Section>
          <h2>8. Limitation of Liability</h2>
          <p>
            Remote Jobs Newsletter shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or inability to use the
            service.
          </p>
        </Section>

        <Section>
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any
            material changes via email or through the service. Continued use of the service after
            changes constitutes acceptance of the new terms.
          </p>
        </Section>

        <Section>
          <h2>10. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the service immediately, without
            prior notice, for conduct that we believe violates these Terms or is harmful to other
            users, us, or third parties, or for any other reason.
          </p>
        </Section>

        <Section>
          <h2>11. Contact Information</h2>
          <p>
            For any questions about these Terms, please contact us at{' '}
            <Link href="mailto:legal@example.com">legal@example.com</Link>
          </p>
        </Section>

        <LastUpdated>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </LastUpdated>
      </Container>
    </Main>
  )
}
