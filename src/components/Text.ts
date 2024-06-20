import classes from "../utils/classes";
import Component from "../shared/Component";

export default class Text extends Component {
    public text: string
    public title: string
    public icon: string

    constructor() {
        super()
        this.text = ''
        this.title = 'Text'
        this.icon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="100%"  height="100%"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-cube"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /></svg>'
    }

    render() {
        const div = document.createElement('div')
        div.classList.add(classes.component)
        div.classList.add(classes.componentText)
        div.contentEditable = 'true'
        div.addEventListener('input', () => this.text = div.innerHTML)

        return div
    }

    save() {
        return this.text
    }

    state() {
        return { text: this.text }
    }
}