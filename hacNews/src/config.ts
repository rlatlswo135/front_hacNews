//이제 프로젝트규모가 커질수록. 코드드를 분산시켜서 기능별로 정렬하는데

//core = 공통으로쓰이는 코드 말그대로 코어.

//page = ui 를 책임지는. 그런느낌

//types = ts니까 해당 타입들을 지정해놓은 코드를 모아둔느낌의것.

//config = url같이 설정느낌의 코드를 모아둔느낌의것

export const NEWS_URL = 'https://api.hnpwa.com/v0/news/@currentPage.json';
export const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';