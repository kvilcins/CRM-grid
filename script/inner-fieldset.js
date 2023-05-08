'use strict';

const button = document.body.getElementsByClassName('inner-fieldset__input_active')[0];
const colorArray = document.getElementsByClassName('inner-fieldset__input_active');
const checkbox = document.querySelector('.inner-fieldset__checkbox');

const cleanInput = () => {
  colorArray[0].value = "";
};

checkbox.addEventListener("click", cleanInput);

discount.onchange = () => {
  if (button.disabled) {
    button.disabled = false;
    colorArray[0].style.backgroundColor = '#F4F2FF';
    colorArray[0].setAttribute('required', '');
  } else {
    button.disabled = true;
    colorArray[0].style.backgroundColor = '#E5E5E5';
    colorArray[0].removeAttribute('required', '');
  }
};



