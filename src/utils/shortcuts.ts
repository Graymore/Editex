export function bindOfBlock(element: HTMLElement) {
    return {
        enter(callback: (e: KeyboardEvent) => any) {
            element.addEventListener('keydown', e => {
                if (!e.shiftKey && e.key === 'Enter') return callback(e)
            })
        },
        arrowUp(callback: (e: KeyboardEvent) => any) {
            element.addEventListener('keydown', e => {
                if (e.key === 'ArrowUp') return callback(e)
            })
        },
        arrowDown(callback: (e: KeyboardEvent) => any) {
            element.addEventListener('keydown', e => {
                if (e.key === 'ArrowDown') return callback(e)
            })
        },
        arrowLeft(callback: (e: KeyboardEvent) => any) {
            element.addEventListener('keydown', e => {
                if (e.key === 'ArrowLeft') return callback(e)
            })
        },
        arrowRight(callback: (e: KeyboardEvent) => any) {
            element.addEventListener('keydown', e => {
                if (e.key === 'ArrowRight') return callback(e)
            })
        },
    }
}