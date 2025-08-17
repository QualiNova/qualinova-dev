import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import VerifyWithQr from './verifyWithQr';

describe('VerifyWithQr Component', () => {
    const user = userEvent.setup();

    it('renders the component with all required elements', () => {
        render(<VerifyWithQr />);

        // Check headings and description texts
        expect(screen.getByText('Scan QR Code')).toBeInTheDocument();
        expect(
            screen.getByText('Scan the QR code on the certificate to verify its authenticity'),
        ).toBeInTheDocument();
        expect(screen.getByText('QR Code Scanner')).toBeInTheDocument();
        expect(
            screen.getByText(/Position the QR code within the scanner area/),
        ).toBeInTheDocument();

        // Check QR code images
        const qrImages = screen.getAllByAltText('qr code');
        expect(qrImages).toHaveLength(2);
        expect(qrImages[0]).toHaveAttribute('src', 'QR.svg');
        expect(qrImages[1]).toHaveAttribute('src', 'QR.svg');

        // Check start scanner button
        expect(screen.getByText('Start Scanner')).toBeInTheDocument();
    });

    it('maintains correct styling for container and elements', () => {
        render(<VerifyWithQr />);

        // Check main container border
        const mainContainer = screen.getByTestId('verify-with-qr-container');
        expect(mainContainer).toHaveClass('border-[#1c2537]');

        // Check QR scanner container border
        const scannerContainer = screen.getByTestId('qr-image-container');
        expect(scannerContainer).toHaveClass('border-dashed');
        expect(scannerContainer).toHaveClass('border-[#1c2537]');

        // Check scanner button container background
        const buttonContainer = screen.getByText('Start Scanner').parentElement;
        expect(buttonContainer).toHaveClass('bg-[#3962ea]');
    });

    it('handles start scanner button click', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        render(<VerifyWithQr />);

        const startButton = screen.getByText('Start Scanner');
        await user.click(startButton);

        // Add assertions when scanner functionality is implemented
        consoleSpy.mockRestore();
    });

    it('displays QR code images with correct dimensions', () => {
        render(<VerifyWithQr />);

        const qrImages = screen.getAllByAltText('qr code');

        // Check main QR code image dimensions
        expect(qrImages[0]).toHaveAttribute('width', '90');
        expect(qrImages[0]).toHaveAttribute('height', '90');

        // Check button QR code image dimensions
        expect(qrImages[1]).toHaveAttribute('width', '20');
        expect(qrImages[1]).toHaveAttribute('height', '20');
    });
});
