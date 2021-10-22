import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ToasterPosition {
    topRight = 'toast-top-right',
    topLeft = 'toast-top-left',
    topCenter = 'toast-top-center',
    bottomRight = 'toast-bottom-right',
    bottomLeft = 'toast-bottom-left',
    bottomCenter = 'toast-bottom-center',
}


@Injectable()
export class DataService {
    private messageSource = new BehaviorSubject('message from service');
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(msg: string) {
        debugger
        this.messageSource.next(msg);
    }
}

@Injectable()
export class UtilityService {
    @BlockUI() blockUI!: NgBlockUI;

    public errorCodeDefineMessage = [
        { key: 'EMS_ERROR_MESSAGE', value: '{EMS_ERROR_MESSAGE}' },
        { key: 'Unauthorized', value: 'Lỗi xác thực tài khoản' },
        { key: 'UnknowError', value: 'Lỗi không xác định' },
        { key: 'NOT_FOUND', value: 'Không tìm thấy dữ liệu' },
        { key: 'NotFound', value: 'Không tìm thấy dữ liệu' },
        { key: 'EXIST', value: 'Đã tồn tại dữ liệu' },
    ];

    constructor(private toastrService: ToastrService) {
    }

    public showError(errorCode: string, parameters: any = null): void {
        let message = 'Lỗi không xác định';
        const err = this.errorCodeDefineMessage.filter(obj =>
            Object.values(obj).findIndex(g => g == errorCode) > -1
        );

        if (err != null && err.length > 0) {
            message = err[0].value;
        } else if (errorCode != null || errorCode != '') {
            message = errorCode;
        }

        if (parameters) {
            // tslint:disable-next-line: forin
            for (const key in parameters) {
                message = message.replace('{' + key + '}', parameters[key]);
            }
        }

        this.toastrService.error(message);
    }

    public showErrorMessage(message: string): void {
        this.toastrService.error(message);
    }

    public showMessage(message: string): void {
        this.toastrService.success(message);
    }

    public showWarning(message: string) {
        const msg = this.errorCodeDefineMessage.filter(obj =>
            Object.values(obj).findIndex(g => g == message) > -1
        );

        if (msg != null && msg.length > 0) {
            message = msg[0].value;
        } else if (message != null || message != '') {
            message = message;
        }

        this.toastrService.warning(message);
    }

    public showProcessing(blockUIBlock: NgBlockUI): void {
        // this.blockUI.start('Loading...');
        blockUIBlock.start('Loading...');
    }

    public cancelProcessing(blockUIBlock: NgBlockUI): void {
        // this.blockUI.stop();
        blockUIBlock.stop();
    }

    public showMessageWithPosition(message: string, positionClass: ToasterPosition, timeOut = 1000) {
        this.toastrService.success(message, "", { positionClass, timeOut: timeOut });
    }

    public showWarningWithPosition(message: string, positionClass: ToasterPosition, timeOut = 1000) {
        this.toastrService.warning(message, "", { positionClass, timeOut: timeOut });
    }

    public showErrorWithPosition(message: string, positionClass: ToasterPosition, timeOut = 1000) {
        this.toastrService.error(message, "", { positionClass, timeOut: timeOut });
    }
}
