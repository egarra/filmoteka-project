import { genres } from '../constants/genres';

export const onRenderGallery = films => {
  const gallery = document.querySelector('.film-selection');
  let imgUrl = '';
  gallery.innerHTML = '';
  const markup = films
    .map(film => {
      const { poster_path, title, release_date = '', id } = film;

      const genreNames = film.genre_ids.map(
        id => genres.find(({ id: filmId }) => id === filmId).name
      );

      if (poster_path === null) {
        imgUrl = 'https://via.placeholder.com/700?text=NoImageFound';
      } else {
        imgUrl = 'https://image.tmdb.org/t/p/w500' + poster_path;
      }

      return `
     <article class="film" data-id=${id}>
        <img class="film__poster" src=${imgUrl} alt="" />
        <div class="film-title__block"><h2 class="film__title">${title}</h2></div>
        <p class="film__info"> ${
          genreNames.length > 2
            ? genreNames[0] + ', ' + genreNames[1] + ', ' + genreNames[2]
            : genreNames.join(', ')
        }
        | ${release_date.split('-')[0]}</p>
     </article>
     `;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};

// import { fetchData, FIND_GENRE } from './fetchData';
// import { genres } from './genres';
// export const onRenderGallery = films => {
//   const gallery = document.querySelector('.film-selection');
//   let imgUrl = '';
//   gallery.innerHTML = '';

//   films.forEach(item => {
//     item.genreNames = item.genre_ids.map(
//       id => genres.find(({ id: filmId }) => id === filmId).name
//     );
//   });

//   const markup = films
//     .map(({ poster_path, title, release_date = '', genreNames, id }) => {
//       if (poster_path === null) {
//         imgUrl = 'https://via.placeholder.com/700?text=NoImageFound';
//       } else {
//         imgUrl = 'https://image.tmdb.org/t/p/w500' + poster_path;
//       }

//       return `
//      <article class="film" data-id=${id}>
//         <img class="film__poster" src=${imgUrl} alt="" />
//         <h2 class="film__title">${title}</h2>
//         <p class="film__info"> ${
//           genreNames.length > 2
//             ? genreNames[0] + ', ' + genreNames[1] + ', ' + genreNames[2]
//             : genreNames.join(', ')
//         }
//              | ${release_date.split('-')[0]}</p>
//      </article>
//      `;
//     })
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', markup);
// };
