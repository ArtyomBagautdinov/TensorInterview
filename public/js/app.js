import { Header } from './components/header.js';
import { Main } from './components/main.js';
import {History} from './components/history.js';
import { Field } from './components/field/field.js';
import { initField } from './components/field/gameFunctions.js';
import { ComponentFactory } from './factory.js';
const root = document.getElementById('root');

const factory = new ComponentFactory();

const header = factory.create(Header, { title: "Крестики - нолики" })

const main = factory.create(Main)

const history = factory.create(History);

const field = factory.create(Field)

header.mount(root);
main.mount(root);

const mainPoint = document.getElementById('main');

field.mount(mainPoint);
history.mount(mainPoint);

initField();

