import {Class} from "../types/editex";
import { BuilderComponent } from "../types/builder";

export default class State {
    public components: BuilderComponent[] | [] = []

    get() {
        return {
            components: this.components
        }
    }

    createComponent(component: BuilderComponent) {
        // @ts-ignore
        return this.components?.push(component)
    }
}