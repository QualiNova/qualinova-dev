import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SupportIcon } from './SupportIcon';

describe('SupportIcon', () => {
    it('renders chat icon correctly', () => {
        render(<SupportIcon type="chat" />);
        expect(document.querySelector('[data-icon="MessageCircle"]')).toBeInTheDocument();
    });

    it('renders email icon correctly', () => {
        render(<SupportIcon type="email" />);
        expect(document.querySelector('[data-icon="Mail"]')).toBeInTheDocument();
    });

    it('renders phone icon correctly', () => {
        render(<SupportIcon type="phone" />);
        expect(document.querySelector('[data-icon="Phone"]')).toBeInTheDocument();
    });

    it('applies correct color classes', () => {
        const { container: chatContainer } = render(<SupportIcon type="chat" />);
        expect(chatContainer.querySelector('.text-blue-400')).toBeInTheDocument();

        const { container: emailContainer } = render(<SupportIcon type="email" />);
        expect(emailContainer.querySelector('.text-green-400')).toBeInTheDocument();

        const { container: phoneContainer } = render(<SupportIcon type="phone" />);
        expect(phoneContainer.querySelector('.text-purple-400')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<SupportIcon type="chat" className="custom-class" />);
        expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
});
