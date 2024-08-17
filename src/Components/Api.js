import axios from 'axios';

// Use environment variables for base URLs
const ApiFunc = async (method = 'GET', headers = {}, body = null, url = '', id = '') => {
  try {
    // Construct full URL with optional ID
    const fullUrl = id ? `${url}/${id}` : url;

    // Make the API request using axios
    const response = await axios({
      method,
      url: fullUrl,
      headers: { 'Content-Type': 'application/json', ...headers },
      data: body,
    });
    
    // Log the successful response
    console.log('Successful Response:', response.data);
    return response.data;
  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // The request was made but no response received
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      // Something happened in setting up the request
      console.error('Error in API request setup:', error.message);
      throw new Error('Error in API request setup');
    }
  }
};

export default ApiFunc;
