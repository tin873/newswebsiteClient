import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Injectable } from '@angular/core';



@Injectable()
export class UtilityService {
    @BlockUI() blockUI!: NgBlockUI;


    constructor(private toastrService: ToastrService) {
    }


    public showErrorMessage(message: string): void {
        this.toastrService.error(message);
    }

    public showMessage(message: string): void {
        this.toastrService.success(message);
    }


    public showProcessing(blockUIBlock: NgBlockUI): void {
        // this.blockUI.start('Loading...');
        blockUIBlock.start('Loading...');
    }

    public cancelProcessing(blockUIBlock: NgBlockUI): void {
        // this.blockUI.stop();
        blockUIBlock.stop();
    }

}
