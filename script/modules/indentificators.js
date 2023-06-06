const addItem = document.querySelector('.interactive__add');
const popupForm = document.querySelector('.modal-wrap');
const delBtn = document.querySelector('.tbody-td_delete');
const list = document.querySelector('.table__tbody');
const popupFormAmount = document.getElementById('amount');
const popupFormPrice = document.getElementById('price');
const popupFormDiscount = document.getElementById('discount-field');
const popupFormTotal = document.querySelector('.total__span-number');

const button = document.body.getElementsByClassName('inner-fieldset__input_active')[0];
const colorArray = document.getElementsByClassName('inner-fieldset__input_active');
const checkbox = document.querySelector('.inner-fieldset__checkbox');

export {
  addItem,
  popupForm,
  delBtn,
  list,
  popupFormAmount,
  popupFormPrice,
  popupFormDiscount,
  popupFormTotal,
  button,
  colorArray,
  checkbox,
};
