import HeroSection from '@/components/organisms/MainPage/HeroSection/HeroSection';
import HowItWorks from '@/components/organisms/MainPage/HowItWorks/HowItWorks';
import KeyFeatures from '@/components/organisms/MainPage/KeyFeatures/KeyFeatures';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <KeyFeatures />
      <HowItWorks />
    </div>
  );
}
