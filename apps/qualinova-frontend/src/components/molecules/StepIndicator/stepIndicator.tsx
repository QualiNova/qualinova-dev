interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div
            role="status"
            aria-label={`Step ${currentStep} of ${totalSteps}`}
            className="text-xs lg:text-sm text-gray-text-400"
        >
            Step {currentStep} of {totalSteps}
        </div>
    );
}
