import { BuilderComponent, Class } from "../types";
import classes from "../utils/classes";

export default class State {
    public components: BuilderComponent[] = []
    public selectionComponents: BuilderComponent[] = []
    public importedComponents: Class[]
    public activeComponentUid: string | null = null
    public popupActive: boolean = false

    constructor(components: Class[]) {
        this.importedComponents = components
    }

    get() {
        return {
            components: this.components
        }
    }

    getActiveComponent() {
        return this.components.find(c => this.activeComponentUid === c.uid)
    }

    getPopupStatus() {
        return this.popupActive
    }

    insertComponent(component: BuilderComponent) {
        this.activeComponentUid = component.uid
        return this.components?.push(component)
    }

    insertAfterComponent(component: BuilderComponent) {
        const activeIndex = this.components.findIndex(c => c.uid === this.activeComponentUid)
        this.components.splice(activeIndex + 1, 0, component)
        this.activeComponentUid = component.uid
    }

    selectionAllComponents() {
        this.components.forEach(component => component.block?.classList.add(classes.block_selection))
        this.selectionComponents = this.components
    }

    selectionComponent(component: BuilderComponent) {
        component.block?.classList.add(classes.block_selection)
        this.selectionComponents.push(component)
    }

    selectionComponentClear(component: BuilderComponent) {
        const index = this.selectionComponents.findIndex(c => c.uid === component.uid)
        this.selectionComponents[index].block?.classList.remove(classes.block_selection)
        this.selectionComponents.slice(index, 1)
    }

    selectionToggleComponent(component: BuilderComponent) {
        const selected = this.selectionComponents.findIndex(c => c.uid === component.uid)
        if (selected === -1) {
            component.block?.classList.add(classes.block_selection)
            this.selectionComponents.push(component)
        } else {
            component.block?.classList.remove(classes.block_selection)
            this.selectionComponents.splice(selected, 1)
        }
    }

    selectionComponentClearAll() {
        this.selectionComponents.forEach(component => component.block?.classList.remove(classes.block_selection))
        this.selectionComponents = []
    }
}