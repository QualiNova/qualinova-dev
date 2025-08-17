import HeroSection from '@/components/organisms/MainPage/HeroSection/heroSection';
import HowItWorks from '@/components/organisms/MainPage/HowItWorks/howItWorks';
import KeyFeatures from '@/components/organisms/MainPage/Keyfeatures/keyFeatures';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <KeyFeatures />
            <HowItWorks />
        </div>
    );
}
