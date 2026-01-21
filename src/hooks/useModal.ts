'use client';

import { useEffect, useState } from 'react';

export const useModal = (modalType: string) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      if (e.detail === modalType) {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }
    };

    const handleClose = () => {
      setIsOpen(false);
      document.body.style.overflow = '';
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('openModal' as any, handleOpen as EventListener);
    window.addEventListener('closeModal' as any, handleClose as EventListener);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('openModal' as any, handleOpen as EventListener);
      window.removeEventListener('closeModal' as any, handleClose as EventListener);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [modalType, isOpen]);

  const open = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('openModal', { detail: modalType }));
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('closeModal', { detail: modalType }));
  };

  return { isOpen, open, close };
};




