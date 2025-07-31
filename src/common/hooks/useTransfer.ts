import { useMutation } from '@tanstack/react-query';

// Mock API Calls
const mockTransfer = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 1) {
        reject(new Error('Network error'));
      } else {
        resolve({ status: 'success' });
      }
    }, 3000);
  });
};

export function useTransfer() {
  return useMutation({
    mutationFn: mockTransfer,
  });
}
