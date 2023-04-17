import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { parse } from 'node-html-parser';
 
import { json } from 'stream/consumers';
const { htmlToText } = require('html-to-text');
import { join } from 'path';
import fs = require('fs');
import path = require('path');


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("/a")
  async getjoblist(@Body() message: any) {
    let info = [];
    var root = parse(message.htmldata);

    await root.querySelectorAll('li').forEach((node) => {
      info.push({
        jobtitle: node.querySelector('.sr-only').innerText,
        cname: node.querySelector('.hidden-nested-link').innerText,
        clogo: node.querySelector('.search-entity-media').innerHTML,
        location: node.querySelector('.job-search-card__location').innerText,
        time: (node.querySelector('.job-search-card__listdate')) ? node.querySelector('.job-search-card__listdate').innerText : null,
        link: node.querySelector('.base-card__full-link').rawAttributes.href.split("?")[0]
      })

    })


    return info;


  }

  @Post("/b")
  async getjobdetail(@Body() message: any) {
    let info = {

    }



    var root = parse(message.htmldata);
    info['logoPath'] = root.querySelector('.jobs-unified-top-card .lazy-image').attributes['src']
    info['jobname'] = root.querySelector('.jobs-unified-top-card__job-title').innerText
    info['clink'] = `https://www.linkedin.com/${root.querySelector('.jobs-unified-top-card__company-name a').attributes['href'].split("/life")[0]}`






    return info;

  }



  @Post("/d")

  async getCompanyDetails(@Body() message: any) {
    let info = {

    }
 

   
   
   let text =  fs.readFileSync(message.htmldata,       {encoding:'utf8', flag:'r'} );



    var root = parse(text);

    info['aboutcompnay'] = (root.querySelector('.break-words.white-space-pre-wrap'))? root.querySelector('.break-words.white-space-pre-wrap').innerText : "No Info"
    info['website'] = htmlToText(root.querySelector('.link-without-visited-state .link-without-visited-state').innerText)
    root.querySelectorAll("dl.overflow-hidden dt").forEach((node, index) => {
      info[htmlToText(node.rawText)] = root.querySelectorAll('dl.overflow-hidden dd')[index].innerText
    })

    info['alldetail'] = root.querySelector('dl.overflow-hidden').innerText

    info['ceodata'] = [];

    root.querySelectorAll(".org-people-profile-card__profile-card-spacing").forEach((node, index) => {

      let obj = {

        "profileimg": node.querySelectorAll('.lazy-image.ember-view')[1].attributes['src']

      }

      info['ceodata'].push(obj)



    })






    return info

  }



}
