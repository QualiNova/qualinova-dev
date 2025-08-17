import React from 'react';
import Image from 'next/image';

const VerifyWithQr = () => {
    return (
        <div
            className=" space-y-10 rounded-lg p-6 border-2 border-[#1c2537]"
            data-testid="verify-with-qr-container"
        >
            {/* text */}
            <div>
                <div className="text-3xl font-bold">Scan QR Code</div>
                <div className="text-gray text-base text-gray-400">
                    Scan the QR code on the certificate to verify its authenticity
                </div>
            </div>
            {/* qr */}
            <div className="flex p-10 rounded-lg space-y-5 flex-col items-center justify-center">
                <div
                    className="flex p-10 rounded-lg flex-col items-center border-dashed border-2 border-[#1c2537]"
                    data-testid="qr-image-container"
                >
                    <Image alt="qr code" src="QR.svg" width={90} height={90}></Image>
                    <div className="flex flex-col space-y-4 items-center">
                        <div className="text-2xl ">QR Code Scanner</div>
                        <div className="text-gray text-center text-gray-400">
                            Position the QR code within the scanner area. The verification will
                            <br></br> start automatically.
                        </div>
                    </div>
                    {/* button */}
                </div>
                <div className="flex bg-[#3962ea] p-3 space-x-6 rounded-lg justify-center">
                    <Image alt="qr code" src="QR.svg" width={20} height={20}></Image>
                    <button type="button">Start Scanner</button>
                </div>
            </div>
        </div>
    );
};

export default VerifyWithQr;
