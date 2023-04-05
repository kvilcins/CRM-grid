'use strict';

{
  const addItem = document.querySelector('.interactive__add');
  const popupForm = document.querySelector('.modal-wrap');
  const delBtn = document.querySelector('.tbody-td_delete');
  const list = document.querySelector('.table__tbody');
  // const popupOverlay = document.querySelector('.overlay');
  // const closeIcon = document.querySelector('.close-svg');

  addItem.addEventListener('click', () => {
    popupForm.classList.add('modal-wrap__visible');
  });

  // closeIcon.addEventListener('click', () => {
  //   popupForm.classList.remove('modal-wrap__visible');
  // });

  // popupOverlay.addEventListener('click', (event) => {
  //   event.stopPropagation();
  // });
  // это не очень хорошая практика, лучше использовать технологию делегирования

  // popupForm.addEventListener('click', () => {
  //   popupForm.classList.remove('modal-wrap__visible');
  // });

  popupForm.addEventListener('click', e => {
    const target = e.target;

    if (target === popupForm || target.closest('.close-svg')) {
      popupForm.classList.remove('modal-wrap__visible');
    } // метод делегирования
  });

  // delBtn.addEventListener('click', () => {
  //   document.querySelectorAll('.tbody-td_delete').forEach(del => {
  //     del.classList.toggle('is-visible');
  //   });
  // });

  list.addEventListener('click', e => {
    if (e.target.closest('.tbody-td_delete')) {
      e.target.closest('.tbody-tr').remove();
    }
    console.log(list);
  });
}
