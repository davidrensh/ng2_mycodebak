import { Directive, HostListener, Input, ElementRef, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
@Directive({
    selector: '[ceModel]'
})
export class PlHolderDirective implements OnInit, OnChanges {
    @Input('ceDefault') ceDefault: string;
    @Input('ceModel') ceModel: string;
    @Output('ceChange') ceChange = new EventEmitter();
    constructor(private elRef: ElementRef) { }

    @HostListener('keyup', ['$event'])
    onChange($event: any) {
        const value = this.elRef.nativeElement.innerText;
        if (value === '') {
            this.setPHolderColr(true);
        } else {
            this.setPHolderColr(false);
        }
        this.ceModel = value;
        this.ceChange.emit(value);
    }
    @HostListener('click', ['$event'])
    @HostListener('focus', ['$event'])
    onFocus($event: any) {
        const value = this.elRef.nativeElement.innerText;
        if (value === this.ceDefault) {
            this.elRef.nativeElement.innerText = '';
        }
        selectElementContents(this.elRef.nativeElement);
    }

    @HostListener('blur', ['$event'])
    onFocusout($event: any) {
        let value = this.elRef.nativeElement.innerText;
        value = value.replace(/(\r\n|\n|\r)/gm, '');
        if (value === '') {
            this.elRef.nativeElement.innerText = this.ceDefault;
        }
    }
    /*
     * Set the color based on actual or default placeholder color
     */
    setPHolderColr(isDefault: boolean) {
        if (this.elRef.nativeElement.hasAttribute('placeholder')) {
            this.elRef.nativeElement.style.color = (isDefault) ? '#C2C2C2' : '#000';
        }
    }
    ngOnInit() {
        if (this.ceModel) {
            this.elRef.nativeElement.innerText = this.ceModel;
        } else {
            this.elRef.nativeElement.innerText = this.ceDefault;
            this.setPHolderColr(true);
        }
    }
    /*
     * Below will be triggered if source is modified in aside section
     */
    ngOnChanges(changes: SimpleChanges) {
        const cv = changes['ceModel'].currentValue;
        if (this.elRef.nativeElement.innerText !== cv) {
            this.elRef.nativeElement.innerText = cv;
            if (cv === '') {
                this.elRef.nativeElement.innerText = this.ceDefault;
            }
        }
    }
}
