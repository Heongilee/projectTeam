import { URL } from '../config/confing.js';
import axios from 'axios';


const api = {

    fetchGet: async(endPoint, history) => {
        
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const { status } = await axios.get(`${URL}/${endPoint}`);

            if (status === 200){
                return true;
            }

        } catch (error) {

            console.log("fetchGet", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
        }
    },

    fetchRegister: async(endPoint, body, history) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const { status } = await axios.post(`${URL}/${endPoint}`, body);

            if (status === 200){
                return true;
            }

        } catch (error) {

            console.log("fetchRegister", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
        }
    },

    fetchModify: async(endPoint, body, history) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const { status } = await axios.put(`${URL}/${endPoint}`, body);
            
            if (status === 200){
                return true;
            }

        } catch (error) {

            console.log("fetchModify", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
        }
    },

    fetchDelete: async(endPoint, history) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const { status } = await axios.delete(`${URL}/${endPoint}`);
            
            if (status === 200){
                return true;
            }

        } catch (error) {
            
            console.log("fetchDelete", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
            
        }
    },
};



export default api;