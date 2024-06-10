import { Block } from '../';
import { ComponentType } from "../../types/component";

export default class Text extends Block implements ComponentType {
    constructor() {
        super();
    }

    render() {
        const root = document.createElement('div')
        root.classList.add('editor__text')
        root.contentEditable = 'true'

        return root
    }
}