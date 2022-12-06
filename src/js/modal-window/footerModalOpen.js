export const footerModalOpen = () => {
  const studentsLinkEl = document.querySelector('#students-list');
  const footerModal = document.querySelector('.footer-modal__wrapper');
  const closeBtnEl = document.querySelector('#footer-modal-close-btn');

  function onStudentsElClick(event) {
    event.preventDefault();
    footerModal.classList.remove('visually-hidden');
  }

  function onCloseBtnClick(event) {
    event.preventDefault();
    footerModal.classList.add('visually-hidden');
  }

  studentsLinkEl.addEventListener('click', onStudentsElClick);
  closeBtnEl.addEventListener('click', onCloseBtnClick);
};

footerModalOpen();
