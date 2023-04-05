'use strict';

{
  const addItem = document.querySelector('.interactive__add');
  const popupForm = document.querySelector('.modal-wrap');
  const popupOverlay = document.querySelector('.overlay');
  const closeIcon = document.querySelector('.modal__close-button');

  addItem.addEventListener('click', () => {
    popupForm.classList.add('modal-wrap__visible');
  });

  closeIcon.addEventListener('click', () => {
    popupForm.classList.remove('modal-wrap__visible');
  });

  popupOverlay.addEventListener('click', (event) => {
    event.stopPropagation();
  }); //это не очень хорошая практика, лучше использовать технологию делегирования

  popupForm.addEventListener('click', () => {
    popupForm.classList.remove('modal-wrap__visible');
  });
}
