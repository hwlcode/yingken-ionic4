import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const EXE_PRODUCTS_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RecommendedComponent),
    multi: true
};

@Component({
    selector: 'app-recommended',
    templateUrl: './recommended.component.html',
    styleUrls: ['./recommended.component.scss'],
    providers: [EXE_PRODUCTS_VALUE_ACCESSOR]
})
export class RecommendedComponent implements ControlValueAccessor {
    @Input() _products: any;
    @Output() productClick: EventEmitter<string> = new EventEmitter<string>();

    // 向外发送通知事件，告诉组件发生变化了
    propagateChange = (_: any) => {
    };

    get products() {
        return this._products;
    }

    set products(value: number) {
        this._products = value;
        this.propagateChange(this._products);
    }

    constructor() {
    }

    goToDetail(product) {
        this.productClick.emit(product._id);
    }

    // ControlValueAccessor 接口writeValue，覆盖默认值
    writeValue(value: any) {
        if (value) {
            this._products = value;
        }
    }

    // ControlValueAccessor registerOnChange，通知外部组件发生变化了
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // registerOnTouched: 当组件收到touched事件后，调用的函数
    registerOnTouched(fn: any) {
        // 不打算使用touch事件
    }


}
