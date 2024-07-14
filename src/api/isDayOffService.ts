import axios from 'axios';

export const isDayOffService = {
  async isHoliday(date: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://isdayoff.ru/${date}`);
      return response.data === '1';
    } catch (error) {
      console.error('Error checking holiday:', error);
      return false;
    }
  },
};
