import * as utils from './add-remove-utilities.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function removeFilmFromWatched(id, userKey) {
  try {
    const arrayKey = `watched${userKey}`;
    let watchedArray = utils.getFilmsFromLocalStorage(arrayKey);

    utils.removeFilmFromLocalStorage(watchedArray, id);
    utils.addFilmsToLocalStorage(watchedArray, arrayKey);
    Notify.success('Removed from WATCHED!');
  } catch (error) {
    console.log('Error', error.message);
  }
}
