import { onRenderGallery } from './onRenderGallery';
import { fetchData, TRENDING } from './fetchData';
import { loading } from '../constants/loading';
import Pagination from './pagination';

export const onTrending = async page => {
  const gallery = document.querySelector('.film-selection');
  gallery.innerHTML = loading;
  const res = await fetchData(TRENDING, { page: (page = 1) });

  onRenderGallery(res.data.results);
  Pagination(res.data, 'TRENDING');
};

const form = document.querySelector('.header__form');
document.querySelector('.header-logo__link').addEventListener('click', () => {
  onTrending();
  form.reset();
});
document.querySelector('[data-home]').addEventListener('click', () => {
  onTrending();
  form.reset();
});
onTrending();
