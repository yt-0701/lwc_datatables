import { LightningElement, wire, track, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

const DATA_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    DATE: 'date' 
}
export default class Datatable extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    
    @api items;
    @api headers;
    @track convItems;
    @track convHeaders;
    @track emptyDataLine;

    // 最後尾行のインデックスを取得
    get lastLineIndex() {
        return this.convItems.length - 1;
    }

    // 削除可能か否か（フラグ）
    // ※最後の一行の場合、行追加が行えないため削除不可
    get isDeletableLine() {
        return this.lastLineIndex > 0;
    }

    // 画面での更新を反映した最新データを取得（入力値this.itemsと同形式）
    get newData() {
        let now = [];
        if (this.convItems.length < 1) return now;
        
        this.convItems.forEach(line => {
            if (line['dataset'].length < 1) return true;
            let tmp ={};
            line['dataset'].forEach(row => {
                tmp[row.name] = row.value;
            })
            now.push(tmp);
        });
        return now;
    }

    // 初期化処理
    connectedCallback() {
        // itemsの変換にheader情報を使うので、header->itemの順番
        this.convertHeaders();
        this.converItems();
    }

    // 削除ボタン押下時の処理
    handleOnClickDeleteButton(event) {
        let deleteLineIndex = Number(event.target.dataset.lidx);
        this.convItems.splice(deleteLineIndex, 1);
    }

    // 値変更時の処理
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

        console.log(this.newData);
    }

    // 新規行追加
    addNewLine(idx) {
        let newLine = {index: idx, dataset: []};
        
        // 空のデータセットの情報をコピーする
        // ※配列内にオブジェクトがネストしているのでDeepCopyする必要がある
        this.emptyDataset.forEach(row => {
            newLine.dataset.push({...row});
        });

        this.convItems.push(newLine);
    }

    // ユーザから入力されたヘッダー内容を変換する
    convertHeaders() {
        this.convHeaders = [];
        if (this.headers.length < 1) return;
        this.headers.forEach((header, index) => {
            let tmp = {};
            tmp['index'] = index;
            if (!header.displayname) return
            if (!header.name) return true;
            tmp['name'] = header.name;
            if (!header.displayname) return true;
            tmp['disp'] = header.displayname;
            if (!header.type || !(header.type.toUpperCase() in DATA_TYPE)) {
                tmp['type'] = DATA_TYPE.TEXT;
            } else {
                tmp['type'] = DATA_TYPE[header.type.toUpperCase()];
            }
            this.convHeaders.push(tmp);
        });
    }

    // ユーザから入力されたアイテムの内容を変換する
    converItems() {
        this.convItems = [];
        if (this.items.length < 1) return;

        this.items.forEach((item, index) => {
            let tmpItem = {};
            let dataset = [];
            tmpItem['index'] = index;
            this.convHeaders.forEach(header =>{
                let rowData = {};
                rowData['index'] = header.index;
                rowData['name'] = header.name;
                if(header.name in item) {
                    rowData['value'] = item[header.name];
                } else {
                    rowData['value'] = '';
                }
                rowData['type'] = header.type;
                dataset.push(rowData);
            });
            tmpItem['dataset'] = dataset;
            this.convItems.push(tmpItem);
        });

        // 新規行追加用に空行作成
        this.emptyDataset = [];
        this.convHeaders.forEach(header =>{
            let rowData = {};
            rowData['index'] = header.index;
            rowData['name'] = header.name;
            rowData['value'] = '';
            rowData['type'] = header.type;
            this.emptyDataset.push(rowData);
        });
    }
}