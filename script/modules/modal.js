import {addItemData, renderItems} from './render.js';
import {mainElement, addItem, list} from './indentificators.js';

const loadStyles = async (stylesPath) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesPath;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
};

const createModal = () => {
  const popupForm = document.createElement('div');
  popupForm.classList.add('main__modal', 'modal-wrap');

  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-wrap__overlay', 'overlay');

  const modalSection = document.createElement('section');
  modalSection.setAttribute('aria-label', 'modal');
  modalSection.classList.add('modal');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal__title');
  modalTitle.textContent = 'Добавить товар';

  const modalClose = document.createElement('div');
  modalClose.classList.add('modal__close');

  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('modal__close-button');

  const closeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  closeSvg.setAttribute('width', '24');
  closeSvg.setAttribute('height', '24');
  closeSvg.setAttribute('viewBox', '0 0 24 24');
  closeSvg.setAttribute('fill', 'none');
  closeSvg.classList.add('modal__close-svg', 'close-svg');

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute('d', 'M2 2L22 22');
  path1.setAttribute('stroke', '#6E6893');
  path1.setAttribute('stroke-width', '3');
  path1.setAttribute('stroke-linecap', 'round');
  path1.classList.add('close-svg__stroke');

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute('d', 'M2 22L22 2');
  path2.setAttribute('stroke', '#6E6893');
  path2.setAttribute('stroke-width', '3');
  path2.setAttribute('stroke-linecap', 'round');
  path2.classList.add('close-svg__stroke');

  closeSvg.appendChild(path1);
  closeSvg.appendChild(path2);
  closeButton.appendChild(closeSvg);
  modalClose.appendChild(closeButton);

  // Add the rest of your form elements here
  const form = document.createElement("form");
  form.action = "";
  form.method = "POST";
  form.classList.add("modal__form", "form");

  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("form__fieldset", "fieldset");

  // Name
  const nameLabel = document.createElement("label");
  nameLabel.classList.add("fieldset__label", "fieldset__grid-name");
  nameLabel.innerHTML = '<span class="fieldset__span">Наименование</span>';
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "title";
  nameInput.required = true;
  nameInput.id = "name";
  nameInput.classList.add("fieldset__input");
  nameLabel.appendChild(nameInput);

  // Category
  const categoryLabel = document.createElement("label");
  categoryLabel.classList.add("fieldset__label", "fieldset__grid-category");
  categoryLabel.innerHTML = '<span class="fieldset__span">Категория</span>';
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.name = "category";
  categoryInput.required = true;
  categoryInput.id = "category";
  categoryInput.classList.add("fieldset__input");
  categoryLabel.appendChild(categoryInput);

  // Units
  const unitsLabel = document.createElement("label");
  unitsLabel.classList.add("fieldset__label", "fieldset__grid-measuring");
  unitsLabel.innerHTML = '<span class="fieldset__span">Единицы измерения</span>';
  const unitsInput = document.createElement("input");
  unitsInput.type = "text";
  unitsInput.name = "units";
  unitsInput.required = true;
  unitsInput.classList.add("fieldset__input");
  unitsLabel.appendChild(unitsInput);

  // Discount
  const discountFieldset = document.createElement("fieldset");
  discountFieldset.classList.add(
    "fieldset__inner-fieldset",
    "fieldset__inner-fieldset_row",
    "fieldset__inner-fieldset_no-border",
    "fieldset__inner-fieldset_width",
    "inner-fieldset"
  );

  const discountLegend = document.createElement("legend");
  discountLegend.classList.add("inner-fieldset__legend");
  discountLegend.textContent = "Дисконт";
  const discountLabel = document.createElement("label");
  discountLabel.classList.add("inner-fieldset__label");
  const discountInput = document.createElement("input");
  discountInput.id = "discount";
  discountInput.type = "checkbox";
  discountInput.name = "discount";
  discountInput.classList.add("inner-fieldset__checkbox");
  discountLabel.appendChild(discountInput);

  const discountFieldLabel = document.createElement("label");
  discountFieldLabel.htmlFor = "discount-field";
  discountFieldLabel.classList.add(
    "inner-fieldset__label",
    "inner-fieldset__label_width"
  );
  const discountFieldInput = document.createElement("input");
  discountFieldInput.id = "discount-field";
  discountFieldInput.type = "number";
  discountFieldInput.name = "discount-field";
  discountFieldInput.disabled = true;
  discountFieldInput.classList.add(
    "inner-fieldset__input",
    "inner-fieldset__input_active",
    "inner-fieldset__input_styles"
  );
  discountFieldLabel.appendChild(discountFieldInput);

  discountFieldset.appendChild(discountLegend);
  discountFieldset.appendChild(discountLabel);
  discountFieldset.appendChild(discountFieldLabel);

  // Description
  const descriptionLabel = document.createElement("label");
  descriptionLabel.classList.add("fieldset__label", "fieldset__grid-description");
  descriptionLabel.innerHTML = '<span class="fieldset__span">Описание</span>';
  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.name = "description";
  descriptionTextarea.classList.add("fieldset__textarea");
  descriptionLabel.appendChild(descriptionTextarea);

  // Amount
  const amountLabel = document.createElement("label");
  amountLabel.classList.add("fieldset__label", "fieldset__grid-amount");
  amountLabel.innerHTML = '<span class="fieldset__span">Количество</span>';
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.name = "count";
  amountInput.id = "amount";
  amountInput.required = true;
  amountInput.classList.add("fieldset__input");
  amountLabel.appendChild(amountInput);

  // Price
  const priceLabel = document.createElement("label");
  priceLabel.classList.add("fieldset__label", "fieldset__grid-price");
  priceLabel.innerHTML = '<span class="fieldset__span">Цена</span>';
  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.min = "1";
  priceInput.step = "any";
  priceInput.name = "price";
  priceInput.required = true;
  priceInput.id = "price";
  priceInput.classList.add("fieldset__input");
  priceLabel.appendChild(priceInput);

  // File
  const fileLabel = document.createElement("label");
  fileLabel.classList.add("fieldset__label", "fieldset__grid-file");
  fileLabel.textContent = 'Добавить изображение';
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/png, image/gif, image/jpeg";
  fileInput.name = "image";
  fileInput.id = "file";
  fileInput.classList.add("fieldset__input-file");
  fileLabel.appendChild(fileInput);

  fieldset.appendChild(nameLabel);
  fieldset.appendChild(categoryLabel);
  fieldset.appendChild(unitsLabel);
  fieldset.appendChild(discountFieldset);
  fieldset.appendChild(descriptionLabel);
  fieldset.appendChild(amountLabel);
  fieldset.appendChild(priceLabel);
  fieldset.appendChild(fileLabel);

  // Total
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("form__total", "total");
  const totalPrice = document.createElement("p");
  totalPrice.classList.add("total__price");
  totalPrice.innerHTML =
    'Итоговая стоимость: <span class="total__span">$ <span class="total__span-number">0</span></span>';
  const totalButton = document.createElement("button");
  totalButton.type = "submit";
  totalButton.classList.add("total__button");
  totalButton.textContent = "Добавить товар";
  totalDiv.appendChild(totalPrice);
  totalDiv.appendChild(totalButton);

  form.appendChild(fieldset);
  form.appendChild(totalDiv);

  modalSection.appendChild(modalTitle);
  modalSection.appendChild(modalClose);
  modalSection.appendChild(form);

  modalOverlay.appendChild(modalSection);
  popupForm.appendChild(modalOverlay);

  const firstChild = mainElement.firstElementChild;
  mainElement.insertBefore(popupForm, firstChild);

  return {
    popupForm,
    discountInput,
    discountFieldInput,
    amountInput,
    priceInput,
    totalPrice,
    nameInput,
    categoryInput,
    unitsInput,
    descriptionTextarea,
    fileInput,
  };
};

const openModalWithStyles = async () => {
  try {
    await loadStyles('styles/modal-wrap/modal-wrap.css');
    await loadStyles('styles/overlay/overlay.css');
    await loadStyles('styles/modal/modal.css');
    await loadStyles('styles/form/form.css');
    await loadStyles('styles/fieldset/fieldset.css');
    await loadStyles('styles/total/total.css');

    modalControl().openModal();
  } catch (error) {
    console.error('Не удалось загрузить стили:', error);
  }
};

const { popupForm, discountInput, discountFieldInput, amountInput, priceInput, totalPrice, nameInput, categoryInput, unitsInput, descriptionTextarea, fileInput } = createModal();

const toggleCheckbox = () => {
  discountInput.addEventListener("change", () => {
    if (discountInput.checked) {
      discountFieldInput.removeAttribute("disabled");
      discountFieldInput.style.backgroundColor = "#F4F2FF";
      discountFieldInput.setAttribute("required", "");
    } else {
      discountFieldInput.setAttribute("disabled", "");
      discountFieldInput.style.backgroundColor = "#E5E5E5";
      discountFieldInput.removeAttribute("required");
      discountFieldInput.value = ""; // Reset the value
    }
    calculateTotalPrice();
  });

  const calculateTotalPrice = () => {
    let discountValue = discountInput.checked ? (priceInput.value * amountInput.value) * (discountFieldInput.value / 100) : 0;
    let result = (priceInput.value * amountInput.value) - discountValue;
    totalPrice.querySelector(".total__span-number").textContent = result;
  };

  discountFieldInput.addEventListener("input", calculateTotalPrice);

  for (let input of popupForm.querySelectorAll("input:not(.total__span-number)")) {
    input.addEventListener("input", calculateTotalPrice);
  }
};

const modalControl = () => {
  const openModal = () => {
    popupForm.classList.add('modal-wrap__visible');
  };

  const closeModal = () => {
    popupForm.classList.remove('modal-wrap__visible');
  };

  addItem.addEventListener('click', openModalWithStyles);

  const edit = document.querySelectorAll('.edit-icon');

  edit.forEach(edit => {
    edit.addEventListener('click', async (event) => {
      const editButton = event.target;

      const tableRow = editButton.closest('tr');

      const id = tableRow.dataset.id;

      try {
        const response = await fetch(`https://fallacious-gentle-oriole.glitch.me/api/goods/${id}`);
        if (response.ok) {
          const item = await response.json();

          nameInput.value = item.title;
          categoryInput.value = item.category;
          unitsInput.value = item.units;
          discountInput.value = item.discount;
          discountFieldInput.value = item.discount;
          descriptionTextarea.value = item.description;
          amountInput.value = item.count;
          priceInput.value = item.price;

          if (item.discount !== 0) {
            discountInput.checked = true;
            discountFieldInput.removeAttribute("disabled");
            discountFieldInput.style.backgroundColor = "#F4F2FF";
            discountFieldInput.setAttribute("required", "");
          }

          openModalWithStyles();
        } else {
          console.error('Failed to fetch item details:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  });

  popupForm.addEventListener('click', e => {
    const target = e.target;

    if (target === popupForm || target.closest('.close-svg')) {
      popupForm.classList.remove('modal-wrap__visible');

      nameInput.value = '';
      categoryInput.value = '';
      unitsInput.value = '';
      discountInput.checked = false;
      discountFieldInput.value = '';
      descriptionTextarea.value = '';
      amountInput.value = '';
      priceInput.value = '';
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
  loadStyles,
  openModalWithStyles,
  createModal,
  toggleCheckbox,
  modalControl,
  displayErrorMessage,
  hideErrorMessage,
  calcTotalCrmPrice,
};
