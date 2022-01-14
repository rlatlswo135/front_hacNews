import {NewsFeed,NewsDetail}from '../types/index'


export class Api {
    ajax: XMLHttpRequest;
    url: string;
  
    constructor(url: string) {
      this.ajax = new XMLHttpRequest();
      this.url = url;
    }
  
    // getRequest<AjaxResponse>(): AjaxResponse {
    //   //비동기는 이해적인측면에서 어려우니 일단 동기적으로 (3번째인자 false)로 했지만 동기적으로짜면
    //   //해당 ajax response가 오기전까지 UI가 멈춰있어서 사용자입장에서 매우 불쾌한느낌을 준다 
    //   this.ajax.open('GET', this.url, false); 
    //   this.ajax.send();
  
    //   return JSON.parse(this.ajax.response);
    // }

    setNewUrl(newUrl:string):void{
      this.url = newUrl
    }

    // getRequest<AjaxResponse>(cb:(data:AjaxResponse) => void):void{
    //   fetch(this.url)
    //   .then(res => res.json()) //비동기적으로 json을 객체화
    //   .then(cb) 
    //   .catch(()=>{
    //     console.error('error')
    //   })
    // }

    //async와 기존 promise와의 차이

    async request<AjaxResponse>():Promise<AjaxResponse>{
      const response = await fetch(this.url) 

      return await response.json() as AjaxResponse
      //json()자체가 promise를 반환하기때문에 마찬가지로 await을 해줘야한다
    }
  }
  
export class NewsFeedApi extends Api {
    // getData(cb:(data:NewsFeed[])=>void): void {
    //   return this.getRequest<NewsFeed[]>(cb);
    // }

    //async와 기존 promise의 차이

    async getData():Promise<NewsFeed[]>{ //request함수는 비동기인데 그 비동기를 호출하는 함수역시 비동기여야한다 (그래서 async 여기에도)
      return this.request<NewsFeed[]>()
    }
  }
  
export class NewsDetailApi extends Api {
    // getData(cb:(data:NewsDetail) => void): void {
    //   return this.getRequest<NewsDetail>(cb);
    // }

    async getData():Promise<NewsDetail>{
      return this.request<NewsDetail>()
    }
  }

  //잔디 테스트