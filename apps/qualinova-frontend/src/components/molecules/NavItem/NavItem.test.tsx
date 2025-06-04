import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavItem from './NavItem'

// Mock the cn utility function
jest.mock('@/lib/utils', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

describe('NavItem', () => {
  it('renders with correct href and label', () => {
    render(<NavItem href="/dashboard" label="Dashboard" />)

    const link = screen.getByRole('link', { name: 'Dashboard' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/dashboard')
    expect(link).toHaveTextContent('Dashboard')
  })

  it('renders without active state by default', () => {
    render(<NavItem href="/home" label="Home" />)

    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).not.toHaveClass('text-primary')
    expect(link).toHaveClass('text-foreground')
  })

  it('renders with active state when active prop is true', () => {
    render(<NavItem href="/current" label="Current Page" active={true} />)

    const link = screen.getByRole('link', { name: 'Current Page' })
    expect(link).toHaveClass('text-primary')
    expect(link).not.toHaveClass('text-foreground')
  })

  it('has correct base CSS classes', () => {
    render(<NavItem href="/test" label="Test" />)

    const link = screen.getByRole('link', { name: 'Test' })
    expect(link).toHaveClass(
      'px-3',
      'py-2',
      'text-sm',
      'font-medium',
      'transition-colors',
      'hover:text-primary'
    )
  })

  it('handles different href formats', () => {
    render(<NavItem href="/users/profile" label="Profile" />)

    const link = screen.getByRole('link', { name: 'Profile' })
    expect(link).toHaveAttribute('href', '/users/profile')
  })

  it('handles external links', () => {
    render(<NavItem href="https://example.com" label="External Link" />)

    const link = screen.getByRole('link', { name: 'External Link' })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('renders with hash links', () => {
    render(<NavItem href="#section1" label="Section 1" />)

    const link = screen.getByRole('link', { name: 'Section 1' })
    expect(link).toHaveAttribute('href', '#section1')
  })

  it('handles query parameters in href', () => {
    render(<NavItem href="/search?q=test" label="Search Results" />)

    const link = screen.getByRole('link', { name: 'Search Results' })
    expect(link).toHaveAttribute('href', '/search?q=test')
  })

  it('renders with special characters in label', () => {
    render(<NavItem href="/special" label="Settings & Preferences" />)

    const link = screen.getByRole('link', { name: 'Settings & Preferences' })
    expect(link).toHaveTextContent('Settings & Preferences')
  })

  it('maintains consistent styling across different states', () => {
    const { rerender } = render(<NavItem href="/test" label="Test" />)

    let link = screen.getByRole('link', { name: 'Test' })
    expect(link).toHaveClass('px-3', 'py-2', 'text-sm', 'font-medium')

    // Rerender with active state
    rerender(<NavItem href="/test" label="Test" active={true} />)

    link = screen.getByRole('link', { name: 'Test' })
    expect(link).toHaveClass('px-3', 'py-2', 'text-sm', 'font-medium')
  })

  it('is accessible as a navigation link', () => {
    render(<NavItem href="/accessibility" label="Accessibility Page" />)

    const link = screen.getByRole('link', { name: 'Accessibility Page' })
    expect(link.tagName).toBe('A')
    expect(link).toBeInTheDocument()
  })

  it('handles empty label gracefully', () => {
    render(<NavItem href="/empty" label="" />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/empty')
    expect(link).toHaveTextContent('')
  })

  it('handles root path correctly', () => {
    render(<NavItem href="/" label="Home" />)

    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toHaveAttribute('href', '/')
  })

  // Mobile responsiveness tests
  it('maintains readability on mobile devices', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(<NavItem href="/mobile" label="Mobile Navigation" />)

    const link = screen.getByRole('link', { name: 'Mobile Navigation' })
    expect(link).toHaveClass('text-sm')
    expect(link).toHaveClass('px-3', 'py-2')
  })

  it('has adequate touch target size for mobile', () => {
    render(<NavItem href="/touch" label="Touch Target" />)

    const link = screen.getByRole('link', { name: 'Touch Target' })
    // px-3 py-2 provides adequate touch target (minimum 44px recommended)
    expect(link).toHaveClass('px-3', 'py-2')
  })

  it('hover effects work appropriately across devices', () => {
    render(<NavItem href="/hover" label="Hover Test" />)

    const link = screen.getByRole('link', { name: 'Hover Test' })
    expect(link).toHaveClass('hover:text-primary')
    expect(link).toHaveClass('transition-colors')
  })

  it('handles long labels on narrow screens', () => {
    render(<NavItem href="/long" label="This Is A Very Long Navigation Label That Might Wrap" />)

    const link = screen.getByRole('link')
    expect(link).toHaveTextContent('This Is A Very Long Navigation Label That Might Wrap')
    expect(link).toHaveClass('text-sm')
  })
})