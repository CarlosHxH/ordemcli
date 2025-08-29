// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Novo
      </button>
    
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white rounded-lg shadow-lg z-10 p-6">
          <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
            &times;
          </button>
          
          <h2 className="text-lg font-bold">Título do Modal</h2>
          <p className="mt-2">Este é o conteúdo do modal.</p>
          
          {children}
        </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Fechar
          </button>
      </div>

    </div>
  );
};

export default ModalAdd;