import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52398944-8832a4a5cb581cf5dc4de5156'; // Замініть на свій ключ

export async function getImagesByQuery(query, page) {
    try {
        const params = {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 15,
            page: page
        };

        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch images: ${error.message}`);
    }
}