'use client';

import Image from 'next/image';
import warningIcon from '@/components/atoms/icons/warning.svg';
import filePreview from '@/components/atoms/icons/file-preview.svg';
import uploadIcon from '@/components/atoms/icons/upload.svg';
import { Button } from '@/components/atoms/Button/button';
import { useCreateCertificate } from '@/contexts/createCertificateContext';
import StepIndicator from '@/components/molecules/StepIndicator/stepIndicator';

export default function ThirdStepForm() {
    const { data, setStep } = useCreateCertificate();
    return (
        <form className="w-full max-w-[832px] min-w-[320px] border border-gray-border-800 rounded-lg flex flex-col items-start px-[1px] py-6 shadow-sm">
            <div className="w-full px-7">
                <div className="w-full flex items-center justify-between gap-5">
                    <h3 className="text-gray-text-50 font-semibold text-sm lg:text-2xl">
                        Certificate Details
                    </h3>
                    <StepIndicator currentStep={3} totalSteps={3} />
                </div>
                <p className="mt-[6px] text-gray-text-400 font-normal text-xs lg:text-sm">
                    Review and confirm certificate details
                </p>
            </div>

            <div className="border border-gray-border-800 rounded-lg flex items-start text-gray-text-400 gap-2 w-full py-4 px-7 mt-7">
                <Image
                    src={warningIcon}
                    alt="warning"
                    width={18}
                    height={18}
                    className="object-cover object-center mt-1"
                />

                <div className="text-gray-text-50 space-y-1">
                    <h3 className="text-sm lg:text-base">Please Review Carefully</h3>
                    <p className="text-xs lg:text-sm">
                        Once a certificate is registered on the blockchain, its core details cannot
                        be modified
                    </p>
                </div>
            </div>

            <div className="text-gray-text-50 border border-gray-border-800 rounded-lg w-full flex flex-col gap-4 mt-7 py-4 px-7">
                <div className="flex w-full">
                    <h4 className="text-xs lg:text-base text-gray-text-400 w-[50%]">
                        Certificate Name:
                    </h4>
                    <p className="text-xs lg:text-base w-[50%]">{data.name}</p>
                </div>
                <div className="flex w-full">
                    <h4 className="text-xs lg:text-base text-gray-text-400 w-[50%]">
                        Certificate Type
                    </h4>
                    <p className="text-xs lg:text-base w-[50%]">{data.type}</p>
                </div>
                <div className="flex w-full">
                    <h4 className="text-xs lg:text-base text-gray-text-400 w-[50%]">Recipient</h4>
                    <p className="text-xs lg:text-base w-[50%]">{data.recipientName}</p>
                </div>
                <div className="flex w-full">
                    <h4 className="text-xs lg:text-base text-gray-text-400 w-[50%]">Issue Date</h4>
                    <p className="text-xs lg:text-base w-[50%]">{data.issueDate}</p>
                </div>
                <div className="flex w-full">
                    <h4 className="text-xs lg:text-base text-gray-text-400 w-[50%]">Expiry Date</h4>
                    <p className="text-xs lg:text-base w-[50%]">{data.expiryDate}</p>
                </div>
                <div className="flex w-full">
                    <h4 className="text-xs lg:text-base text-gray-text-400 w-[50%]">
                        Certificate ID
                    </h4>
                    <p className="text-xs lg:text-base w-[50%]">CERT-2005-0042 (Auto-generated)</p>
                </div>
            </div>

            <div className="text-gray-text-50 border border-gray-border-800 rounded-lg w-full flex items-center justify-center mt-7 p-4">
                <div className="size-[95%] flex items-center justify-center gap-3 flex-col border-2 border-dashed rounded-lg border-gray-border-800 py-4">
                    <Image src={filePreview} alt="file-preview" width={30} height={30} />
                    <p className="text-xs lg:text-base">Certificate Preview</p>

                    <Button variant="outline">
                        <Image
                            src={uploadIcon}
                            alt="upload"
                            width={20}
                            height={20}
                            className="mr-6"
                        />
                        Preview Certificate
                    </Button>
                </div>
            </div>

            <div className="w-full flex items-center justify-between gap-5 p-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep?.((step) => step - 1)}
                >
                    Previous Step
                </Button>
                <Button type="button" variant="secondary" className="">
                    Create Certificate
                </Button>
            </div>
        </form>
    );
}
