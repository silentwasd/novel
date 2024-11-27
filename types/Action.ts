export default interface Action {
    type: 'go' | 'take_item';
    destination?: number;
    item?: number;
}