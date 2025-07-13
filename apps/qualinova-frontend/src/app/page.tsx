import HeroSection from '@/components/organisms/mainPage/HeroSection/HeroSection';
import HowItWorks from '@/components/organisms/mainPage/HowItWorks/HowItWorks';
import KeyFeatures from '@/components/organisms/mainPage/KeyFeatures/KeyFeatures';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <KeyFeatures />
      <HowItWorks />
    </div>
  );
}
