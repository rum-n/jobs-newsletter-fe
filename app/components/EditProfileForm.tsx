'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { theme } from '../theme'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  align-items: center;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.input};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  width: 60%;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
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

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError ? '#ff0000' : '#00c853'};
  text-align: center;
`

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  min-height: 50px;
  width: 100%;
`

const Chip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  font-size: 0.8rem;
`

const ChipDelete = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  &:hover {
    opacity: 0.8;
  }
`

interface EditProfileFormProps {
  initialData: {
    name: string
    keywords?: string[]
  }
  onCancel: () => void
}

export default function EditProfileForm({ initialData, onCancel }: EditProfileFormProps) {
  const [name, setName] = useState(initialData.name)
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    initialData.keywords || []
  )
  const [newKeyword, setNewKeyword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const value = newKeyword.trim()
      if (value && !selectedPreferences.includes(value)) {
        setSelectedPreferences([...selectedPreferences, value])
        setNewKeyword('')
      }
    }
  }

  const handleRemovePreference = (preference: string) => {
    setSelectedPreferences(selectedPreferences.filter(p => p !== preference))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsError(false)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          preferences: selectedPreferences.reduce((acc, pref) => {
            acc[pref] = true
            return acc
          }, {} as Record<string, boolean>)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setMessage('Profile updated successfully')
      router.refresh()
      setTimeout(onCancel, 1500)
    } catch {
      setMessage('Failed to update profile')
      setIsError(true)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <Input
        type="text"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add keyword and press Enter"
      />

      <ChipsContainer>
        {selectedPreferences.map(preference => (
          <Chip key={preference}>
            {preference}
            <ChipDelete
              type="button"
              onClick={() => handleRemovePreference(preference)}
            >
              ×
            </ChipDelete>
          </Chip>
        ))}
      </ChipsContainer>

      {message && <Message isError={isError}>{message}</Message>}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Button type="submit">Save Changes</Button>
        <Button type="button" style={{ backgroundColor: theme.colors.error }} onClick={onCancel}>Cancel</Button>
      </div>
    </Form>
  )
}
