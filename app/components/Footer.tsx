import Link from 'next/link'
import styled from 'styled-components'

const FooterContainer = styled.footer`
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
  gap: 5rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
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

export default function Footer() {

  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <h4>Company</h4>
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
              <li><a href="mailto:contact@example.com">Email Us</a></li>
            </ul>
          </FooterColumn> */}
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} Remote Jobs Newsletter. All rights reserved.
      </Copyright>
    </FooterContainer>
  )
}