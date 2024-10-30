import { jwtDecode } from 'jwt-decode';
import { useAppStore } from '~/store/appStore';

const parseToken = () => {
  try {
    const token = useAppStore.getState().token;
    const decoded = jwtDecode(token);
    return decoded
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default parseToken;