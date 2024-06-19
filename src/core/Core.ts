import Handler from "./Handler";
import State from "./State";
import { useCaret } from "../utils";

export default class Core {
    public Handler: Handler = new Handler()
    public State: State = new State()
}