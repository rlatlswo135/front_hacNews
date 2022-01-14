import View from '../core/view'
import {NewsFeed,NewsStore} from '../types'
import {NewsFeedApi} from '../core/api'
import {NEWS_URL} from '../config'

export default class NewsFeedView extends View {
    private api: NewsFeedApi;
    private store:NewsStore;
    
    constructor(containerId: string , store:NewsStore) {
      let template: string = `
        <div class="bg-gray-600 min-h-screen">
          <div class="bg-white text-xl">
            <div class="mx-auto px-4">
              <div class="flex justify-between items-center py-6">
                <div class="flex justify-start">
                  <h1 class="font-extrabold">Hacker News</h1>
                </div>
                <div class="items-center justify-end">
                  <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                    Previous
                  </a>
                  <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                    Next
                  </a>
                </div>
              </div> 
            </div>
          </div>
          <div class="p-4 text-2xl text-gray-700">
            {{__news_feed__}}        
          </div>
        </div>
      `;
  
      super(containerId, template);
      this.store = store
  
      this.api = new NewsFeedApi(NEWS_URL.replace('@currentPage',String(this.store.currentPage)));
    
    }
    
    //render함수가 async함수를 호출하니까(this.api.request) 마찬가지로 비동기함수여야해서 async로 감싸줘야한다.
    //비록 render함수가 promise를 리턴하진않지만 그래도 async함수기때문에 promise로 감싸는대신 void로 해주면된다.
    //promise가 충분히 학습이 되어야할듯.
    async render(): Promise<void> {
      const current = location.hash.substr(7)
      let newsFeedArray:NewsFeed[] = []
      //요청시마다 원래페이지또받아오니까 에바네 => 뭔가안되서 로직추가해서 기능되게함
      if (!this.store.hasFeeds) {
        console.log('맨처음')
        //비엇을때 api받은걸 가지고 setFeed

        // this.api.getData((feeds:NewsFeed[])=>{
        //   this.store.setFeeds(feeds)
        //   this.renderView();
        // })

        //위 = promise 아래 = async활용 후    
        newsFeedArray = await this.api.request()
        this.store.setFeeds(newsFeedArray)
      }
      if(current.length !== 0 && (this.store.currentPage !== Number(current))){
        this.store.currentPage = Number(current)
        this.api.setNewUrl(NEWS_URL.replace('@currentPage',String(this.store.currentPage)))

        // this.api.getData((feeds:NewsFeed[])=>{
        //   this.store.setFeeds(feeds)
        //   this.renderView()
        // }
        newsFeedArray = await this.api.request()
        this.store.setFeeds(newsFeedArray)
        // 코드가 비동기로 바뀌엇으니까 렌더되는코드와 비동기코드가 함께잇지않다면 데이터를 받아오기전에 렌더가되서 없을거다 데이터가
        // 이렇게 비동기코드가 동기족으로 짜졋으니 밑에 renderView를 따로둘필요는 없고 위에 데이터를 넣는부분만 분기해주고.
        // renderView쪽 코드가 실행되게끔 되면 좋겟다.
      }
      for(let news of this.store.getAllFeeds()) {
        const { id, title, comments_count, user, points, time_ago, read } = news
        this.addHtml(`
          <div class="p-6 ${read ? 'bg-gray-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
            <div class="flex">
              <div class="flex-auto">
                <a href="#/show/${id}">${title}</a>  
              </div>
              <div class="text-center text-sm">
                <div class="w-10 text-black bg-green -300 rounded-lg px-0 py-2">${comments_count}</div>
              </div>
            </div>
            <div class="flex mt-3">
              <div class="grid grid-cols-3 text-sm text-gray-500">
                <div><i class="fas fa-user mr-1"></i>${user}</div>
                <div><i class="fas fa-heart mr-1"></i>${points}</div>
                <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
              </div>  
            </div>
          </div>    
        `);
    }
    
      this.setTemplateData('news_feed', this.getHtml());
      this.setTemplateData('prev_page', String(this.store.prevPage));
      this.setTemplateData('next_page', String(this.store.nextPage));
      this.updateView(); 
    }
  }