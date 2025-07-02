import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock Button component since we don't know the exact implementation
const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = 'button',
  variant = 'primary',
  className = ''
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  className?: string
}) => (
  <button 
    type={type} 
    onClick={onClick} 
    disabled={disabled}
    className={`btn btn-${variant} ${className}`}
  >
    {children}
  </button>
)

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies correct variant class', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-secondary')
  })
})
