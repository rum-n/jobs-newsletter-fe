'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  z-index: 100;
  padding: 0.7 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Nav = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  img {
    height: 80px;
    margin: 0.5rem 1rem;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    gap: 1rem;
  }
`

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: opacity 0.3s ease;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by making a request to the profile endpoint
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/user/profile')
        setIsLoggedIn(response.ok)
      } catch (error) {
        setIsLoggedIn(false)
        console.error('Error checking auth status:', error)
      }
    }

    checkAuthStatus()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })

      if (response.ok) {
        setIsLoggedIn(false)
        // Clear any cached data
        await fetch('/api/user/profile', { method: 'HEAD' })
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <HeaderContainer>
      <Nav>
        <Logo href="/">
          <Image src="/meerkat.png" alt="Daily Observable Logo" width={50} height={80} />
          Daily Observable
        </Logo>
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <div style={{ fontSize: '2rem' }}>✕</div> : <div style={{ fontSize: '2rem' }}>☰</div>}
        </MobileMenuButton>
        <NavLinks isOpen={isMenuOpen}>
          <NavLink href="/employers">For Employers</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink href="/profile">Profile</NavLink>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <Button as={Link} href="/signup">Sign Up</Button>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  )
}