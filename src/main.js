import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';



const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.btn-load');


let query = '';
let page = 1;
let PER_PAGE = 15;


form.addEventListener('submit', (event) => {
  event.preventDefault();
  query = event.currentTarget.elements.searchRequest.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid search term.',
      position: 'topRight'
    });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loadBtn.style.display = 'none';
 differentImages();
});

const differentImages = async () => {
  try {
    loader.style.display = 'block';
    const data = await fetchImages(query, page);
    loader.style.display = 'none';

    if (data.length === 0) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query.'
      });
      loadBtn.style.display = 'none';
      return;
    }

    renderGallery(gallery, data);
    page += 1;


    if (data.length < PER_PAGE || page > Math.ceil(data.totalHits / PER_PAGE)) {
      loadBtn.style.display = 'none';
      iziToast.info({ message: 'We are sorry, but you have reached the end of search results.' });
    } else {
      loadBtn.style.display = 'block';
    }
  } catch (error) {
    loadBtn.style.display = 'none';
    iziToast.error({ title: 'Error', message: error.message });
  }
};

loadBtn.addEventListener('click', async () => {
  await differentImages();

  const cardHeight = document.querySelector('.gallery').lastElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight.height * 2,
    behavior: "smooth"
  });
});