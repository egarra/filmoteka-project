import * as utils from './add-remove-utilities.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function addFilmToQueued(film, userKey) {
  try {
    if (
      utils.checkFilmForBeingObject(film) ||
      utils.checkFilmProperties(film)
    ) {
      return;
    }

    const arrayKey = `queued${userKey}`;
    let queuedArray = utils.getFilmsFromLocalStorage(arrayKey);
    const { id } = film;

    Notify.success('Added to QUEUED!');

    if (utils.checkFilmForBeingInCollection(queuedArray, id)) {
      return;
    }

    utils.addFilmToArray(queuedArray, film);
    utils.addFilmsToLocalStorage(queuedArray, arrayKey);
  } catch (error) {
    console.log('Error', error.message);
  }
}
