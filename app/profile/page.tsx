'use client'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'

interface UserData {
  id: string
  email: string
  name: string
  preferences?: {
    preferences: Record<string, any>
  }
}

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`

const ProfileInfo = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`

const InfoItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
`

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.125rem;
`

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile')

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          throw new Error('Failed to fetch user data')
        }

        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (isLoading) {
    return (
      <ProfileContainer>
        <LoadingText>Loading...</LoadingText>
      </ProfileContainer>
    )
  }

  if (!user) {
    return (
      <ProfileContainer>
        <LoadingText>Error loading profile</LoadingText>
      </ProfileContainer>
    )
  }

  return (
    <ProfileContainer>
      <Title>Your Profile</Title>
      <ProfileInfo>
        <InfoItem><strong>Name:</strong> {user.name || 'Not set'}</InfoItem>
        <InfoItem><strong>Email:</strong> {user.email}</InfoItem>
        <InfoItem>
          <strong>Preferences:</strong>{' '}
          {user.preferences
            ? JSON.stringify(user.preferences.preferences, null, 2)
            : 'No preferences set'}
        </InfoItem>
      </ProfileInfo>
      <EditButton>Edit Profile</EditButton>
    </ProfileContainer>
  )
} 