import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CertificateForm from './certificateForm';
import { useCreateCertificate } from '@/contexts/createCertificateContext';

jest.mock('../../../contexts/createCertificateContext.tsx', () => ({
  useCreateCertificate: jest.fn(),
}));

const mockUpdateData = jest.fn();
const mockSetStep = jest.fn();

jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
    useFormContext: jest.fn(),
}));

const setup = () => { //TODO: Still buggy, fails here, tried another approach to mock useCreateCertificate context but still not working, there also seems to be an issue with useForm hook mock (open to fix suggestions)
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
});
