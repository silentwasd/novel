export default interface Action {
    type: 'go' | 'take_item' | 'return_item';
    destination?: number;
    item?: number;
}