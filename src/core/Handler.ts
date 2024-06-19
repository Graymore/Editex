export default class Handler {

    public on() {

    }

    public hook() {
        return {
            // @ts-ignore
            onRenderBeforeComponent() { window.editex.onRenderBeforeComponent() },
            // @ts-ignore
            onRenderComponent() { window.editex.onRenderComponent() },
            // @ts-ignore
            onRenderedComponent() { window.editex.onRenderedComponent() },
        }
    }

    public editor() {
        return {
            input(callback: () => any) { return callback() },
        }
    }
}