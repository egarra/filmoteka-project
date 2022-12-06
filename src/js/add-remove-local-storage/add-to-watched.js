import * as utils from './add-remove-utilities.js';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notiflixSettings } from '../constants/notiflix.js';

export function addFilmToWatched(film, userKey) {
  try {
    if (
      utils.checkFilmForBeingObject(film) ||
      utils.checkFilmProperties(film)
    ) {
      return;
    }

    const arrayKey = `watched${userKey}`;
    let watchedArray = utils.getFilmsFromLocalStorage(arrayKey);
    const { id } = film;

    Notify.success('Added to WATCHED!');

    if (utils.checkFilmForBeingInCollection(watchedArray, id)) {
      return;
    }

    utils.addFilmToArray(watchedArray, film);
    utils.addFilmsToLocalStorage(watchedArray, arrayKey);
  } catch (error) {
    console.log('Error', error.message);
  }
}
