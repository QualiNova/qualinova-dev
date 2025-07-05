import { render, screen, fireEvent } from '@testing-library/react'
import { createContext, useContext, useState, ReactNode } from 'react'
import '@testing-library/jest-dom'

// Mock context for testing
interface CertificationContextType {
  certificates: string[]
  addCertificate: (cert: string) => void
}

const CertificationContext = createContext<CertificationContextType | undefined>(undefined)

const CertificationProvider = ({ children }: { children: ReactNode }) => {
  const [certificates, setCertificates] = useState<string[]>([])
  
  const addCertificate = (cert: string) => {
    setCertificates(prev => [...prev, cert])
  }

  return (
    <CertificationContext.Provider value={{ certificates, addCertificate }}>
      {children}
    </CertificationContext.Provider>
  )
}

const TestComponent = () => {
  const context = useContext(CertificationContext)
  if (!context) throw new Error('Must be used within provider')
  
  const { certificates, addCertificate } = context
  
  return (
    <div>
      <button onClick={() => addCertificate('TEST-CERT')}>
        Add Certificate
      </button>
      <div data-testid="cert-count">{certificates.length}</div>
    </div>
  )
}

describe('CertificationContext', () => {
  it('provides initial empty certificates array', () => {
    render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    )
    
    expect(screen.getByTestId('cert-count')).toHaveTextContent('0')
  })

  it('adds certificates correctly', () => {
    render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    )
    
    fireEvent.click(screen.getByText('Add Certificate'))
    expect(screen.getByTestId('cert-count')).toHaveTextContent('1')
  })
})