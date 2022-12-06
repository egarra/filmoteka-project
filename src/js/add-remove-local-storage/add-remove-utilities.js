export function getFilmsFromLocalStorage(keyOfArray) {
  let filmArray = JSON.parse(localStorage.getItem(keyOfArray));

  if (filmArray === null) {
    return (filmArray = []);
  }
  return filmArray;
}

export function checkFilmForBeingObject(film) {
  if (typeof film !== 'object') {
    const notObjectMessage = 'The film data is not an object';
    console.log(notObjectMessage);
    return true;
  }
}

export function checkFilmProperties(film) {
  if (
    !film.hasOwnProperty('poster_path') ||
    !film.hasOwnProperty('title') ||
    !film.hasOwnProperty('release_date') ||
    !film.hasOwnProperty('id')
  ) {
    const missingPropsMessage =
      'The film data are missing some necessary properties';
    console.log(missingPropsMessage);
    return true;
  }
}

export function checkFilmForBeingInCollection(collection, id) {
  if (collection.some(item => item.id === id)) {
    const inCollectionMessage = 'Such film already exists in collection';
    console.log(inCollectionMessage);
    return true;
  }
}

export function addFilmsToLocalStorage(filmArray, keyOfArray) {
  localStorage.setItem(keyOfArray, JSON.stringify(filmArray));
}

export function addFilmToArray(array, film) {
  array.unshift(film);
}

export function removeFilmFromWatched(film) {
  try {
    const arrayKey = 'watched';
    let watchedArray = getFilmsFromLocalStorage(arrayKey);
    const { id } = film;

    removeFilmFromLocalStorage(watchedArray, id);
    addFilmsToLocalStorage(watchedArray, arrayKey);
  } catch (error) {
    console.log('Error', error.message);
  }
}

export function removeFilmFromLocalStorage(collection, id) {
  const filmIndex = collection.findIndex(item => item.id === id);
  if (filmIndex === -1) {
    const noFilmMessage = 'There is no such film in collection';
    console.log(noFilmMessage);
    return;
  }
  deleteFilm(collection, filmIndex);
}

export function deleteFilm(collection, index) {
  collection.splice(index, 1);
}
