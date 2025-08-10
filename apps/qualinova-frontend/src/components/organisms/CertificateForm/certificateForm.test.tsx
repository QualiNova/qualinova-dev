import React from 'react';
import { render, screen } from '@testing-library/react';
import CertificateForm from './certificateForm';
import { useCreateCertificate } from '@/contexts/createCertificateContext';


jest.mock('../../../contexts/createCertificateContext.tsx', () => ({
  useCreateCertificate: jest.fn(),
}));

const mockUpdateData = jest.fn();
const mockSetStep = jest.fn();

const setup = () => {
  (useCreateCertificate as jest.Mock).mockReturnValue({
    data: {
      name: '',
      description: '',
      template: 'standard',
      type: '',
    },
    updateData: mockUpdateData,
    setStep: mockSetStep,
  });

  render(<CertificateForm />);
};

describe('CertificateForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders major page details', () => {
    setup();

    expect(screen.getByText('Certificate Details')).toBeInTheDocument();
    expect(screen.getByText('Enter the basic certificate information')).toBeInTheDocument();
    expect(screen.getByText('Certificate Template')).toBeInTheDocument();
  });

  it('renders all form fields correctly', () => {
    setup();

    expect(screen.getByLabelText('Certificate Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Certificate Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Standard Template')).toBeInTheDocument();
    expect(screen.getByLabelText('Premium Template')).toBeInTheDocument();
    expect(screen.getByLabelText('Custom Template')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next Step/i })).toBeInTheDocument();
  });

  it('defaults to "standard" template radio selected', () => {
    setup();

    const standardRadio = screen.getByLabelText('Standard Template') as HTMLInputElement;
    expect(standardRadio.checked).toBe(true);
  });

});
