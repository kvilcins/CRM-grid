import {renderItems, addItemData, addItemPage} from './render.js';
import {addItem, popupForm, delBtn, list, popupFormAmount, popupFormPrice, popupFormDiscount, popupFormTotal, button, colorArray, checkbox} from './indentificators.js';

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

const modalControl = (delBtn, popupForm) => {
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
    } // метод делегирования
  });

  return {
    closeModal,
    openModal,
  };
};

const formControl = (popupForm, list, closeModal) => {
  popupForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newItem = Object.fromEntries(formData);
    addItemPage(newItem, list);
    addItemData(newItem);

    e.target.reset();
    closeModal();
  })
};

const calcTotalCrmPrice = () => {
  const crmTotalPrice = document.querySelector('.crm-total__span');
  const itemTotalArray = [...document.querySelectorAll('.tbody-td_total')];
  let totalCrmPrice = 0;
  let newArr = [];

  itemTotalArray.forEach(element => {
    newArr.push(element.innerHTML.slice(1));
  });

  let numberArray = [];

  for (let i = 0; i < newArr.length; i++) {
    numberArray.push(parseInt(newArr[i]));
    totalCrmPrice += numberArray[i];
  };

  crmTotalPrice.textContent = `$${totalCrmPrice}`;
  popupForm.addEventListener('submit', calcTotalCrmPrice);
};

export {
  toggleCheckbox,
  modalControl,
  formControl,
  calcTotalCrmPrice,
};
