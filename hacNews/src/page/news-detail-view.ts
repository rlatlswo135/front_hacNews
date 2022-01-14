import View from '../core/view'
import { NewsDetailApi } from '../core/api'
import {NewsDetail,NewsComment,NewsStore,NewsFeed} from '../types'
import {CONTENT_URL} from '../config'

export default class NewsDetailView extends View {
  private store:NewsStore;
    constructor(containerId: string , store:NewsStore) {
      let template = `
        <div class="bg-gray-600 min-h-screen pb-8">
          <div class="bg-white text-xl">
            <div class="mx-auto px-4">
              <div class="flex justify-between items-center py-6">
                <div class="flex justify-start">
                  <h1 class="font-extrabold">Hacker News</h1>
                </div>
                <div class="items-center justify-end">
                  <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                    <i class="fa fa-times"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
    
          <div class="h-full border rounded-xl bg-white m-6 p-4 ">
            <h2>{{__title__}}</h2>
            <div class="text-gray-400 h-20">
              {{__content__}}
            </div>
    
            {{__comments__}}
    
          </div>
        </div>
      `;
  
      super(containerId, template);
      this.store = store;
    }
  
    async render() {
      const id = location.hash.substr(7);
      const api = new NewsDetailApi(CONTENT_URL.replace('@id', id));
      // const newsDetail:any = api.getData((news:NewsDetail)=>{
      //   this.store.makeRead(Number(id))
      //   //true넣어주고 원래this.store.feed를 초기화하는게 아닌 코드를짯으니 읽은상태기억 ok
      //   this.setTemplateData('comments', this.makeComment(news.comments))
      //   this.setTemplateData('currentPage', String(this.store.currentPage));
      //   this.setTemplateData('title', news.title);
      //   this.setTemplateData('content', news.content);
      //   this.updateView();  
      // })

      const response:NewsDetail = await api.request()
      this.store.makeRead(Number(id))
      //true넣어주고 원래this.store.feed를 초기화하는게 아닌 코드를짯으니 읽은상태기억 ok
      this.setTemplateData('comments', this.makeComment(response.comments))
      this.setTemplateData('currentPage', String(this.store.currentPage));
      this.setTemplateData('title', response.title);
      this.setTemplateData('content', response.content);
  
      this.updateView();  
      
    }
  
    makeComment(comments: NewsComment[]): string {
      for(let i = 0; i < comments.length; i++) {
        const comment: NewsComment = comments[i];
    
        this.addHtml(`
          <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
            <div class="text-gray-400">
              <i class="fa fa-sort-up mr-2"></i>
              <strong>${comment.user}</strong> ${comment.time_ago}
            </div>
            <p class="text-gray-700">${comment.content}</p>
          </div>      
        `);
    
        if (comment.comments.length > 0) {
          this.addHtml(this.makeComment(comment.comments));
        }
      }
    
      return this.getHtml();
    }  
  }