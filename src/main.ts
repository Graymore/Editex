import './assets/app.scss'
import Editex from './Editex';
import {Text} from "./components";
import {Image} from "./components";

const editor = new Editex('#editor')

const builder = editor.useBuilder()

builder?.render(Text)
builder?.render(Image)

const button = document.getElementById('button')