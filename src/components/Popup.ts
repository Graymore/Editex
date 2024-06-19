import classes from "../utils/classes";

export default class Popup {
    public popup: HTMLDivElement | null = null
    constructor() {}

    render() {
        const popup = document.createElement('div')
        popup.classList.add(classes.popup)
        this.popup = popup

        const popupWrapper = document.createElement('div')
        popupWrapper.classList.add(classes.popupWrapper)

        popup.appendChild(popupWrapper)
        document.body.appendChild(popup)
        console.log(popup)
    }

    show() {

    }

    hide() {

    }
}