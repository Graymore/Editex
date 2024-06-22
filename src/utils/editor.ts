export function useEditor() {
    function parseSyntaxPhrase(value: string, phrase: string = '/') {
        const index = value.lastIndexOf(phrase)
        let result = false

        if (index > -1) {
            const prevSymbol = value[index - 1]
            const nextSymbol = value[index + 1]
            const line = value.slice(index, value.length)

            result = !prevSymbol || prevSymbol.trim() === ''
            if (nextSymbol && nextSymbol.trim() === '') result = false
            if (line.indexOf(' ') !== -1 || line[line.length - 1].trim() === '') result = false

        } else {
            return false
        }

        return result
    }

    function editableContains(element: Element) {
        return element.querySelector('[contenteditable=true]') !== null
    }

    function genUID() {
        return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36)
    }

    return {
        parseSyntaxPhrase,
        editableContains,
        genUID,
    }
}