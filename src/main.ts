import './assets/app.scss'
import Editex from './Editex';

import { useCaret } from './utils/caret'


const editor = new Editex('#editor', {
    onRenderComponent: () => { console.log('render') },
    onRenderBeforeComponent: () => { console.log('before render') },
    onRenderedComponent: () => { console.log('rendered') },
})

const button = document.getElementById('button')