import { LightningElement, wire, track, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class Datatable extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    
    @api items;
    @api headers;


}