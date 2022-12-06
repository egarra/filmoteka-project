import axios from 'axios';

export const fetchData = async (queryType, params) => {
  switch (queryType) {
    case 'TRENDING':
      const trendingLink = 'https://api.themoviedb.org/3/trending/movie/week';
      try {
        const data = await axios.get(trendingLink, {
          params: {
            api_key: 'a8c13239d5351cd341496e4bdbeed27b',
            include_adult: false,
            ...params,
          },
        });
        return data;
      } catch (error) {
        console.error(error.message);
      }
      break;

    case 'SEARCH_MOVIES':
      const searchLink = 'https://api.themoviedb.org/3/search/movie';
      try {
        const data = await axios.get(searchLink, {
          params: {
            api_key: 'a8c13239d5351cd341496e4bdbeed27b',
            include_adult: false,
            ...params,
          },
        });
        return data;
      } catch (error) {
        console.error(error.message);
      }
      break;

    case 'FIND_MOVIE':
      try {
        const findFilmLink = `https://api.themoviedb.org/3/movie/${params.id}`;
        const data = await axios.get(findFilmLink, {
          params: {
            api_key: 'a8c13239d5351cd341496e4bdbeed27b',
            include_adult: false,
          },
        });
        return data;
      } catch (error) {
        console.error(
          error.message,
          '; You should pass object with "id" element as the second parameter'
        );
      }
      break;

    case 'FIND_MOVIE_VIDEO':
      try {
        const findFilmLink = `https://api.themoviedb.org/3/movie/${params.id}/videos`;
        const data = await axios.get(findFilmLink, {
          params: {
            api_key: 'a8c13239d5351cd341496e4bdbeed27b',
            include_adult: false,
          },
        });
        return data;
      } catch (error) {
        console.error(
          error.message,
          '; You should pass object with "id" element as the second parameter'
        );
      }
      break;
    default:
      console.error('Such query type does not exist');
  }
};

// Query types
export const TRENDING = 'TRENDING';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const FIND_MOVIE = 'FIND_MOVIE';
export const FIND_MOVIE_VIDEO = 'FIND_MOVIE_VIDEO';

// How to use
// 1.Import fetchData function and required API Query to your file;
// 2.Use function as mentioned below;

// const data = fetchData(TRENDING, { page: 1 });
// console.log(data);

// const data = fetchData(SEARCH_MOVIES, { page: 1, query: 'King Art' });
// console.log(data);

// const data = fetchData(FIND_MOVIE, { id: 11 });
// console.log(data);

// const data = fetchData(FIND_MOVIE_VIDEO, { id: 11 });
// console.log(data);
