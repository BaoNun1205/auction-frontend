const handleApiError = (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      return error.response.data;
    } else {
      console.error('Error:', error);
      throw error;
    }
};

export default handleApiError;