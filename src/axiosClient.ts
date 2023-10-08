import axios from "axios";


const axiosClient = () => {
	return axios.create({
		baseURL: 'http://localhost:3000/api/v1',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
		},
	})
};

export default axiosClient;