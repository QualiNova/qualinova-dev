import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Button from './Button';

import Image from 'next/image';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Render a simple img tag for testing
    return <img {...props} />;
  },
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Button', () => {
  it('renders without crashing', () => {
    mockUsePathname.mockReturnValue('/certificate');
    render(
      <Button variant="secondary">
        <Image src="/newCert.svg" alt="+" width={20} height={20} />
        <span>New Certificate</span>
      </Button>
    );
    expect(screen.getByText('New Certificate')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Button>Sign In</Button>);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('applies correct style with outline variant', () => {
    mockUsePathname.mockReturnValue('/certificate');
    render(<Button variant="outline">Previous</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-gray-border-800');
  });
});
