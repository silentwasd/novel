import type Variant from "~/types/Variant";
import type Action from "~/types/Action";

export default interface Section {
    id: number;
    title: string;
    description: string;
    variants: Variant[];
    startAction: Action;
}