import {toggleCheckbox, modalControl, calcTotalCrmPrice} from './modules/modal.js';
import {renderItems} from './modules/render.js';
import {deleteControl} from './modules/elementsControl.js';
import {delBtn, list} from './modules/indentificators.js';


{
  const init = async () => {
    try {
      const allRow = await renderItems(list);
      const { closeModal } = modalControl(delBtn, init);
      deleteControl(delBtn, list);
      toggleCheckbox();
      calcTotalCrmPrice();
    } catch (error) {
      console.error('Ошибка в функции init:', error);
    }
  };

  window.crmInit = init;
}
