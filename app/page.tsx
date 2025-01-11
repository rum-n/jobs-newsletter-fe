'use client'

import styled from 'styled-components'
import SignupForm from './components/SignupForm'
import { useState } from 'react'
import { ChevronDownIcon } from './components/ChevronDownIcon'
import Link from 'next/link'

const Main = styled.main``

const HeroSection = styled.section`
  padding: 0 2rem;
  margin-top: 10rem;
  margin-bottom: 4rem;
  
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 4rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const FeatureCard = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`

const SocialProof = styled.div`
  margin: 4rem 0;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;

`

// const JobPreviewSection = styled.section`
//   background: rgba(255, 255, 255, 0.02);
//   padding: 4rem 2rem;

//   @media (max-width: 768px) {
//     padding: 2rem 1rem;
//   }
// `

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`

// const JobsList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1.5rem;
//   margin-bottom: 2rem;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `

// const JobCard = styled.div`
//   background: rgba(255, 255, 255, 0.05);
//   padding: 1.5rem;
//   border-radius: 8px;

//   h3 {
//     font-size: 1.25rem;
//     margin-bottom: 0.5rem;
//   }

//   .company {
//     color: ${({ theme }) => theme.colors.primary};
//     margin-bottom: 0.5rem;
//   }

//   .salary {
//     font-weight: 600;
//     margin-bottom: 0.5rem;
//   }
// `

const FAQSection = styled.section`
  padding: 0rem 2rem 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const FAQGrid = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`

const FAQItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.input};
  padding: 1rem;
  /* background: ${({ theme }) => theme.colors.white}; */
  /* border-radius: 12px; */
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); */

  button {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
  }

  h3 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
  }
`

const AccordionIcon = styled.span<{ isOpen: boolean }>`
  transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  
  p {
    line-height: 1.6;
    margin-top: 1rem;
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: opacity 0.3s ease-in-out;
    text-align: left;
  }
`

interface FAQItemData {
  question: string;
  answer: string;
}

const faqData: FAQItemData[] = [
  {
    question: "How often will I receive job updates?",
    answer: "We send a curated list of remote tech opportunities every day of the week. You'll receive one email per day with fresh opportunities matching your preferences."
  },
  {
    question: "Is this service really free?",
    answer: "Yes! The newsletter is completely free for job seekers. We monetize through partnerships with companies looking to hire great talent."
  },
  {
    question: "What types of jobs do you feature?",
    answer: "We focus on remote tech roles including software development, design, and other technical positions. Most opportunities are full-time, though we occasionally feature contract roles."
  },
  {
    question: "Can I unsubscribe at any time?",
    answer: "Absolutely! Every email includes an unsubscribe link and you can also unsubscribe from your profile at any time. No questions asked."
  }
];

function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <FAQGrid>
      {faqData.map((item, index) => (
        <FAQItem key={index}>
          <button onClick={() => toggleItem(index)}>
            <h3>{item.question}</h3>
            <AccordionIcon isOpen={openItems.includes(index)}>
              <ChevronDownIcon />
            </AccordionIcon>
          </button>
          <AccordionContent isOpen={openItems.includes(index)}>
            <p>{item.answer}</p>
          </AccordionContent>
        </FAQItem>
      ))}
    </FAQGrid>
  );
}

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 4rem 2rem;
  margin-top: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const FooterColumn = styled.div`
  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  width: 90%;
`

export default function Home() {
  return (
    <Main>
      <HeroSection>
        <Container>
          <Title>Find Your Dream Remote Job</Title>
          <Subtitle>
            Get personalized remote job opportunities delivered to your inbox daily.
          </Subtitle>
          <SignupForm />
          <SocialProof>
            Trusted by software developers, designers, and tech professionals
          </SocialProof>
          <FeaturesGrid>
            <FeatureCard>
              <h3>Curated Opportunities</h3>
              <p>Every listing is verified and filtered for quality. We only share
                legitimate remote positions from reputable companies.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Tailored to You</h3>
              <p>Receive jobs matching your skills and preferred tech stack.
                No more sifting through irrelevant listings.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Stay Ahead</h3>
              <p>Get easy access to remote positions without having to sift through job boards.
                Be among the first to apply.</p>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </HeroSection>

      {/* <JobPreviewSection>
        <Container>
          <SectionTitle>Recent Remote Opportunities</SectionTitle>
          <JobsList>
            <JobCard>
              <h3>Senior Frontend Engineer</h3>
              <div className="company">Stripe</div>
              <div className="salary">$150k - $220k</div>
              <p>Build the future of payments with React, TypeScript, and GraphQL.</p>
            </JobCard>
            <JobCard>
              <h3>Full Stack Developer</h3>
              <div className="company">Shopify</div>
              <div className="salary">$130k - $180k</div>
              <p>Join our remote-first team working on e-commerce solutions.</p>
            </JobCard>
          </JobsList>
          <p>Subscribe to see more opportunities like these in your inbox daily!</p>
        </Container>
      </JobPreviewSection> */}

      <FAQSection>
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FAQ />
        </Container>
      </FAQSection>

      <Footer>
        <FooterContent>
          <FooterColumn>
            <h4>Project</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/employers">For Employers</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </FooterColumn>
          {/* <FooterColumn>
            <h4>Connect</h4>
            <ul>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="mailto:contact@example.com">Email Us</a></li>
            </ul>
          </FooterColumn> */}
        </FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Remote Jobs Newsletter. All rights reserved.
        </Copyright>
      </Footer>
    </Main>
  )
}