import type Action from "~/types/Action";

export default interface Variant {
    label: string;
    action: Action;
}