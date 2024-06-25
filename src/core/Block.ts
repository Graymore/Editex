import { classes } from "../utils";

export default class Block {
    public render() {
        const block = document.createElement('div')
        block.classList.add(classes.block)
        return block
    }
}