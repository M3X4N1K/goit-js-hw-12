import { getImagesByQuery } from './js/pixabay-api';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    showEndMessage,
    hideEndMessage
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM elements
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');

// Application state
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let isLoading = false;

// Event listeners
searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

// Search form submit handler
async function onSearchFormSubmit(event) {
    event.preventDefault();

    const query = searchInput.value.trim();
    
    if (!query) {
        showToast('Please enter a search query!', 'warning');
        return;
    }

    // Reset for new search
    currentQuery = query;
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    hideEndMessage();

    await searchImages();
}

// Load more button click handler
async function onLoadMoreClick() {
    currentPage += 1;
    await searchImages();
}

// Main search function
async function searchImages() {
    if (isLoading) return;

    isLoading = true;
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        totalHits = data.totalHits;

        hideLoader();

        if (data.hits.length === 0) {
            if (currentPage === 1) {
                showToast('Sorry, there are no images matching your search query. Please try again!', 'error');
            }
            return;
        }

        createGallery(data.hits);

        if (currentPage === 1) {
            showToast(`Hooray! We found ${totalHits} images.`, 'success');
        }

        // Check if we've loaded all available images
        const loadedImages = currentPage * 15;
        if (loadedImages >= totalHits) {
            hideLoadMoreButton();
            showEndMessage();
        } else {
            showLoadMoreButton();
        }

        // Smooth scroll after loading more images (except first page)
        if (currentPage > 1) {
            smoothScroll();
        }

    } catch (error) {
        hideLoader();
        console.error('Search error:', error);
        showToast('Something went wrong. Please try again later.', 'error');
    } finally {
        isLoading = false;
    }
}

// Smooth scroll function
function smoothScroll() {
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
        const cardHeight = galleryItem.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });
    }
}

// Toast notification function
function showToast(message, type = 'info') {
    const config = {
        title: '',
        message: message,
        position: 'topRight',
        timeout: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        resetOnHover: true,
        progressBar: true,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight'
    };

    switch (type) {
        case 'success':
            iziToast.success({
                ...config,
                backgroundColor: '#51cf66',
                iconColor: '#fff'
            });
            break;
        case 'error':
            iziToast.error({
                ...config,
                backgroundColor: '#ff6b6b',
                iconColor: '#fff'
            });
            break;
        case 'warning':
            iziToast.warning({
                ...config,
                backgroundColor: '#ffa500',
                iconColor: '#fff'
            });
            break;
        default:
            iziToast.info({
                ...config,
                backgroundColor: '#667eea',
                iconColor: '#fff'
            });
    }
}