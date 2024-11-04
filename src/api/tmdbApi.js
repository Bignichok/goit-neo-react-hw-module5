import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWRlNDY0MDY1N2JiNjNjMmMxNzFmZmEzY2U3MTFlYiIsIm5iZiI6MTczMDcyNzMzNy42ODkxMjI3LCJzdWIiOiI1ZWNlNGRiMGFhZWM3MTAwMjA2NmU2OGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AaCih1rvy2IovsllxmtFMbYUsF5GfH-lhrYArNbmdFc'

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		Authorization: `Bearer ${API_KEY}`,
	},
});

export default api;
