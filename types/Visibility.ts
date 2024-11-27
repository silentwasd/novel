export default interface Visibility {
    type: 'always' | 'has_item';
    negative: boolean;
    item?: number;
}