import {addItemData, renderItems} from './render.js';
import {addItem, list, popupFormAmount, popupFormPrice, popupFormDiscount, popupFormTotal, button, colorArray, checkbox} from './indentificators.js';

const toggleCheckbox = () => {
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

  for (let e of document.querySelectorAll('input:not(.total__span-number)')) {
    const oneItemTotalPrice = () => {
      let discount = (popupFormPrice.value * popupFormAmount.value) * (popupFormDiscount.value / 100);
      let result = (popupFormPrice.value * popupFormAmount.value) - discount;

      popupFormTotal.textContent = result;
    };

    e.addEventListener('input', oneItemTotalPrice);
  }
};

const modalControl = (delBtn, popupForm, init) => {
  const openModal = () => {
    popupForm.classList.add('modal-wrap__visible');
  };

  const closeModal = () => {
    popupForm.classList.remove('modal-wrap__visible');
  };

  addItem.addEventListener('click', openModal);

  popupForm.addEventListener('click', e => {
    const target = e.target;

    if (target === popupForm || target.closest('.close-svg')) {
      popupForm.classList.remove('modal-wrap__visible');
    }
  });

  popupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = Object.fromEntries(formData);

    try {
      await addItemData(newItem);
      closeModal();

      await renderItems(list);
      calcTotalCrmPrice();
    } catch (error) {
      let errorMessage = `Error: Failed to add item to the server, Server responded with status ${error.statusCode}. Error message: ${error.message}. Please try again.`;
      displayErrorMessage(errorMessage);
    }
  });

  return {
    closeModal,
    openModal,
  };
};

const displayErrorMessage = (message, error) => {
  const errorMessageDiv = document.querySelector('.error-message');
  errorMessageDiv.querySelector('.error-message__content').textContent = message;
  errorMessageDiv.classList.add('show');

  if (error) {
    console.error(error);
  }

  const closeErrorMessage = () => {
    errorMessageDiv.classList.remove('show');
    errorMessageDiv.querySelector('.error-message__close-button').removeEventListener('click', closeErrorMessage);
    document.removeEventListener('click', outsideClickHandler);
  };

  errorMessageDiv.querySelector('.error-message__close-button').addEventListener('click', closeErrorMessage);

  const outsideClickHandler = (e) => {
    if (!errorMessageDiv.contains(e.target)) {
      closeErrorMessage();
    }
  };

  document.addEventListener('click', outsideClickHandler);

  return {
    closeErrorMessage,
    outsideClickHandler,
  };
};

const hideErrorMessage = () => {
  const errorMessageDiv = document.querySelector('.error-message');
  errorMessageDiv.classList.remove('show');
  errorMessageDiv.querySelector('.error-message__close-button').removeEventListener('click', hideErrorMessage);
};


const calcTotalCrmPrice = () => {
  const crmTotalPrice = document.querySelector('.crm-total__span');
  const itemTotalArray = document.querySelectorAll('.tbody-td_total');

  let totalCrmPrice = Array.from(itemTotalArray)
    .reduce((total, element) => total + parseFloat(element.textContent.slice(1)), 0);

  crmTotalPrice.textContent = `$${totalCrmPrice.toFixed(2)}`;
};

export {
  toggleCheckbox,
  modalControl,
  displayErrorMessage,
  hideErrorMessage,
  calcTotalCrmPrice,
};
