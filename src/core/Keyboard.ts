import {KeyboardEventItem, KeyboardEventType} from "../types";

enum KeyboardEvents {
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
    private events: KeyboardEventItem[] = []

    constructor() {
        document.addEventListener('keydown', e => this.keydown(e))
        document.addEventListener('keyup', e => this.keyup(e))
    }

    private listen(name: KeyboardEvents, eventType: KeyboardEventType, callback: (e?: any) => any) {
        this.events.push({ name: name, event: eventType, f: callback })
    }

    private keydown(e: KeyboardEvent) { this.shortcuts(e, 'keydown') }
    private keyup(e: KeyboardEvent) { this.shortcuts(e, 'keyup') }

    private shortcuts(e: KeyboardEvent, event: KeyboardEventType) {
        // Shortcuts with Shift
        if (e.shiftKey) {
            if (e.key === 'ArrowUp') return this.callEvents(KeyboardEvents.ShiftArrowUp, event, e)
            if (e.key === 'ArrowDown') return this.callEvents(KeyboardEvents.ShiftArrowDown, event, e)
            if (e.key === 'ArrowLeft') return this.callEvents(KeyboardEvents.ShiftArrowLeft, event, e)
            if (e.key === 'ArrowRight') return this.callEvents(KeyboardEvents.ShiftArrowRight, event, e)
        }

        // Shortcuts with Ctrl
        if (e.ctrlKey) {
            if (e.key === 'ArrowUp') return this.callEvents(KeyboardEvents.CtrlArrowUp, event, e)
            if (e.key === 'ArrowDown') return this.callEvents(KeyboardEvents.CtrlArrowDown, event, e)
        }

        // Simple shortcuts
        if (e.key === 'ArrowUp') return this.callEvents(KeyboardEvents.ArrowUp, event, e)
        if (e.key === 'ArrowDown') return this.callEvents(KeyboardEvents.ArrowDown, event, e)
        if (e.key === 'ArrowLeft') return this.callEvents(KeyboardEvents.ArrowLeft, event, e)
        if (e.key === 'ArrowRight') return this.callEvents(KeyboardEvents.ArrowRight, event, e)
    }

    private callEvents(name: KeyboardEvents, event: KeyboardEventType, e?: Event) {
        this.events.forEach(item => {
            if (item.name === name && item.event === event) item.f(e)
        })
    }

    public arrowUp(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.ArrowUp, eventType, callback) }
    public arrowDown(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.ArrowDown, eventType, callback) }
    public shiftArrowUp(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.ShiftArrowUp, eventType, callback) }
    public shiftArrowDown(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.ShiftArrowDown, eventType, callback) }
    public arrowLeft(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.ArrowLeft, eventType, callback) }
    public arrowRight(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.ArrowRight, eventType, callback) }
    public shiftArrowLeft(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.ShiftArrowLeft, eventType, callback) }
    public shiftArrowRight(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.ShiftArrowRight, eventType, callback) }
    public ctrlArrowUp(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.CtrlArrowUp, eventType, callback) }
    public ctrlArrowDown(callback: (e: any) => any, eventType: KeyboardEventType = 'keydown') { this.listen(KeyboardEvents.CtrlArrowDown, eventType, callback) }
}