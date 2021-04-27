import { LightningElement } from 'lwc';
 
export default class Exmple extends LightningElement {
    items;
    headers;
    connectedCallback() {
        // 親からデータを渡す
        this.headers = [
            {name: 'row0', displayname: 'text1', type: 'TEXT'},
            {name: 'row1', displayname: 'text2', type: 'Text'},
            {name: 'row2', displayname: '日付', type: 'date'},
        ];
        this.items = [
            {row0: 'aa', row1: 'cc', row2: '2020/12/02'},
            {row0: '21', row1: '23', row2: '2020/09/08'},
        ];
    }
}