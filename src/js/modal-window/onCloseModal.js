export const onCloseModal = () => {
  const MODAL_WINDOW = document.querySelector('.modal-window');
  const closeModal = evetn => {
    if (!evetn.target.hasAttribute('data-close')) return;
    MODAL_WINDOW.classList.add('hidden');
  };

  MODAL_WINDOW.addEventListener('click', closeModal);
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      const MODAL_WINDOW = document.querySelector('.modal-window');
      MODAL_WINDOW.classList.add('hidden');
    }
  });
};

onCloseModal();
