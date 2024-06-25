import { BuilderComponent, Class } from "../types";
import classes from "../utils/classes";

export default class State {

    private          components: BuilderComponent[] = []
    private          selectionComponents: BuilderComponent[] = []
    private readonly importedComponents: Class[]
    private          focusComponentUid: string | null = null
    private          popupActive: boolean = false

    constructor(components: Class[]) {
        this.importedComponents = components
    }

    //getters
    public getComponents(): BuilderComponent[] {
        return this.components
    }

    public getSelectionComponents(): BuilderComponent[] {
        return this.selectionComponents
    }

    public getImportedComponents(): Class[] {
        return this.importedComponents
    }

    public getFocusComponent(): BuilderComponent | null {
        return this.components.find(c => c.uid === this.focusComponentUid) || null
    }

    public getFocusComponentIndex(): number {
        return this.components.findIndex(c => c.uid === this.focusComponentUid)
    }

    public getPopupActive(): boolean {
        return this.popupActive
    }


    // setters
    setComponent(component: BuilderComponent): void {
        this.focusComponentUid = component.uid
        this.components.push(component)
    }

    setFocusComponent(component: BuilderComponent): void {
        this.focusComponentUid = component.uid
    }

    setComponentAfter(component: BuilderComponent): void {
        const index = this.getFocusComponentIndex()
        if (index !== null) {
            this.components.splice(index + 1, 0, component)
            this.focusComponentUid = component.uid
        }
    }

    setComponentBefore(component: BuilderComponent): void {
        const index = this.getFocusComponentIndex()
        if (index !== null) {
            this.components.splice(index, 0, component)
        }
    }
}