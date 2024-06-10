import { Component } from './'
import { Caret } from "./";
export default class Block extends Component {
    public _uid: string
    public _caret: Caret | null

    constructor() {
        super();
        this._uid = Math.floor(Date.now() / 10 + Math.random()).toString(36)
        this._caret = null
    }

    type(): string {
        return 'block'
    }

    render() {
        const block = document.createElement('div')
        block.classList.add('editor__block')
        return block
    }
}