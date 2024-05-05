import axios from 'axios';

const AxiosPost = async ({ url, update, updateAll, dataToSend, filter }) => {
  try {
    const response = await axios.post(`http://localhost:3001/${url}`, dataToSend);
    const newData = response.data;
    update(prevState => [...prevState, newData]);
    {filter && updateAll(prevState => [...prevState, newData]);}
  } catch (error) {
    console.error(`Error adding ${url}:`, error);   
  }
};

export default AxiosPost;