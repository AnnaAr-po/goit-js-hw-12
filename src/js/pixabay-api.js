import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = `46857118-7428ce3c72e98dd3525ce7abc`;
const PER_PAGE = 15;

  

async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: PER_PAGE,
    page: page,
  };

  const response = await axios.get(BASE_URL, { params });
  const data = response.data;


 if (data.hits.length === 0) {
      throw new Error('Sorry, there are no images matching your search query. Please try again!');
    }
     return data.hits.map(hit => ({
      webformatURL: hit.webformatURL,
      largeImageURL: hit.largeImageURL,
      tags: hit.tags,
      likes: hit.likes,
      views: hit.views,
      comments: hit.comments,
      downloads: hit.downloads,
    }));
  }


export { fetchImages };