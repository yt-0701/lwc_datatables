import { LightningElement } from 'lwc';
 
export default class Exmple extends LightningElement {
    items;
    headers;
    connectedCallback() {
        // 親からデータを渡す
        this.headers = [
            {name: 'row0', displayname: 'テキスト1', type: 'TEXT'},
            {name: 'row1', displayname: 'テキスト2', type: 'Text'},
            {name: 'row2', displayname: 'テキスト3', type: 'TEXT'},
            {name: 'row3', displayname: '数字', type: 'Number'},
            {name: 'row4', displayname: '日付', type: 'date'},
            {name: 'row5', displayname: 'テキスト4', type: 'TEXT'}
        ];
        this.items = [
            {row0: 'aa', row1: 'bb', row2: 'cc', row3: 14, row4: '2020/12/02', row5: 'dd'},
            {row0: '21', row1: '22', row2: '23', row3: 24, row4: '2020/09/08', row5: '26'},
        ];
    }
}