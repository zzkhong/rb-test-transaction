import { useMutation } from '@tanstack/react-query';
import { TransactionData } from '@common/interface/transaction';

type TransferRequest = Omit<TransactionData, 'id'>;

interface TransferResponse {
  status: 'success' | 'error';
  data: TransactionData;
}

// Mock API Calls
const mockTransfer = async (
  params: TransferRequest,
): Promise<TransferResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 20% network error
      if (Math.random() < 0.2) {
        reject(new Error('Network error, Please try again'));
      } else {
        resolve({
          status: 'success',
          data: {
            ...params,
            id: Date.now().toString(),
          },
        });
      }
    }, 3000);
  });
};

export function useTransfer() {
  return useMutation({
    mutationFn: mockTransfer,
  });
}
