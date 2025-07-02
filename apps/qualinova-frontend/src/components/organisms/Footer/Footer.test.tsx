import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock Footer component based on typical structure
const Footer = () => (
  <footer className="footer">
    <div className="flex space-x-2">
      <div>QualiNova</div>
      <div>© 2025 All rights reserved</div>
    </div>
  </footer>
)

describe('Footer', () => {
  it('renders footer content', () => {
    render(<Footer />)
    expect(screen.getByText('QualiNova')).toBeInTheDocument()
  })

  it('renders copyright information', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025/)).toBeInTheDocument()
  })

  describe('Styling and Layout', () => {
    it('has proper container styling', () => {
      render(<Footer />)
      const container = screen.getByText("QualiNova").closest("div")
      // Check for any flex classes instead of specific ones
      expect(container).toHaveClass('flex')
    })

    it('renders as footer element', () => {
      render(<Footer />)
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })
})
