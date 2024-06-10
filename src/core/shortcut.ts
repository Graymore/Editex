export const useEnter = (element: Element | null, callback: () => any) => {
    if (element) {
        element.addEventListener('keyup', e => {
            e.preventDefault()
            let keyboard = <KeyboardEvent> e
            if (keyboard.key === '13') {
                callback()
            }
        })
    }
}