import { onRenderGallery } from './onRenderGallery';
import PaginationLib from './paginationLib';

let totalPages;
let page;

export const onRederLibrary = (storageEl, pageNum) => {
  const films = JSON.parse(localStorage.getItem(storageEl));
  if (films === null || films.length === 0) {
    const gallery = document.querySelector('.film-selection');
    if (storageEl.includes('watched')) {
      gallery.innerHTML =
        '<h1 style="margin: auto; font-size: 30px">WATCHED IS EMPTY</h1>';
    }

    if (storageEl.includes('queued')) {
      gallery.innerHTML =
        '<h1 style="margin: auto; font-size: 30px">QUEUE IS EMPTY</h1>';
    }

    return;
  }
  page = pageNum;
  totalPages = films.length;
  const pageSize = 20;
  const filmsPage = films.slice(
    pageNum * pageSize - pageSize,
    pageNum * pageSize
  );
  onRenderGallery(filmsPage);
  PaginationLib(pageNum, totalPages, storageEl);
};

export const libraryEventListeners = () => {
  const WATCHED = document.querySelector('.watched');
  const QUEUE = document.querySelector('.queue');
  const userID = JSON.parse(localStorage.getItem('user'))?.user_id;
  WATCHED.addEventListener('click', () => {
    onRederLibrary(`watched${userID}`, 1);
    PaginationLib(page, totalPages, 'watched');
    WATCHED.classList.add('active');
    QUEUE.classList.remove('active');
  });

  QUEUE.addEventListener('click', () => {
    onRederLibrary(`queued${userID}`, 1);
    PaginationLib(page, totalPages, 'queued');
    WATCHED.classList.remove('active');
    QUEUE.classList.add('active');
  });
};
