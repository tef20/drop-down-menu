import createMenuNode from './menus.js';
import idGen from './id_generator.js';

const navUl = document.createElement('ul');
navUl.id = 'mainMenu';
document.querySelector('nav').appendChild(navUl);

// menu tree
const nodeIds = idGen();

const node1 = createMenuNode('Menu Item 1', nodeIds.next(), [
  createMenuNode('Menu Item 1.1', nodeIds.next(), [
    createMenuNode('Menu Item 1.1.1', nodeIds.next()),
    createMenuNode('Menu Item 1.1.2', nodeIds.next()),
  ]),
  createMenuNode('Menu Item 1.2', nodeIds.next(), [
    createMenuNode('Menu Item 1.2.1', nodeIds.next()),
  ]),
  createMenuNode('Menu Item 1.3', nodeIds.next()),
]);

const node2 = createMenuNode('Menu Item 2', nodeIds.next(), [
  createMenuNode('Menu Item 2.1', nodeIds.next(), [
    createMenuNode('Menu Item 2.1.1', nodeIds.next(), [
      createMenuNode('Menu Item 2.1.1.1', nodeIds.next()),
      createMenuNode('Menu Item 2.1.1.2', nodeIds.next()),
    ]),
    createMenuNode('Menu Item 2.1.2', nodeIds.next()),
  ]),
  createMenuNode('Menu Item 2.2', nodeIds.next(), [
    createMenuNode('Menu Item 2.2.1', nodeIds.next(), [
      createMenuNode('Menu Item 2.2.1.1', nodeIds.next()),
      createMenuNode('Menu Item 2.2.1.2', nodeIds.next()),
      createMenuNode('Menu Item 2.2.1.3', nodeIds.next()),
    ]),
  ]),
  createMenuNode('Menu Item 2.3', nodeIds.next()),
]);

const node3 = createMenuNode('Menu Item 3', nodeIds.next(), [
  createMenuNode('Menu Item 3.1', nodeIds.next()),
  createMenuNode('Menu Item 3.2', nodeIds.next()),
  createMenuNode('Menu Item 3.3', nodeIds.next()),
  createMenuNode('Menu Item 3.4', nodeIds.next()),
  createMenuNode('Menu Item 3.5', nodeIds.next()),
  createMenuNode('Menu Item 3.6', nodeIds.next()),
  createMenuNode('Menu Item 3.7', nodeIds.next()),
]);

const node4 = createMenuNode('Menu Item 4', nodeIds.next());

[node1, node2, node3, node4].forEach((node) => navUl.appendChild(node));
