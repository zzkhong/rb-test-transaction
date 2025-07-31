import { BANK_DATA } from '@common/constants/mockData';

export function getBankName(id: string) {
  return BANK_DATA.find(item => item.id === id)?.label || '';
}
