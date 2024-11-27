import type Variant from "~/types/Variant";

export default interface Section {
    id: number;
    title: string;
    description: string;
    variants: Variant[];
}