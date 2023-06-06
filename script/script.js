import {toggleCheckbox, modalControl, formControl, calcTotalCrmPrice} from './modules/modal.js';
import {createRow, deleteControl} from './modules/elementsControl.js';
import {renderItems, addItemData, addItemPage} from './modules/render.js';
import {addItem, popupForm, delBtn, list, popupFormAmount, popupFormPrice, popupFormDiscount, popupFormTotal, button, colorArray, checkbox} from './modules/indentificators.js';
import {data} from './modules/data.js';

{
  const init = () => {
    const allRow = renderItems(list, data);
    const {closeModal} = modalControl(delBtn, popupForm);
    deleteControl(delBtn, list);
    formControl(popupForm, list, closeModal);
    toggleCheckbox();
    calcTotalCrmPrice();
  };

  window.crmInit = init;
}
