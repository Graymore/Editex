import {Class} from "../types/editex";
import { BuilderComponent } from "../types/builder";

export default class State {
    public components: BuilderComponent[] = []
    public activeComponentUid: string | null = null

    get() {
        return {
            components: this.components
        }
    }

    getActiveComponent() {
        return this.components.find(c => this.activeComponentUid === c.uid)
    }

    insertComponent(component: BuilderComponent) {
        this.activeComponentUid = component.uid
        return this.components?.push(component)
    }

    insertAfterComponent(component: BuilderComponent) {
        const activeIndex = this.components.findIndex(c => c.uid === this.activeComponentUid)
        this.components.splice(activeIndex + 1, 0, component)
        this.activeComponentUid = component.uid

        console.log(this.components)
    }
}