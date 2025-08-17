'use client';

import React, { useState } from 'react';
import VerifyWithId from '@/components/organisms/Verify/VerifyWithId/verifyWithId';
import VerifyWithQr from '@/components/organisms/Verify/VerifyWithQr/verifyWithQr';

const Page = () => {
    const [currentPanel, setCurrentPanel] = useState('verify');

    return (
        <div className="flex md:h-screen *:mt-14 flex-col items-center ">
            <div className="w-7/12  flex items-center flex-col ">
                <div style={{ width: '75%' }} className="flex  space-y-4 flex-col items-center">
                    {/* Heading 1*/}
                    <div className="text-4xl font-bold">Certificate Verification</div>
                    <div className="text-gray-400 text-center text-xl">
                        Verify the authenticity of any QualiNova certificate using its unique ID or
                        by scanning the QR code
                    </div>
                </div>

                <div className="w-full">
                    {/* Tablist */}
                    <div
                        className="*:text-center w-full *:p-2 flex justify-center *:rounded-lg rounded-lg *:w-full p-1 my-10"
                        style={{ backgroundColor: '#20293b' }}
                    >
                        <button
                            type="button"
                            className={currentPanel == 'verify' ? ' bg-[#030817] ' : ''}
                            onClick={() => {
                                setCurrentPanel('verify');
                            }}
                        >
                            Verify by ID
                        </button>
                        <button
                            type="button"
                            className={currentPanel == 'QR' ? ' bg-[#030817] ' : ''}
                            onClick={() => {
                                setCurrentPanel('QR');
                            }}
                        >
                            Verify by QR Code
                        </button>
                    </div>
                    {/* Tab panel */}
                    {currentPanel == 'verify' ? <VerifyWithId /> : <VerifyWithQr />}
                </div>
            </div>
        </div>
    );
};

export default Page;
