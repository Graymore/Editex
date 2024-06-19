export interface HandlerHooks {
    onRenderComponent: () => any
    onRenderBeforeComponent: () => any
    onRenderedComponent: () => any
}

export interface HandlerEvent {
    name: string,
    f: (args: any) => any
}