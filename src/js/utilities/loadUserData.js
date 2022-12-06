export const loadUserData = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user === null) {
    const MY_LIBRARY = document.querySelector('.my-library');
    MY_LIBRARY.addEventListener('click', event => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user === null) {
        event.preventDefault();
        document.querySelector('.header-error__text').innerHTML =
          'You should login to access library';
      }
    });
    return;
  }
  const LOGIN_BUTTON = document.querySelector('.login-button');
  const USER_INFO = document.querySelector('.user-info');
  USER_INFO.innerHTML = `<p class="user-info__name"> ${user.name}</p>
  <img class="user-info__image"
    referrerpolicy="no-referrer"
    src=${user.picture}
    alt="${user.name}">`;

  LOGIN_BUTTON.textContent = 'LOGOUT';
};

loadUserData();
