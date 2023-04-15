import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getjoblist(message: any): Promise<any[]>;
    getjobdetail(message: any): Promise<{}>;
    getCompanyDetails(message: any): Promise<{}>;
}
