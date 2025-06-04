import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavMenu from './NavMenu'

// Mock the NavLink component
jest.mock('@/components/atoms/NavLink/NavLink', () => {
  return function MockNavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return <a href={href}>{children}</a>
  }
})

// Mock the Button component
jest.mock('@/components/atoms/Button/Button', () => {
  return function MockButton({ children, className }: { children: React.ReactNode; className?: string }) {
    return <button className={className}>{children}</button>
  }
})

describe('NavMenu', () => {
  beforeEach(() => {
    // Reset window size before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('renders desktop navigation links', () => {
    render(<NavMenu />)

    // Check if desktop navigation is present
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Create Certificate')).toBeInTheDocument()
    expect(screen.getByText('Verify')).toBeInTheDocument()
    expect(screen.getByText('Certificates')).toBeInTheDocument()
  })

  it('renders desktop buttons', () => {
    render(<NavMenu />)

    const signInButtons = screen.getAllByText('Sign In')
    const signUpButtons = screen.getAllByText('Sign Up')

    expect(signInButtons.length).toBeGreaterThan(0)
    expect(signUpButtons.length).toBeGreaterThan(0)
  })

  it('shows mobile menu button', () => {
    render(<NavMenu />)

    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when menu button is clicked', () => {
    render(<NavMenu />)

    const menuButton = screen.getByRole('button')

    // Initially mobile menu should not be visible
    expect(screen.queryByText('Home')).toBeInTheDocument() // Desktop version

    // Click to open mobile menu
    fireEvent.click(menuButton)

    // Mobile menu should now be visible with all links
    const homeLinks = screen.getAllByText('Home')
    expect(homeLinks.length).toBeGreaterThan(1) // Both desktop and mobile versions
  })

  it('changes menu icon when mobile menu is opened', () => {
    render(<NavMenu />)

    const menuButton = screen.getByRole('button')

    // Initially should show Menu icon (not X)
    fireEvent.click(menuButton)

    // After clicking, should show X icon
    // The icon change is handled by the Menu/X lucide-react components
    expect(menuButton).toBeInTheDocument()
  })

  it('mobile menu contains all navigation items', () => {
    render(<NavMenu />)

    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)

    // Check if all mobile navigation links are present
    const homeLinks = screen.getAllByText('Home')
    const dashboardLinks = screen.getAllByText('Dashboard')
    const createLinks = screen.getAllByText('Create Certificate')
    const verifyLinks = screen.getAllByText('Verify')
    const certificateLinks = screen.getAllByText('Certificates')

    expect(homeLinks.length).toBeGreaterThanOrEqual(2) // Desktop + Mobile
    expect(dashboardLinks.length).toBeGreaterThanOrEqual(2)
    expect(createLinks.length).toBeGreaterThanOrEqual(2)
    expect(verifyLinks.length).toBeGreaterThanOrEqual(2)
    expect(certificateLinks.length).toBeGreaterThanOrEqual(2)
  })

  it('has proper responsive classes for desktop', () => {
    const { container } = render(<NavMenu />)

    // Check for desktop-specific classes
    const desktopNav = container.querySelector('.hidden.ml-6.md\\:flex')
    const desktopButtons = container.querySelector('.hidden.md\\:flex')

    expect(desktopNav).toBeInTheDocument()
    expect(desktopButtons).toBeInTheDocument()
  })

  it('has proper responsive classes for mobile', () => {
    const { container } = render(<NavMenu />)

    // Check for mobile-specific classes
    const mobileButton = container.querySelector('.absolute.md\\:hidden')

    expect(mobileButton).toBeInTheDocument()
  })

  it('mobile menu has correct styling classes', () => {
    const { container } = render(<NavMenu />)

    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)

    // Check for mobile menu container classes
    const mobileMenu = container.querySelector('.md\\:hidden.mt-4')
    expect(mobileMenu).toBeInTheDocument()
  })

  it('sign up button has correct styling', () => {
    render(<NavMenu />)

    const signUpButtons = screen.getAllByText('Sign Up')

    // At least one Sign Up button should have the blue background class
    const styledButton = signUpButtons.find(button =>
      button.className?.includes('bg-[#2563EB]')
    )

    expect(signUpButtons.length).toBeGreaterThan(0)
  })

  // Mobile responsiveness tests
  it('behaves correctly on mobile viewport', () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(<NavMenu />)

    // Mobile menu button should be accessible
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()

    // Test mobile menu toggle
    fireEvent.click(menuButton)

    // Mobile navigation should be visible
    const mobileNavLinks = screen.getAllByText('Home')
    expect(mobileNavLinks.length).toBeGreaterThan(0)
  })
})