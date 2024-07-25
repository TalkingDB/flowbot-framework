import React from 'react';

const CustomModal = ({id, title, status, onClose}: {id: string, title: string, status: boolean, onClose: (id?: string) => void}) => {
  

  return (
    <>
      {status && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => onClose(id)}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => onClose() }
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;