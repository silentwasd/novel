import type Action from "~/types/Action";
import type Visibility from "~/types/Visibility";

export default interface Variant {
    label: string;
    action: Action;
    visibility: Visibility;
}