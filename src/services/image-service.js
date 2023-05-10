
import axios from "axios";

const API_KEY = "34990362-54e8377378381fe38c3fa12ad";
const BASE_URL = "https://pixabay.com/api";

export default class ImageApiService {
    constructor() {
        this.searchQuery='';
        this.page=1;
    };

    async fetchImages() {
        const searchParams = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            image_type:"photo", 
            orientation: "horizontal",
            per_page:12,
        });

        const url=`${BASE_URL}/?${searchParams}&page=${this.page}`;
        const response = await axios.get(url);
        const images = response.data;
        this.incrementPage();
        return images;
    };

    incrementPage() {
        this.page +=1;
    };

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}

