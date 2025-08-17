import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VerifyWithId from './verifyWithId';

describe('VerifyWithId Component', () => {
    const user = userEvent.setup();

    it('renders the component with all required elements', () => {
        render(<VerifyWithId />);

        // Check heading and description text
        expect(screen.getByText('Enter Certificate ID')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Enter the unique certificate ID to verify its authenticity on the blockchain',
            ),
        ).toBeInTheDocument();

        // Check input field
        const input = screen.getByPlaceholderText('e.g. CERT-2023-001');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');

        // Check verify button and search icon
        expect(screen.getByText('Verify')).toBeInTheDocument();
        expect(screen.getByAltText('search')).toBeInTheDocument();
    });

    it('allows typing in the certificate ID input', async () => {
        render(<VerifyWithId />);

        const input = screen.getByPlaceholderText('e.g. CERT-2023-001');
        await user.type(input, 'CERT-2024-123');

        expect(input).toHaveValue('CERT-2024-123');
    });

    it('maintains correct styling for container and elements', () => {
        render(<VerifyWithId />);

        // Check container border color
        const container = screen.getByTestId('verify-with-id-container');
        expect(container).toHaveStyle({ borderColor: '#1c2537' });

        // Check input border color
        const input = screen.getByPlaceholderText('e.g. CERT-2023-001');
        expect(input).toHaveStyle({ borderColor: '#1c2537' });

        // Check verify button container background color
        const verifyButton = screen.getByText('Verify').parentElement;
        expect(verifyButton).toHaveStyle({ backgroundColor: '#1e3580' });
    });

    //TODO: Add test for button click when functionality is implemented
});
