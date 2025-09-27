import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loaderEl = document.querySelector('.loader');
const endMessageEl = document.querySelector('.end-message');

// SimpleLightbox instance
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
        .map(img => `
            <li class="gallery-item">
                <a class="gallery-link" href="${img.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${img.webformatURL}"
                        alt="${img.tags}"
                        loading="lazy"
                    />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${img.likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${img.views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${img.comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${img.downloads}</span>
                    </p>
                </div>
            </li>
        `)
        .join('');

    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryEl.innerHTML = '';
    lightbox.refresh();
}

export function showLoader() {
    loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
    loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.add('is-hidden');
}

export function showEndMessage() {
    endMessageEl.classList.remove('is-hidden');
}

export function hideEndMessage() {
    endMessageEl.classList.add('is-hidden');
}