'use client'

import styled from 'styled-components'
import { useState } from 'react'
import { ChevronDownIcon } from './components/ChevronDownIcon'
import AuthForm from './components/AuthForm'
import { MacBook } from './components/MacBook'

const Main = styled.main``

const HeroSection = styled.section`
  padding: 0 2rem;
  margin-top: 10rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-top: 2rem;
    margin-bottom: 0rem;
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
    line-height: 1.2;
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

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`

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

const VideoSection = styled.section`
  padding: 4rem 0;
  overflow: hidden;
`

const LaptopContainer = styled.div`
  position: relative;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`

const LaptopFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
`

const VideoWrapper = styled.div`
  position: absolute;
  top: 4.6%;
  left: 12.6%;
  width: 75.5%;
  height: 76%;
  overflow: hidden;
  background: #000;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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

export default function Home() {
  return (
    <Main>
      <HeroSection>
        <Container>
          <Title>Find Your Dream Remote Job</Title>
          <Subtitle>
            Get personalized remote job opportunities delivered to your inbox daily.
          </Subtitle>
          <AuthForm />
          <SocialProof>
            Trusted by thousands of <span style={{
              backgroundColor: 'rgba(18, 38, 58, 0.1)',
              padding: '0 4px',
              borderRadius: '4px',
            }}>software developers</span>, <span style={{
              backgroundColor: 'rgba(81, 28, 41, 0.1)',
              padding: '0 4px',
              borderRadius: '4px',
            }}>designers</span>, and <span style={{
              backgroundColor: 'rgba(87, 98, 213, 0.1)',
              padding: '0 4px',
              borderRadius: '4px',
            }}>tech professionals</span>
          </SocialProof>

          <Subtitle>
            We search on <b>20+ job boards</b> and send you the best opportunities so you don&apos;t have to.
          </Subtitle>
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

      <VideoSection>
        <Container>
          <LaptopContainer>
            <LaptopFrame>
              <MacBook />
              <VideoWrapper>
                <video autoPlay loop muted playsInline>
                  <source src="/email-scroll-2.mp4" type="video/mp4" />
                </video>
              </VideoWrapper>
            </LaptopFrame>
          </LaptopContainer>
        </Container>
      </VideoSection>

      <FAQSection>
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FAQ />
        </Container>
      </FAQSection>
    </Main>
  )
}