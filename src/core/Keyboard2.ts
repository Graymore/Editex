enum KeyboardEvents {
    Enter = 'Enter',
    ShiftEnter = 'ShiftEnter',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    ShiftArrowUp = 'ShiftArrowUp',
    ShiftArrowDown = 'ShiftArrowDown',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    ShiftArrowRight = 'ShiftArrowRight',
    ShiftArrowLeft = 'ShiftArrowLeft',
    CtrlArrowUp = 'CtrlArrowUp',
    CtrlArrowDown = 'CtrlArrowDown',
}

export default class Keyboard {
    private element: Element | null = null

    bind(element: Element) {
        this.element = element
    }

    enter() {

    }
}