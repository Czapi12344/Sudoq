import React from "react";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
