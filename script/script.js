import {toggleCheckbox, modalControl, formControl, calcTotalCrmPrice} from './modules/modal.js';
import {fetchGoods, renderItems, addItemData, addItemPage} from './modules/render.js';
import {deleteItemFromServer, createRow, deleteControl} from './modules/elementsControl.js';
import {addItem, popupForm, delBtn, list, popupFormAmount, popupFormPrice, popupFormDiscount, popupFormTotal, button, colorArray, checkbox} from './modules/indentificators.js';

{
  const init = async () => {
    try {
      const allRow = await renderItems(list);
      const { closeModal } = modalControl(delBtn, popupForm);
      deleteControl(delBtn, list);
      await formControl(popupForm, list, closeModal);
      toggleCheckbox();
      calcTotalCrmPrice();
    } catch (error) {
      console.error('Error in init:', error);
    }
  };

  window.crmInit = init;
}
