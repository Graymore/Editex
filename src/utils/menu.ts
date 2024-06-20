export function useMenu() {
    return {
        findCommand(str: string, command: string = '/') {
            const index = str.lastIndexOf(command)
            let result = false

            if (index > -1) {
                const prevSymbol = str[index - 1]
                const nextSymbol = str[index + 1]
                const line = str.slice(index, str.length)

                result = !prevSymbol || prevSymbol.trim() === ''
                if (nextSymbol && nextSymbol.trim() === '') result = false
                if (line.indexOf(' ') !== -1 || line[line.length - 1].trim() === '') result = false

            } else {
                return false
            }

            return result
        }
    }
}