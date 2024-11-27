export default interface Action {
    type: 'nothing' | 'go' | 'take_item' | 'return_item';
    destination?: number;
    item?: number;
}