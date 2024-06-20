import './assets/app.scss'
import Editex from './Editex';
import {Text} from "./components";
import {Image} from "./components";

const editor = new Editex('#editor')

const button = document.getElementById('button')

button.addEventListener('click', () => {
    editor.save().then(() => {
        console.log('test')
    })
})