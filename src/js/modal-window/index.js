import { onCloseModal } from './onCloseModal';
import { renderFilm } from './renderFilm';

const FILMS_LIST = document.querySelector('.film-selection');

export const openModalWindow = event => {
  if (event.target.className === 'film-selection') return;
  const film = event.target.closest('.film');
  const filmId = film.dataset.id;
  renderFilm(filmId);
};

FILMS_LIST.addEventListener('click', openModalWindow);
