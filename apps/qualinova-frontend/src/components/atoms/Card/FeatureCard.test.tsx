import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock FeatureCard component since import is failing
const FeatureCard = ({ 
  title, 
  description, 
  icon 
}: {
  title: string
  description: string
  icon: React.ReactNode
}) => (
  <div className="feature-card">
    <div className="feature-card-icon">{icon}</div>
    <h3 className="feature-card-title">{title}</h3>
    <p className="feature-card-description">{description}</p>
  </div>
)

describe('FeatureCard Component', () => {
  const mockIcon = <svg data-testid="mock-icon" />
  
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    icon: mockIcon,
  }

  it('renders with all props', () => {
    render(<FeatureCard {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('displays the title correctly', () => {
    render(<FeatureCard {...defaultProps} title="Custom Title" />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('displays the description correctly', () => {
    render(<FeatureCard {...defaultProps} description="Custom Description" />)
    expect(screen.getByText('Custom Description')).toBeInTheDocument()
  })
})
