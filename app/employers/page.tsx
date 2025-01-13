'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`

const PricingGrid = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  /* gap: 2rem; */
  margin-top: 4rem;
  justify-content: center;
`

const PricingCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  width: 400px;

`

const PlanName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;

  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
  text-align: left;

  li {
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`

const pricingPlans = [
  {
    name: 'Simple pricing',
    price: 49,
    duration: 'week',
    features: [
      'Single job posting',
      '1 week visibility',
      'Shared in newsletter 7 times',
      'Featured in relevant user profiles',
      'Email support',
    ]
  },
  // {
  //   name: 'Standard',
  //   price: 179,
  //   duration: '30 days',
  //   features: [
  //     'Single job posting',
  //     '30 days visibility',
  //     'Featured job listing',
  //     'Priority support',
  //     'Shared in newsletter twice',
  //     'Social media promotion'
  //   ]
  // },
  // {
  //   name: 'Premium',
  //   price: 299,
  //   duration: '30 days',
  //   features: [
  //     'Single job posting',
  //     '30 days visibility',
  //     'Featured job listing',
  //     'Priority support',
  //     'Shared in newsletter 4 times',
  //     'Social media promotion',
  //     'Company spotlight feature',
  //     'Top of search results'
  //   ]
  // }
]

export default function EmployersPage() {
  return (
    <Container>
      <Hero>
        <Title>Hire Remote Talent</Title>
        <Subtitle>
          Reach thousands of qualified remote workers. Our newsletter connects you with professionals actively seeking remote opportunities.
        </Subtitle>
      </Hero>

      <PricingGrid>
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name}>
            <PlanName>{plan.name}</PlanName>
            <Price>
              ${plan.price} <span>/ {plan.duration}</span>
            </Price>
            <FeatureList>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </FeatureList>
            <Button href="/employers/post">Post a Job</Button>
          </PricingCard>
        ))}
      </PricingGrid>
    </Container>
  )
}