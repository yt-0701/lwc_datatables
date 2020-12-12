import { LightningElement, wire, track, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

const DATA_TYPE = {
    text: 'text',
    number: 'number',
    date: 'date' 
}
export default class Datatable extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    
    @api items;
    @api headers;
    @track convItems;
    @track convHeaders;
    @track emptyDataLine;

    get lastLineIndex() {
        return this.convItems.length - 1;
    }

    get isDeletableLine() {
        return this.lastLineIndex > 0;
    }

    connectedCallback() {
        this.convHeaders = [
            { index: 0, disp: 'ほげ0', name: 'hoge0', type: 'text' },
            { index: 1, disp: 'ほげ1', name: 'hoge1', type: 'text' },
            { index: 2, disp: 'ほげ2', name: 'hoge2', type: 'text' },
            { index: 3, disp: 'ほげ3', name: 'hoge3', type: 'text' },
            { index: 4, disp: 'ほげ4', name: 'hoge4', type: 'text' },
            { index: 5, disp: 'ほげ5', name: 'hoge5', type: 'text' },
        ];
        
        this.convItems = [
            {
                index: 0,
                dataset: [
                    { index :0, name :'hoge0', value :11, type :'text'},
                    { index :1, name :'hoge1', value :12, type :'text'},
                    { index :2, name :'hoge2', value :13, type :'text'},
                    { index :3, name :'hoge3', value :14, type :'text'},
                    { index :4, name :'hoge4', value :15, type :'text'},
                    { index :5, name :'hoge5', value :16, type :'text'}
                ]
            },
            {
                index: 1,
                dataset: [
                    { index :0, name :'hoge0', value :21, type :'text'},
                    { index :1, name :'hoge1', value :22, type :'text'},
                    { index :2, name :'hoge2', value :23, type :'text'},
                    { index :3, name :'hoge3', value :24, type :'text'},
                    { index :4, name :'hoge4', value :25, type :'text'},
                    { index :5, name :'hoge5', value :26, type :'text'}
                ]
            }
        ];
        this.emptyDataset = [
            { index :0, name :'hoge0', value: '', type :'text'},
            { index :1, name :'hoge1', value: '', type :'text'},
            { index :2, name :'hoge2', value: '', type :'text'},
            { index :3, name :'hoge3', value: '', type :'text'},
            { index :4, name :'hoge4', value: '', type :'text'},
            { index :5, name :'hoge5', value: '', type :'text'}
        ];
    }

    handleOnClickDeleteButton(event) {
        let deleteLineIndex = Number(event.target.dataset.lidx);
        this.convItems.splice(deleteLineIndex, 1);
    }

    handleValueChange(event) {
        let newValue = event.target.value;
        let lineIndex = Number(event.target.dataset.lidx);
        let valueIndex = Number(event.target.dataset.vidx);
        let oldValue = this.convItems[lineIndex].dataset[valueIndex].value;

        // 変更前後で値が変わらなければ何もしない
        if (oldValue == newValue) return;
        
        // 値を更新
        this.convItems[lineIndex].dataset[valueIndex].value = newValue;

        // 変更されたのが一番最後の行の場合は、新しい行を追加する
        if (this.lastLineIndex == lineIndex) {
            this.addNewLine(lineIndex + 1);
        }
    }

    addNewLine(idx) {
        let newLine = {index: idx, dataset: []};
        
        // 空のデータセットの情報をコピーする
        // ※配列内にオブジェクトがネストしているのでDeepCopyする必要がある
        this.emptyDataset.forEach(row => {
            newLine.dataset.push({...row});
        });

        this.convItems.push(newLine);
    }
}