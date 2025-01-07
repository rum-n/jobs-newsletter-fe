import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`

const Title = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const Message = styled.p`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

const Button = styled.button<{ variant?: 'danger' }>`
  padding: 0.7rem 1.5rem;
  background-color: ${({ theme, variant }) =>
    variant === 'danger' ? theme.colors.error : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

export default function Modal({ isOpen, onClose, onConfirm, title, message }: ModalProps) {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirm
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  )
}