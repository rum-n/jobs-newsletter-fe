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
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.input};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
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

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.input};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  margin-bottom: 0.5rem;
`

export const preferenceOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'devops', label: 'DevOps' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'security', label: 'Security' },
  { value: 'sre', label: 'SRE' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'data-analyst', label: 'Data Analyst' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'data-engineer', label: 'Data Engineer' },
  { value: 'data-architect', label: 'Data Architect' },
] as const

interface EditProfileFormProps {
  initialData: {
    name: string
    preferences?: {
      preferences: Record<string, any>
    }
  }
  onCancel: () => void
}

export default function EditProfileForm({ initialData, onCancel }: EditProfileFormProps) {
  const [name, setName] = useState(initialData.name)
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    Object.keys(initialData.preferences?.preferences || {})
  )
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleAddPreference = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value && !selectedPreferences.includes(value)) {
      setSelectedPreferences([...selectedPreferences, value])
    }
    e.target.value = '' // Reset select after selection
  }

  const handleRemovePreference = (preference: string) => {
    setSelectedPreferences(selectedPreferences.filter(p => p !== preference))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsError(false)

    try {
      // Convert preferences array to object
      const preferencesObject = selectedPreferences.reduce((acc, pref) => {
        acc[pref] = true
        return acc
      }, {} as Record<string, boolean>)

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          preferences: preferencesObject
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setMessage('Profile updated successfully')
      router.refresh()
      setTimeout(onCancel, 1500)
    } catch (error) {
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

      <Select
        onChange={handleAddPreference}
        defaultValue=""
      >
        <option value="" disabled>Add job categories</option>
        {preferenceOptions.map(option => (
          <option
            key={option.value}
            value={option.value}
            disabled={selectedPreferences.includes(option.value)}
          >
            {option.label}
          </option>
        ))}
      </Select>

      <ChipsContainer>
        {selectedPreferences.map(preference => (
          <Chip key={preference}>
            {preferenceOptions.find(opt => opt.value === preference)?.label || preference}
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
