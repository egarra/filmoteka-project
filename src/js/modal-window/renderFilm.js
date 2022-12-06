import { loading } from '../constants/loading';
import {
  fetchData,
  FIND_MOVIE,
  FIND_MOVIE_VIDEO,
} from '../utilities/fetchData';
import sprite from '../../images/sprite.svg';
import { addFilmToQueued } from '../add-remove-local-storage/add-to-queued';
import { addFilmToWatched } from '../add-remove-local-storage/add-to-watched';
import { onRenderVideo } from '../utilities/onRenderVideo';
import { removeFilmFromWatched } from '../add-remove-local-storage/remove-from-watched';
import { removeFilmFromQueued } from '../add-remove-local-storage/remove-from-queued';
import { loginOperation } from '../firebase';
import { onRederLibrary } from '../utilities/onRenderLibrary';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export const renderFilm = async id => {
  const MODAL_WINDOW = document.querySelector('.modal-window');
  MODAL_WINDOW.innerHTML = `${loading}`;
  MODAL_WINDOW.classList.remove('hidden');
  const filmData = await fetchData(FIND_MOVIE, { id });
  const {
    poster_path,
    overview,
    title,
    original_title,
    release_date,
    genres,
    popularity,
    vote_average,
    vote_count,
  } = filmData.data;

  let imgUrl;
  if (poster_path === null) {
    imgUrl = 'https://via.placeholder.com/700?text=NoImageFound';
  } else {
    imgUrl = 'https://image.tmdb.org/t/p/w500' + poster_path;
  }

  const genreNames = genres.map(genre => genre.name);

  MODAL_WINDOW.innerHTML = `
  <div class="detailed-info">
  <svg class="modal-close__btn" data-close>
    <use href=${sprite + '#icon-cross'}></use>
  </svg>
    <div class="description-wrapper__img">
      <img class="detailed-info__image" src=${imgUrl} alt=${title}>
      <button class="detailed-info__button watch-trailer__btn">Watch trailer</button>
    </div>
    <div class="description-wrapper">
      <div class="detailed-info__caption">${title}</div>
      <table class="descript-table">
        <tr class="descript-el">
          <th class="description-el__caption">
            Vote / Votes
          </th>
          <td class="description-el__value">
            <span class="description-el__rating description-el__rating--orrange">${vote_average}</span>
            <span class="description-el__slash">/</span>
            <span class="description-el__rating description-el__rating--white">${vote_count}</span>
          </td>
        </tr>
        <tr class="descript-el">
          <th class="description-el__caption">
            Popularity
          </th>
          <td class="description-el__value">${popularity}</td>
        </tr>
        <tr class="descript-el">
          <th class="description-el__caption"> Original Title</th>
          <td class="description-el__value">${original_title}</td>
        </tr>
        <tr class="descript-el">
          <th class="description-el__caption">
            Genre
          </th>
          <td class="description-el__value">${genreNames.join(', ')}</td>
        </tr>
      </table>

      <article class="about">
        <h4 class="about__caption">ABOUT</h4>
        <p class="about__text">Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the
          most corrupt
          settlement of the gold rush towns. But not all goes to plan one is killed and the other three escapes with
          bags
          of gold hide out in the abandoned gold mine where they happen across another gang of three – who themselves
          were
          planning to hit the very same bank! As tensions rise, things go from bad to worse as they realise the bags of
          gold are filled with lead... they’ve been double crossed – but by who and how?</p>
      </article>

      <ul class="detailed-info__button-list">
        <li><button class="detailed-info__button  watched_btn">add to Watched</button></li>
        <li><button class="detailed-info__button queue_btn">add to queue</button></li>
      </ul>
    </div>
  </div>

  `;

  const genre_ids = genres.map(genre => genre.id);
  const libraryActions = () => {
    const filmProps = {
      poster_path,
      title,
      release_date,
      id,
      genre_ids,
      hello: 'dfsdf',
    };
    const QUEOUE = MODAL_WINDOW.querySelector('.queue_btn');
    const WATCHED = MODAL_WINDOW.querySelector('.watched_btn');
    const user_id = JSON.parse(localStorage.getItem('user'))?.user_id;

    const isFilmInWatched = (
      JSON.parse(localStorage.getItem(`watched${user_id}`)) || []
    ).some(film => film.id === id);
    const isFilmInQueued = (
      JSON.parse(localStorage.getItem(`queued${user_id}`)) || []
    ).some(film => film.id === id);

    if (isFilmInWatched) {
      WATCHED.textContent = WATCHED.textContent.replace(
        'add to',
        'remove from'
      );
      WATCHED.classList.remove('active');
    }

    if (!isFilmInWatched) {
      WATCHED.textContent = WATCHED.textContent.replace(
        'remove from',
        'add to'
      );
      WATCHED.classList.add('active');
    }

    if (isFilmInQueued) {
      QUEOUE.textContent = QUEOUE.textContent.replace('add to', 'remove from');
      QUEOUE.classList.remove('active');
    }

    if (!isFilmInQueued) {
      QUEOUE.textContent = QUEOUE.textContent.replace('remove from', 'add to');
      QUEOUE.classList.add('active');
    }

    WATCHED.addEventListener('click', () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        Notify.warning('You should login before you can add item to watched!');
        return;
      }
      const userID = user.user_id;
      const isFilmInWatched = (
        JSON.parse(localStorage.getItem(`watched${userID}`)) || []
      ).some(film => film.id === id);
      if (isFilmInWatched) {
        WATCHED.textContent = WATCHED.textContent.replace(
          'remove from',
          'add to'
        );
        WATCHED.classList.add('active');
        removeFilmFromWatched(id, userID);
      }

      if (!isFilmInWatched) {
        WATCHED.textContent = WATCHED.textContent.replace(
          'add to',
          'remove from'
        );
        WATCHED.classList.remove('active');
        addFilmToWatched(filmProps, userID);
      }
      if (document.querySelector('.watched')?.classList.contains('active')) {
        onRederLibrary(`watched${userID}`, 1);
      }
    });

    QUEOUE.addEventListener('click', () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        Notify.warning('You should login before you can add item to qued!');
        return;
      }
      const userID = user.user_id;
      const isFilmInQueued = (
        JSON.parse(localStorage.getItem(`queued${userID}`)) || []
      ).some(film => film.id === id);
      if (isFilmInQueued) {
        QUEOUE.textContent = QUEOUE.textContent.replace(
          'remove from',
          'add to'
        );
        QUEOUE.classList.add('active');
        removeFilmFromQueued(id, userID);
      }

      if (!isFilmInQueued) {
        QUEOUE.textContent = QUEOUE.textContent.replace(
          'add to',
          'remove from'
        );
        QUEOUE.classList.remove('active');
        addFilmToQueued(filmProps, userID);
      }
      if (document.querySelector('.queue')?.classList.contains('active')) {
        onRederLibrary(`queued${userID}`, 1);
      }
    });
  };
  libraryActions();

  const watchTrailorBtn = document.querySelector('.watch-trailer__btn');

  watchTrailorBtn.addEventListener('click', async () => {
    const MODAL_WINDOW = document.querySelector('.modal-window');
    MODAL_WINDOW.innerHTML = `${loading}`;
    const res = await fetchData(FIND_MOVIE_VIDEO, { id });
    const [results = ''] = res.data.results;
    let { key = '' } = results;

    onRenderVideo(key);

    const BACK_BUTTON = document.querySelector('.video-back__btn');
    BACK_BUTTON.addEventListener('click', () => {
      renderFilm(id);
    });
  });
};
