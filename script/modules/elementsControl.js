import {calcTotalCrmPrice, modalControl} from './modal.js';
import {fetchGoods, clearTable, renderItems} from './render.js';

const createMarkup = () => {
  const main = document.createElement('main');
  main.className = 'main';

  const modalWrap = document.createElement('div');
  modalWrap.className = 'main__modal modal-wrap';
  main.appendChild(modalWrap);

  const createErrorMessage = () => {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';

    const errorMessageContent = document.createElement('div');
    errorMessageContent.className = 'error-message__content';
    errorMessage.appendChild(errorMessageContent);

    const errorMessageClose = document.createElement('div');
    errorMessageClose.className = 'error-message__close';
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'error-message__close-button';
    errorMessageClose.appendChild(closeButton);

    const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    closeSvg.setAttribute('width', '24');
    closeSvg.setAttribute('height', '24');
    closeSvg.setAttribute('viewBox', '0 0 24 24');
    closeSvg.setAttribute('fill', 'none');
    closeSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M2 2L22 22');
    path1.setAttribute('stroke', '#6E6893');
    path1.setAttribute('stroke-width', '3');
    path1.setAttribute('stroke-linecap', 'round');

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M2 22L22 2');
    path2.setAttribute('stroke', '#6E6893');
    path2.setAttribute('stroke-width', '3');
    path2.setAttribute('stroke-linecap', 'round');

    closeSvg.appendChild(path1);
    closeSvg.appendChild(path2);

    closeButton.appendChild(closeSvg);

    errorMessage.appendChild(errorMessageClose);

    return errorMessage;
  };

  main.appendChild(createErrorMessage());

  const crmWrap = document.createElement('div');
  crmWrap.className = 'main__crm crm-wrap';

  const crmTotal = document.createElement('div');
  crmTotal.className = 'crm-wrap__total crm-total';

  const crmTitle = document.createElement('h1');
  crmTitle.className = 'crm-total__title';
  crmTitle.textContent = 'CMS';

  const crmPrice = document.createElement('p');
  crmPrice.className = 'crm-total__price';

  const crmSpan = document.createElement('span');
  crmSpan.className = 'crm-total__span';

  crmPrice.textContent = `Итоговая стоимость: `;

  crmPrice.appendChild(crmSpan);

  crmTotal.appendChild(crmTitle);
  crmTotal.appendChild(crmPrice);

  crmWrap.appendChild(crmTotal);

  // Creating table-top
  const tableTop = document.createElement('div');
  tableTop.className = 'crm-wrap__border table-top';

  // Creating interactive
  const interactive = document.createElement('div');
  interactive.className = 'table-top__interactive interactive';

  const filterButton = document.createElement('button');
  filterButton.type = 'button';
  filterButton.className = 'interactive__filter';
  filterButton.textContent = 'Фильтр';
  interactive.appendChild(filterButton);

  // Creating search form
  const form = document.createElement('form');
  form.action = 'https://jsonplaceholder.typicode.com/posts';
  form.method = 'POST';
  form.className = 'interactive__form search-category';

  const formWrap = document.createElement('div');
  formWrap.className = 'search-category__wrap';

  const formInput = document.createElement('input');
  formInput.name = 'search';
  formInput.placeholder = 'Поиск по наименованию и категории';
  formInput.type = 'search';
  formInput.className = 'search-category__icon';

  formWrap.appendChild(formInput);
  form.appendChild(formWrap);
  interactive.appendChild(form);

  // Creating add button
  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.className = 'interactive__add';
  addButton.textContent = 'Добавить товар';
  interactive.appendChild(addButton);

  tableTop.appendChild(interactive);

  // Creating table-overflow
  const tableOverflow = document.createElement('div');
  tableOverflow.className ='table-overflow';

  // Creating table
  const tableElement= document.createElement("table");
  tableElement.classList.add("table-overflow__table", "table");

  // Creating thead
  const theadElement= document.createElement("thead");
  theadElement.classList.add("table__thead", "thead-wrap");

  // Creating tr for thead
  const trHeadElement= document.createElement("tr");
  trHeadElement.classList.add("thead-wrap__tr", "thead-tr");

  // Creating th and adding in tr for thead
  const thValues = ['ID', 'Наименование', 'Категория', 'Ед/Изм', 'Количество', 'Цена', 'Итог'];
  const thClasses = ['head-th_id-width', 'head-th_name-width', 'head-th_cat-width',
    'head-th_measurement-width thead-th_center',
    'head-th_amount-width thead-th_center',
    'head-th_price-width thead-th_right',
    'head-th_total-width thead-th_right'];

  for (let i = 0; i < thValues.length; i++) {
    const thElement = document.createElement('th');
    thElement.className = `thead-tr__th thead-th ${thClasses[i]}`;
    thElement.textContent = thValues[i];
    trHeadElement.appendChild(thElement);
  }

  theadElement.appendChild(trHeadElement);
  tableElement.appendChild(theadElement);

  // Creating tbody
  const tbodyElement = document.createElement('tbody');
  tbodyElement.className = 'table__tbody tbody-wrap';

  const createRow = ({id, title, price, description, category, discount, count, units, image, edit, deleteItem}) => {
    const tr = document.createElement('tr');
    tr.classList.add('tbody-wrap__tr', 'tbody-tr');

    const tdID = document.createElement('td');
    tdID.textContent = id;
    tdID.classList.add('tbody-tr__td', 'tbody-td');
    tdID.setAttribute('contenteditable', true);

    const tdName = document.createElement('td');
    tdName.textContent = title;
    tdName.classList.add('tbody-tr__td', 'tbody-td');

    const tdCategory = document.createElement('td');
    tdCategory.textContent = category;
    tdCategory.classList.add('tbody-tr__td', 'tbody-td');

    const tdUnits = document.createElement('td');
    tdUnits.textContent = units;
    tdUnits.classList.add('tbody-tr__td', 'tbody-td', 'tbody-td_color', 'tbody-td_center');

    const tdAmount = document.createElement('td');
    tdAmount.textContent = count;
    tdAmount.classList.add('tbody-tr__td', 'tbody-td', 'tbody-td_center');

    const tdPrice = document.createElement('td');
    tdPrice.textContent = `$${price}`;
    tdPrice.classList.add('tbody-tr__td', 'tbody-td', 'tbody-td_right');

    const tdTotal = document.createElement('td');
    if (discount === 0) {
      const totalWithoutDiscount = count * price;
      tdTotal.textContent = `$${totalWithoutDiscount}`;
    } else {
      const totalWithDiscount = count * price * (1 - discount / 100);
      tdTotal.textContent = `$${totalWithDiscount.toFixed(2)}`;
    }

    tdTotal.classList.add('tbody-tr__td', 'tbody-td', 'tbody-td_right', 'tbody-td_padding', 'tbody-td_total');

    const tdImg = document.createElement('td');
    tdImg.classList.add('tbody-tr__td', 'tbody-td', 'tbody-td_image');

    const buttonImg = document.createElement('button');
    buttonImg.classList.add('tbody-td__button');
    tdImg.append(buttonImg);

    buttonImg.insertAdjacentHTML('beforeend', `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="tbody-td__svg image-icon">
        <path d="M17.7778 2.22223H2.22223C1.92754 2.22223 1.64493 2.33929 1.43655 2.54767C1.22818 2.75604 1.11111 3.03866 1.11111 3.33334V16.6667C1.11111 16.9614 1.22818 17.244 1.43655 17.4523C1.64493 17.6607 1.92754 17.7778 2.22223 17.7778H17.7778C18.0725 17.7778 18.3551 17.6607 18.5635 17.4523C18.7718 17.244 18.8889 16.9614 18.8889 16.6667V3.33334C18.8889 3.03866 18.7718 2.75604 18.5635 2.54767C18.3551 2.33929 18.0725 2.22223 17.7778 2.22223V2.22223ZM2.22223 16.6667V3.33334H17.7778V16.6667H2.22223Z" fill="currentColor" class="image-icon__path"/>
        <path d="M4.95555 7.77778C5.28518 7.77778 5.60741 7.68003 5.8815 7.49689C6.15558 7.31376 6.3692 7.05346 6.49535 6.74892C6.62149 6.44437 6.6545 6.10926 6.59019 5.78596C6.52588 5.46266 6.36715 5.16569 6.13406 4.9326C5.90097 4.69951 5.604 4.54078 5.2807 4.47647C4.9574 4.41216 4.62228 4.44516 4.31774 4.57131C4.0132 4.69746 3.7529 4.91108 3.56976 5.18516C3.38663 5.45924 3.28888 5.78147 3.28888 6.11111C3.28888 6.55314 3.46447 6.97706 3.77703 7.28962C4.0896 7.60218 4.51352 7.77778 4.95555 7.77778V7.77778ZM4.95555 5.22222C5.13158 5.22112 5.30399 5.27232 5.45089 5.36932C5.5978 5.46632 5.71259 5.60476 5.78072 5.76708C5.84885 5.9294 5.86725 6.1083 5.83358 6.28109C5.79992 6.45389 5.7157 6.61279 5.59161 6.73766C5.46752 6.86253 5.30915 6.94774 5.13657 6.98249C4.96399 7.01724 4.78498 6.99997 4.62223 6.93285C4.45949 6.86574 4.32033 6.75182 4.22241 6.60552C4.12449 6.45923 4.07222 6.28715 4.07221 6.11111C4.07367 5.87729 4.1672 5.65345 4.33255 5.48811C4.49789 5.32277 4.72172 5.22923 4.95555 5.22778V5.22222Z" fill="currentColor" class="image-icon__path"/>
        <path d="M12.6555 8.53889L9.65555 11.5389L7.43332 9.31666C7.32923 9.21319 7.18843 9.15511 7.04166 9.15511C6.89489 9.15511 6.75408 9.21319 6.64999 9.31666L3.28888 12.7222V14.2944L7.0611 10.5222L8.88888 12.3222L6.80555 14.4056H8.33332L13.0278 9.71111L16.6667 13.3333V11.7667L13.4389 8.53889C13.3348 8.43541 13.194 8.37733 13.0472 8.37733C12.9004 8.37733 12.7596 8.43541 12.6555 8.53889V8.53889Z" fill="currentColor" class="image-icon__path"/>
      </svg>
    `);

    (async () => {
      try {
        const productData = await fetchGoods();
        if (productData && image) {
          buttonImg.setAttribute('data-pic', `https://fallacious-gentle-oriole.glitch.me/${image}`);
        }

        buttonImg.addEventListener('click', () => {
          const picUrl = buttonImg.getAttribute('data-pic');
          const windowWidth = 600;
          const windowHeight = 600;
          const windowTop = (screen.height / 2) - (windowHeight / 2);
          const windowLeft = (screen.width / 2) - (windowWidth / 2);

          window.open(picUrl, '_blank', `width=${windowWidth},height=${windowHeight},top=${windowTop},left=${windowLeft}`);
        });

      } catch (error) {
        console.error(error);
      }
    })();

    const tdEdit = document.createElement('td');
    tdEdit.textContent = edit;
    tdEdit.classList.add('tbody-tr__td', 'tbody-td', 'tbody-td_edit');

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('tbody-td__button');
    buttonEdit.setAttribute('data-id', id);
    tdEdit.append(buttonEdit);

    buttonEdit.insertAdjacentHTML('beforeend', `
      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" class="tbody-td__svg edit-icon">
        <path d="M13.5629 3.86078L15.6394 5.93629L13.5629 3.86078ZM14.8982 2.03233L9.28343 7.64709C8.99332 7.9368 8.79546 8.3059 8.7148 8.70789L8.19617 11.304L10.7923 10.7844C11.1942 10.704 11.5629 10.5069 11.8531 10.2167L17.4678 4.60196C17.6366 4.43324 17.7704 4.23293 17.8617 4.01248C17.953 3.79203 18 3.55576 18 3.31714C18 3.07853 17.953 2.84225 17.8617 2.6218C17.7704 2.40136 17.6366 2.20105 17.4678 2.03233C17.2991 1.8636 17.0988 1.72976 16.8784 1.63845C16.6579 1.54714 16.4216 1.50014 16.183 1.50014C15.9444 1.50014 15.7081 1.54714 15.4877 1.63845C15.2672 1.72976 15.0669 1.8636 14.8982 2.03233V2.03233Z" stroke="#6E6893" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="edit-icon__path"/>
        <path d="M16.0394 13.2648V16.206C16.0394 16.726 15.8328 17.2248 15.4651 17.5925C15.0973 17.9602 14.5986 18.1668 14.0786 18.1668H3.29415C2.77411 18.1668 2.27537 17.9602 1.90765 17.5925C1.53993 17.2248 1.33334 16.726 1.33334 16.206V5.42157C1.33334 4.90154 1.53993 4.4028 1.90765 4.03508C2.27537 3.66735 2.77411 3.46077 3.29415 3.46077H6.23535" stroke="#6E6893" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="edit-icon__path"/>
      </svg>
    `);

    const tdDelete = document.createElement('td');
    tdDelete.textContent = deleteItem;
    tdDelete.classList.add('tbody-tr__td', 'tbody-td', 'tbody-td_delete');

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('tbody-td__button');
    tdDelete.append(buttonDelete);

    buttonDelete.insertAdjacentHTML('beforeend', `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="tbody-td__svg delete-icon">
        <path d="M7.03125 3.59375H6.875C6.96094 3.59375 7.03125 3.52344 7.03125 3.4375V3.59375H12.9688V3.4375C12.9688 3.52344 13.0391 3.59375 13.125 3.59375H12.9688V5H14.375V3.4375C14.375 2.74805 13.8145 2.1875 13.125 2.1875H6.875C6.18555 2.1875 5.625 2.74805 5.625 3.4375V5H7.03125V3.59375ZM16.875 5H3.125C2.7793 5 2.5 5.2793 2.5 5.625V6.25C2.5 6.33594 2.57031 6.40625 2.65625 6.40625H3.83594L4.31836 16.6211C4.34961 17.2871 4.90039 17.8125 5.56641 17.8125H14.4336C15.1016 17.8125 15.6504 17.2891 15.6816 16.6211L16.1641 6.40625H17.3438C17.4297 6.40625 17.5 6.33594 17.5 6.25V5.625C17.5 5.2793 17.2207 5 16.875 5ZM14.2832 16.4062H5.7168L5.24414 6.40625H14.7559L14.2832 16.4062Z" fill="currentColor" class="delete-icon__path"/>
      </svg>
    `);

    tr.append(tdID, tdName, tdCategory, tdUnits, tdAmount, tdPrice, tdTotal, tdImg, tdEdit, tdDelete);

    return tr;
  };

  tableElement.appendChild(tbodyElement);
  tableOverflow.appendChild(tableElement);
  tableTop.appendChild(tableOverflow);

  const tfoot = document.createElement('tfoot');
  tfoot.className = 'table__tbody tfoot-wrap';

  const trFoot = document.createElement('tr');
  trFoot.className = 'tfoot-wrap__tr tfoot-tr';

  for (let i = 0; i < 4; i++) {
    const td = document.createElement('td');
    td.className = 'tfoot-tr__td tfoot-td';

    const p = document.createElement('p');
    p.className = 'tfoot-td__text';

    let select;

    if (i === 0) {
      td.colSpan = '3';
      td.className += ' tfoot-td_align';

      // Initialize select element
      select = document.createElement('select');
      select.className = 'tfoot-td__select';
      [10, 20, 30].forEach(num => {
        const option = document.createElement('option');
        option.value = num;
        option.text = num;
        select.appendChild(option);
      });

      const labelText = document.createElement('p');
      labelText.className = 'tfoot-td__text';
      labelText.textContent = 'Show on page:';
      td.appendChild(labelText);

      td.appendChild(select);

    } else if (i === 1) {
      td.colSpan = '2';
      td.className += ' tfoot-td_center';
    } else if (i === 2 || i === 3) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tfoot-td__button';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

      // Setting SVG options
      if (i === 2) {
        svg.setAttribute('width', '6');
        svg.setAttribute('height', '10');
        svg.setAttribute('viewBox', '0 0 6 10');
        svg.classList.add('tfoot-td__svg', 'back-icon');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M5.79971 1.10636C6.42812 0.51287 5.43313 -0.426818 4.80472 0.216126L0.196378 4.51891C-0.0654595 4.7662 -0.0654595 5.21131 0.196378 5.4586L4.80472 9.81084C5.43313 10.4043 6.42812 9.46464 5.79971 8.87115L1.71504 5.01348L5.79971 1.10636Z');
        path.setAttribute('fill', 'currentColor');
        path.classList.add('back-icon__path');

        svg.appendChild(path);
        button.appendChild(svg);

        td.appendChild(button);

        trFoot.appendChild(td);

      } else {
        svg.setAttribute('width', '6');
        svg.setAttribute('height', '10');
        svg.setAttribute('viewBox', '0 0 6 10');
        svg.classList.add('tfoot-td__svg', 'forward-icon');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M0.200293 1.10636C-0.428118 0.51287 0.566865 -0.426818 1.19528 0.216126L5.80362 4.51891C6.06546 4.7662 6.06546 5.21131 5.80362 5.4586L1.19528 9.81084C0.566865 10.4043 -0.428118 9.46464 0.200293 8.87115L4.28496 5.01348L0.200293 1.10636Z');
        path.setAttribute('fill', 'currentColor');
        path.classList.add('forward-icon__path');

        svg.appendChild(path);
        button.appendChild(svg);

        td.appendChild(button);
      }
    }

    document.addEventListener('DOMContentLoaded', async () => {
      let currentPage = 1;
      let itemsPerPage = 10;
      const list = document.querySelector('.table__tbody');
      const backBtn = document.querySelector('.back-icon');
      const forwardBtn = document.querySelector('.forward-icon');
      const select = document.querySelector('.tfoot-td__select');
      const td = document.querySelector('.tfoot-td_center');

      const updateTable = async () => {
        const response = await fetch('https://fallacious-gentle-oriole.glitch.me/api/goods');
        const goods = await response.json();
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = goods.slice(start, end);

        clearTable(list);

        const allRow = pageItems.map(item => {
          const row = createRow(item);
          row.dataset.id = item.id;
          return row;
        });

        list.append(...allRow);

        td.textContent = `${start + 1}-${end > goods.length ? goods.length : end} of ${goods.length}`;
      };

      select.addEventListener('change', (e) => {
        itemsPerPage = parseInt(e.target.value, 10);
        currentPage = 1;
        updateTable();
      });

      backBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          updateTable();
        }
      });

      forwardBtn.addEventListener('click', async () => {
        const response = await fetch('https://fallacious-gentle-oriole.glitch.me/api/goods');
        const goods = await response.json();

        if (currentPage < Math.ceil(goods.length / itemsPerPage)) {
          currentPage++;
          updateTable();
        }
      });

      updateTable(); // Initial table render
    });

    trFoot.appendChild(td);
  }

  tfoot.appendChild(trFoot);
  tableTop.appendChild(tfoot);

  crmWrap.appendChild(tableTop);
  main.appendChild(crmWrap);

  document.body.appendChild(main);

  return {
    main,
    createRow,
    formInput,
    tbodyElement,
  };
};

const { createRow, formInput, tbodyElement } = createMarkup();

const deleteItemFromServer = async (itemId) => {
  try {
    const response = await fetch(`https://fallacious-gentle-oriole.glitch.me/api/goods/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete item from the server');
    }
  } catch (error) {
    console.error('Error deleting item from the server:', error);
    throw error;
  }
};

const deleteControl = (delBtn, list) => {
  list.addEventListener('click', async (e) => {
    if (e.target.closest('.tbody-td_delete')) {
      const listItem = e.target.closest('.tbody-tr');
      const itemId = listItem.dataset.id;

      try {
        await deleteItemFromServer(itemId);
        listItem.remove();
        calcTotalCrmPrice();
      } catch (error) {
        console.error('Error deleting item from the server:', error);
      }
    }
  });
};

let searchTimeout;

const handleSearchInput = async () => {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    const searchTerm = formInput.value;
    const data = await fetchGoodsWithSearch(searchTerm);
    renderItems(data);
  }, 300);
};

const fetchGoodsWithSearch = async (searchTerm) => {
  try {
    const response = await fetch(`https://fallacious-gentle-oriole.glitch.me/api/goods?search=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Failed to fetch goods from the server');
    }

    const data = await response.json();

    clearTable(tbodyElement);

    if (data.length > 0) {
      data.forEach((item) => {
        const row = createRow(item);
        tbodyElement.appendChild(row);
      });
    } else {
      const noDataMessage = document.createElement('tr');
      noDataMessage.textContent = 'Нет данных для отображения.';
      tbodyElement.appendChild(noDataMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

formInput.addEventListener('input', handleSearchInput);

export {
  deleteItemFromServer,
  createMarkup,
  createRow,
  deleteControl,
};
