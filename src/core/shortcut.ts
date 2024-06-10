export const useEnter = (element: Element | null, callback: () => any) => {
    if (element) {
        element.addEventListener('keydown', (e: Event) => {
            let keyboard = <KeyboardEvent> e
            if (keyboard.key === 'Enter' && !keyboard.shiftKey) {
                e.preventDefault()
                callback()
            }
        })
    }
}

export const useArrowUp = (element: Element | null, callback: () => any) => {
    if (element) {
        element.addEventListener('keydown', (e: Event) => {
            let keyboard = <KeyboardEvent> e
            if (keyboard.key === 'ArrowUp') {
                e.preventDefault()
                callback()
            }
        })
    }
}

export const useArrowDown = (element: Element | null, callback: () => any) => {
    if (element) {
        element.addEventListener('keydown', (e: Event) => {
            let keyboard = <KeyboardEvent> e
            if (keyboard.key === 'ArrowDown') {
                e.preventDefault()
                callback()
            }
        })
    }
}

export const useArrowRight = (element: Element | null, callback: () => any) => {
    if (element) {
        element.addEventListener('keydown', (e: Event) => {
            let keyboard = <KeyboardEvent> e
            if (keyboard.key === 'ArrowRight') {
                e.preventDefault()
                callback()
            }
        })
    }
}

export const useArrowLeft = (element: Element | null, callback: () => any) => {
    if (element) {
        element.addEventListener('keydown', (e: Event) => {
            let keyboard = <KeyboardEvent> e
            if (keyboard.key === 'ArrowLeft') {
                e.preventDefault()
                callback()
            }
        })
    }
}