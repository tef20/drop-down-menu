export default function createMenuNode(title, id, children) {
  const node = createMenuItem(title, id);

  if (Array.isArray(children)) {
    node.classList.add('expandable');

    const expansionIcon = createExpansionIcon(id);
    node.firstChild.appendChild(expansionIcon);

    const childList = createMenuList(id, children);
    node.appendChild(childList);

    // bindings
    node.addEventListener('click', handleMenuClick);
  } else {
    node.classList.add('terminal');
    // add live link here
  }

  return node;
}

function createMenuItem(text, id) {
  const menuItem = document.createElement('li');
  menuItem.className = 'menuItem';
  menuItem.dataset.nodeId = id;

  const itemLink = document.createElement('a');
  itemLink.href = '#';
  itemLink.dataset.nodeId = id;
  menuItem.appendChild(itemLink);

  const itemContent = document.createElement('span');
  itemContent.textContent = text;
  itemContent.dataset.nodeId = id;
  itemLink.appendChild(itemContent);

  return menuItem;
}

function createExpansionIcon(id) {
  const expansionIcon = document.createElement('i');
  expansionIcon.className = 'expansionIcon material-icons-outlined';
  expansionIcon.textContent = 'add';
  expansionIcon.dataset.nodeId = id;

  return expansionIcon;
}

function createMenuList(id, menuItems) {
  const menuList = document.createElement('ul');
  menuList.dataset.nodeId = id;
  menuList.classList.add('menuList', 'hidden');

  menuItems.forEach((menuItem) => menuList.appendChild(menuItem));

  return menuList;
}

function handleMenuClick(e) {
  const thisMenu = this.querySelector('.menuList');
  const thisMenuIcon = this.querySelector('i');

  // set all menu items to hidden initially
  if (this.dataset.nodeId === e.target.dataset.nodeId) {
    const currentItemState = menuItemState();
    currentItemState.save(e.target.dataset.nodeId);

    collapseAllMenus();

    // preserve state of targetted submenu
    currentItemState.revert(e.target.dataset.nodeId);
  }

  // toggle targetted submenu and
  // reveal ancestors through event propegation
  thisMenu.classList.toggle('hidden');
  toggleIcon(thisMenuIcon);
}

function menuItemState() {
  let listClass;
  let icon;

  function save(id) {
    document.querySelectorAll(`[data-node-id='${id}']`).forEach((elem) => {
      if (elem.classList.contains('menuList')) {
        listClass = elem.className;
      }
      if (elem.classList.contains('expansionIcon')) {
        icon = elem.textContent;
      }
    });
  }

  function revert(id) {
    document.querySelectorAll(`[data-node-id='${id}']`).forEach((elem) => {
      if (elem.classList.contains('menuList')) {
        elem.className = listClass;
      }
      if (elem.classList.contains('expansionIcon')) {
        elem.textContent = icon;
      }
    });
  }

  return {
    save,
    revert,
  };
}

function collapseAllMenus() {
  document.querySelectorAll('.menuItem').forEach((item) => {
    item.querySelectorAll('.menuList').forEach((list) => {
      list.classList.add('hidden');
    });
    item.querySelectorAll('.expansionIcon').forEach((icon) => {
      icon.textContent = 'add';
    });
  });
}

function toggleIcon(icon) {
  if (icon.textContent === 'add') {
    icon.textContent = 'remove';
  } else {
    icon.textContent = 'add';
  }
}
