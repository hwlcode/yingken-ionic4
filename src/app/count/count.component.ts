import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

// 实现组件之后，要进行注册才可以使用
// 第一步
export const EXE_COUNTER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CountComponent),
    multi: true
};

@Component({
    selector: 'app-count',
    templateUrl: './count.component.html',
    styleUrls: ['./count.component.scss'],
    providers: [EXE_COUNTER_VALUE_ACCESSOR] // 第二步
})
export class CountComponent implements ControlValueAccessor {
    @Input() myCount = 0;  // 用于接收ngModule 传进来的数据
    // 向外发送通知事件，告诉组件发生变化了
    propagateChange = (_: any) => {
    };

    get count() {
        return this.myCount;
    }

    set count(value: number) {
        this.myCount = value;
        this.propagateChange(this.myCount);
    }


    constructor() {
    }

    increment() {
        this.count++;
    }

    decrement() {
        if (this.count > 0) {
            this.count--;
        }
    }

    // ControlValueAccessor 接口writeValue，覆盖默认值
    writeValue(value: any) {
        if (value) {
            this.myCount = value;
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
