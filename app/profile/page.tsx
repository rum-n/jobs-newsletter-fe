'use client'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import EditProfileForm from '../components/EditProfileForm'
import Modal from '../components/Modal'

interface UserData {
  id: string
  email: string
  name: string
  keywords?: string[]
}

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.input};
  border-radius: 10px;
  margin-top: 7rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const Title = styled.h2`
  font-weight: 800;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`

const InfoItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
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

const Button = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.error};
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
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  font-size: 0.8rem;
`

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  text-align: left;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const ProfileSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.25rem;
`

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleUnsubscribe = async () => {
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete account')
      }

      router.push('/') // Redirect to home page after successful deletion
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

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
          <ProfileGrid>
            <ProfileSection>
              <SectionTitle>Personal Information</SectionTitle>
              <InfoItem><strong>Name:</strong> {user.name || 'Not set'}</InfoItem>
              <InfoItem><strong>Email:</strong> {user.email}</InfoItem>
            </ProfileSection>

            <ProfileSection>
              <SectionTitle>Job Preferences</SectionTitle>
              {user.keywords && user.keywords.length > 0 ? (
                <PreferenceChips>
                  {user.keywords.map(pref => (
                    <PreferenceChip key={pref}>
                      {pref}
                    </PreferenceChip>
                  ))}
                </PreferenceChips>
              ) : (
                <span>No preferences set</span>
              )}
            </ProfileSection>
          </ProfileGrid>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '5rem' }}>
            <EditButton onClick={() => setIsEditing(true)}>Edit Profile</EditButton>
            <Button onClick={() => setIsModalOpen(true)}>Unsubscribe</Button>
          </div>
        </>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleUnsubscribe}
        title="Confirm Unsubscribe"
        message="Are you sure you want to unsubscribe? This will permanently delete your account and all associated data."
      />
    </ProfileContainer>
  )
}