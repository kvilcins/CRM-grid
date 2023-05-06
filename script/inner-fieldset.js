'use strict';

discount.onchange = () => {
  const button = document.body.getElementsByClassName('inner-fieldset__input_active')[0];
  const colorArray = document.getElementsByClassName('inner-fieldset__input_active');

  if (button.disabled) {
    button.disabled = false;
    colorArray[0].style.backgroundColor = '#F4F2FF';
  } else {
    button.disabled = true;
    colorArray[0].style.backgroundColor = '#E5E5E5';

    colorArray[0].value = "";
  }
};
