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
    private bind(element: Element, callback: (e?: any) => any, eventType: KeyboardEvents) {
        element.addEventListener('keydown', (ev) => {
            if (this.shortcuts((ev as KeyboardEvent)) === eventType) return callback(ev)
        })
    }

    private shortcuts(e: KeyboardEvent) {
        // Shortcuts with Shift
        if (e.shiftKey) {
            if (e.key === 'ArrowUp') return KeyboardEvents.ShiftArrowUp
            if (e.key === 'ArrowDown') return KeyboardEvents.ShiftArrowDown
            if (e.key === 'ArrowLeft') return KeyboardEvents.ShiftArrowLeft
            if (e.key === 'ArrowRight') return KeyboardEvents.ShiftArrowRight
            if (e.key === 'Enter') return KeyboardEvents.ShiftEnter
        }

        // Shortcuts with Ctrl
        if (e.ctrlKey) {
            if (e.key === 'ArrowUp') return KeyboardEvents.CtrlArrowUp
            if (e.key === 'ArrowDown') return KeyboardEvents.CtrlArrowDown
        }

        // Simple shortcuts
        if (e.key === 'ArrowUp') return KeyboardEvents.ArrowUp
        if (e.key === 'ArrowDown') return KeyboardEvents.ArrowDown
        if (e.key === 'ArrowLeft') return KeyboardEvents.ArrowLeft
        if (e.key === 'ArrowRight') return KeyboardEvents.ArrowRight
        if (e.key === 'Enter') return KeyboardEvents.Enter
    }

    public arrowUp(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ArrowUp) }
    public arrowDown(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ArrowDown) }
    public shiftArrowUp(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ShiftArrowUp) }
    public shiftArrowDown(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ShiftArrowDown) }
    public arrowLeft(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ArrowLeft) }
    public arrowRight(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ArrowRight) }
    public shiftArrowLeft(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ShiftArrowLeft) }
    public shiftArrowRight(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ShiftArrowRight) }
    public ctrlArrowUp(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.CtrlArrowUp) }
    public ctrlArrowDown(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.CtrlArrowDown) }
    public enter(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.Enter) }
    public shiftEnter(element: Element, callback: (e: any) => any) { this.bind(element, callback, KeyboardEvents.ShiftEnter) }
}