import './assets/app.scss'
import Editex from './Editex';



const output = document.getElementById('output')
const editor = new Editex('#editor')

document.getElementById('button').addEventListener('click', () => {
    editor.save().then(r => console.log(r))
})