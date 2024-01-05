import React from "react";

const CommonModal = ({ isOpen, onCancel, onConfirm, title, description, additionalContent, context, confirmText }) => {
    if (!isOpen) {
        return null;
    }
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-xl shadow-lg z-10 text-center">
                <p className="text-red text-xl font-semibold pb-4">{title}</p>
                <p>{description}</p>

                {additionalContent && (
                    <div className="mb-4">{additionalContent}</div>
                )}

                <div className="flex justify-center pb-4">
                    <button
                        className="bg-light-gray text-white font-bold px-4 py-2 mr-2 w-32 rounded"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red text-white font-bold px-4 py-2 w-32 rounded"
                        onClick={handleConfirm}
                    >
                        {confirmText || "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommonModal;
