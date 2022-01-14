import {NewsFeed,NewsStore} from './types'


//결국 store는 window객체의 전역상태로있엇는데 너무 안정성이 낮기때문에 별도의 class로 store를 조작한는걸 만들어서 모듈화
export default class Store implements NewsStore{
    //implement = 구현하다 즉 NewsStore 타입으로 구현한 클래스라는걸 명시해주는느낌
    private feeds:NewsFeed[]
    private _currentPage:number;

    constructor(){
        this.feeds = [];
        this._currentPage = 1;
    }
    //내부에선 함수로 동작하지만 외부에선 속성으로 접근할수있게해주는

    get currentPage(){
        return this._currentPage //외부에선 속성으로 접근하니까 이름이 겹치면안되니 보통 내부속성에 _를 많이붙인다 => 속성하나를 다루는데 메소드를 만드는것도 복잡하고하니
    }

    set currentPage(page:number){
        if(page<0) return;
        this._currentPage = page
    }

    get nextPage():number{ //setter가 없으면 readonly같은 느낌일거다 (set이안되니)
        return this._currentPage < 10 ? this._currentPage + 1 : 10
    } 
    
    get prevPage():number{
        return this._currentPage > 1  ?  this._currentPage - 1 : 1
    }
    
    get numberOfFeed():number{
        return this.feeds.length
    } 

    get hasFeeds():boolean{
        return this.feeds.length > 0
    }

    getAllFeeds() : NewsFeed[]{
        return this.feeds;
    }

    getFeed(position:number){
        return this.feeds[position];
    }

    setFeeds(feeds:NewsFeed[]):void{
        this.feeds = feeds.map(feed => ({
            ...feed,
            read:false
        }))
    }

    makeRead(id:number):void{
       const feed = this.feeds.find((feed:NewsFeed) => feed.id === id);

       if(feed){
           feed.read = true
       }
    }

}