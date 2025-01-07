'use client'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import EditProfileForm, { preferenceOptions } from '../components/EditProfileForm'

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
  padding: 2rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.input};
  border-radius: 10px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const Title = styled.h2`
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
  padding: 0.7rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
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

const PreferenceChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  min-height: 50px;
`

const PreferenceChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  font-size: 0.8rem;
`

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const getPreferenceLabel = (value: string) => {
    return preferenceOptions.find((opt: { value: string }) => opt.value === value)?.label || value
  }

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
      <Title>{isEditing ? 'Edit Profile' : 'Your Profile'}</Title>
      {isEditing ? (
        <EditProfileForm
          initialData={user}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <ProfileInfo>
            <InfoItem><strong>Name:</strong> {user.name || 'Not set'}</InfoItem>
            <InfoItem><strong>Email:</strong> {user.email}</InfoItem>
            <InfoItem>
              <strong>Preferences:</strong>
              {user.preferences && Object.keys(user.preferences.preferences).length > 0 ? (
                <PreferenceChips>
                  {Object.keys(user.preferences.preferences).map(pref => (
                    <PreferenceChip key={pref}>
                      {getPreferenceLabel(pref)}
                    </PreferenceChip>
                  ))}
                </PreferenceChips>
              ) : (
                <span style={{ marginLeft: '0.5rem' }}>No preferences set</span>
              )}
            </InfoItem>
          </ProfileInfo>
          <EditButton onClick={() => setIsEditing(true)}>Edit Profile</EditButton>
        </>
      )}
    </ProfileContainer>
  )
}