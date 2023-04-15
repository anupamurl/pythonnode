"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const node_html_parser_1 = require("node-html-parser");
const { htmlToText } = require('html-to-text');
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async getjoblist(message) {
        let info = [];
        var root = (0, node_html_parser_1.parse)(message.htmldata);
        await root.querySelectorAll('li').forEach((node) => {
            info.push({
                jobtitle: node.querySelector('.sr-only').innerText,
                cname: node.querySelector('.hidden-nested-link').innerText,
                clogo: node.querySelector('.search-entity-media').innerHTML,
                location: node.querySelector('.job-search-card__location').innerText,
                time: (node.querySelector('.job-search-card__listdate')) ? node.querySelector('.job-search-card__listdate').innerText : null,
                link: node.querySelector('.base-card__full-link').rawAttributes.href.split("?")[0]
            });
        });
        return info;
    }
    async getjobdetail(message) {
        let info = {};
        var root = (0, node_html_parser_1.parse)(message.htmldata);
        info['logoPath'] = root.querySelector('.jobs-unified-top-card .lazy-image').attributes['src'];
        info['jobname'] = root.querySelector('.jobs-unified-top-card__job-title').innerText;
        info['clink'] = `https://www.linkedin.com/${root.querySelector('.jobs-unified-top-card__company-name a').attributes['href'].split("/life")[0]}`;
        return info;
    }
    async getCompanyDetails(message) {
        let info = {};
        console.log('-----------------------------------');
        console.log(message.htmldata);
        console.log('-----------------------------------');
        var root = (0, node_html_parser_1.parse)(message.htmldata);
        info['aboutcompnay'] = (root.querySelector('.break-words.white-space-pre-wrap')) ? root.querySelector('.break-words.white-space-pre-wrap').innerText : "No Info";
        info['website'] = htmlToText(root.querySelector('.link-without-visited-state .link-without-visited-state').innerText);
        root.querySelectorAll("dl.overflow-hidden dt").forEach((node, index) => {
            info[htmlToText(node.rawText)] = root.querySelectorAll('dl.overflow-hidden dd')[index].innerText;
        });
        info['ceodata'] = [];
        root.querySelectorAll(".org-people-profile-card__profile-card-spacing").forEach((node, index) => {
            let obj = {
                "profileimg": node.querySelectorAll('.lazy-image.ember-view')[1].attributes['src']
            };
            info['ceodata'].push(obj);
        });
        return info;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)("/a"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getjoblist", null);
__decorate([
    (0, common_1.Post)("/b"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getjobdetail", null);
__decorate([
    (0, common_1.Post)("/d"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCompanyDetails", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map