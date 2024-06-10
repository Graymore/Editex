import './assets/app.scss'
import Editex from './Editex';
import Text from "./components/Text";

const builded = () => {
    console.log('Editor is Builded!')
}
const rendered = () => {
    console.log('Editor is Rendered!')
}

const editor = new Editex('#editor', {
    onBuilded: builded,
    onRendered: rendered,
    autofocus: true
})