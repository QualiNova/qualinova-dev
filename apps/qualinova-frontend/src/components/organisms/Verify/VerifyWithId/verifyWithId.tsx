import React from 'react';
import Image from 'next/image';
const VerifyWithId = () => {
    return (
        <div
            className="space-y-6 rounded-lg p-6 border-2"
            style={{ borderColor: '#1c2537' }}
            data-testid="verify-with-id-container"
        >
            <div>
                <div className="text-3xl font-bold">Enter Certificate ID</div>
                <div className="text-gray text-base text-gray-400">
                    Enter the unique certificate ID to verify its authenticity on the blockchain
                </div>
            </div>
            {/* input */}
            <div className="flex justify-center *:p-3 space-x-3 *:rounded-lg">
                <input
                    type="text"
                    name=""
                    id=""
                    style={{ borderColor: '#1c2537' }}
                    className="w-2/5 border-2 bg-inherit"
                    placeholder="e.g. CERT-2023-001"
                />
                <div className="flex" style={{ backgroundColor: '#1e3580' }}>
                    <Image alt="search" src="/search.svg" width={25} height={25} />
                    <button type="button" className="mx-4" data-testid="verify-button">
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyWithId;
