import { jwtDecode } from 'jwt-decode';
import { useAppStore } from '~/store/appStore';

const parseToken = (token) => {
  try {
    if (!token) {
      const auth = useAppStore.getState().auth;
      token = auth.token;
    }

    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default parseToken;