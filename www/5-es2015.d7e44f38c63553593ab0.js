(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{eDSp:function(l,n,i){"use strict";i.r(n);var t=i("8Y7J"),u=i("mrSG"),e=i("S3Px"),o=i("2Rin"),r=i("ZZ/e");class s{constructor(l,n,i){this.productsService=l,this.utilService=n,this.navCtrl=i,this.last=!1,this.page=1}ngOnInit(){return u.b(this,void 0,void 0,(function*(){const l=yield this.utilService.showLoading();this.getProductList("",1).subscribe(n=>u.b(this,void 0,void 0,(function*(){l.dismiss(),0===n.code&&(this.products=n.data)})),l=>{this.errorMessage=l,this.utilService.showToast(l)})}))}ionViewDidEnter(){this.content.scrollToTop(0)}getProductList(l,n){return this.productsService.getProductList(l,n)}goToDetail(l){this.navCtrl.navigateForward(["/detail"],{queryParams:{id:l._id}})}search(){this.getProductList(this.keywords,1).subscribe(l=>{0===l.code&&(this.products=l.data)},l=>{this.errorMessage=l,console.log(l)})}doRefresh(l){return u.b(this,void 0,void 0,(function*(){this.page=1;const n=yield this.utilService.showLoading();this.getProductList("",this.page).subscribe(i=>{0===i.code&&(this.last=i.isLast,this.products=i.data,this.infiniteScroll&&(this.infiniteScroll.target.disabled=!1),l.target.complete()),n.dismiss()},l=>{this.errorMessage=l,this.utilService.showToast(l)})}))}doInfinite(l){return u.b(this,void 0,void 0,(function*(){this.page++,this.infiniteScroll=l;const n=yield this.utilService.showLoading();this.getProductList("",this.page).subscribe(i=>{0===i.code&&(this.last=i.isLast,this.products=this.products.concat(i.data),this.products.concat(i.data),l.target.complete(),this.last&&(l.target.disabled=!0)),n.dismiss()},l=>{this.errorMessage=l,this.utilService.showToast(l)})}))}}class c{}var a=i("pMnS"),b=i("oBZk"),d=i("s7LF"),h=i("SVse"),p=t.pb({encapsulation:0,styles:[[".item-body[_ngcontent-%COMP%]{box-shadow:none;--background:#fff;margin:0;border-radius:3px}.name[_ngcontent-%COMP%]{height:52px;overflow:hidden;color:#555;padding:10px;line-height:20px;margin-bottom:15px}.price[_ngcontent-%COMP%]{padding:0 10px}.old-price[_ngcontent-%COMP%]{padding:0 10px;display:block;margin-bottom:10px;line-height:25px;color:#acacac}"]],data:{}});function g(l){return t.Lb(0,[(l()(),t.rb(0,0,null,null,13,"ion-col",[["class","list-item"],["size","6"]],null,null,null,b.T,b.h)),t.qb(1,49152,null,0,r.u,[t.h,t.k,t.x],{size:[0,"size"]},null),(l()(),t.rb(2,0,null,0,11,"ion-card",[["class","item-body"]],null,[[null,"click"]],(function(l,n,i){var t=!0;return"click"===n&&(t=!1!==l.component.goToDetail(l.context.$implicit)&&t),t}),b.S,b.g)),t.qb(3,49152,null,0,r.n,[t.h,t.k,t.x],null,null),(l()(),t.rb(4,0,null,0,0,"img",[["alt",""],["height","147"],["width","100%"]],[[8,"src",4]],null,null,null,null)),(l()(),t.rb(5,0,null,0,1,"p",[["class","name"]],null,null,null,null,null)),(l()(),t.Jb(6,null,["",""])),(l()(),t.rb(7,0,null,0,4,"p",[["class","price"]],null,null,null,null,null)),(l()(),t.Jb(-1,null,["\uffe5"])),(l()(),t.rb(9,0,null,null,1,"span",[["class","red"]],null,null,null,null,null)),(l()(),t.Jb(10,null,["",""])),(l()(),t.Jb(11,null,["/",""])),(l()(),t.rb(12,0,null,0,1,"del",[["class","old-price"]],null,null,null,null,null)),(l()(),t.Jb(13,null,["\uffe5","/",""]))],(function(l,n){l(n,1,0,"6")}),(function(l,n){l(n,4,0,t.vb(1,"",null==n.context.$implicit?null:n.context.$implicit.banner.path,"")),l(n,6,0,null==n.context.$implicit?null:n.context.$implicit.name),l(n,10,0,null==n.context.$implicit?null:n.context.$implicit.price),l(n,11,0,null==n.context.$implicit?null:n.context.$implicit.unit),l(n,13,0,null==n.context.$implicit?null:n.context.$implicit.origin_price,null==n.context.$implicit?null:n.context.$implicit.origin_price_unit)}))}function x(l){return t.Lb(0,[t.Hb(671088640,1,{content:0}),(l()(),t.rb(1,0,null,null,10,"ion-header",[],null,null,null,b.Z,b.n)),t.qb(2,49152,null,0,r.C,[t.h,t.k,t.x],null,null),(l()(),t.rb(3,0,null,0,8,"ion-toolbar",[["class","toolbar"]],null,null,null,b.xb,b.L)),t.qb(4,49152,null,0,r.Db,[t.h,t.k,t.x],null,null),(l()(),t.rb(5,0,null,0,6,"ion-searchbar",[["placeholder","\u8f93\u5165\u4f60\u8981\u641c\u7d22\u7684\u5546\u54c1"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,i){var u=!0,e=l.component;return"ionBlur"===n&&(u=!1!==t.Db(l,6)._handleBlurEvent(i.target)&&u),"ionChange"===n&&(u=!1!==t.Db(l,6)._handleInputEvent(i.target)&&u),"input"===n&&(u=!1!==e.search()&&u),"ngModelChange"===n&&(u=!1!==(e.keywords=i)&&u),u}),b.kb,b.y)),t.qb(6,16384,null,0,r.Ob,[t.k],null,null),t.Gb(1024,null,d.h,(function(l){return[l]}),[r.Ob]),t.qb(8,671744,null,0,d.l,[[8,null],[8,null],[8,null],[6,d.h]],{model:[0,"model"]},{update:"ngModelChange"}),t.Gb(2048,null,d.i,null,[d.l]),t.qb(10,16384,null,0,d.j,[[4,d.i]],null,null),t.qb(11,49152,null,0,r.lb,[t.h,t.k,t.x],{placeholder:[0,"placeholder"]},null),(l()(),t.rb(12,0,null,null,15,"ion-content",[["class","content"]],null,null,null,b.U,b.i)),t.qb(13,49152,[[1,4]],0,r.v,[t.h,t.k,t.x],null,null),(l()(),t.rb(14,0,null,0,3,"ion-refresher",[["pullFactor","0.5"],["slot","fixed"]],null,[[null,"ionRefresh"]],(function(l,n,i){var t=!0;return"ionRefresh"===n&&(t=!1!==l.component.doRefresh(i)&&t),t}),b.ib,b.v)),t.qb(15,49152,null,0,r.eb,[t.h,t.k,t.x],{pullFactor:[0,"pullFactor"]},null),(l()(),t.rb(16,0,null,0,1,"ion-refresher-content",[],null,null,null,b.hb,b.w)),t.qb(17,49152,null,0,r.fb,[t.h,t.k,t.x],null,null),(l()(),t.rb(18,0,null,0,5,"ion-grid",[],null,null,null,b.Y,b.m)),t.qb(19,49152,null,0,r.B,[t.h,t.k,t.x],null,null),(l()(),t.rb(20,0,null,0,3,"ion-row",[],null,null,null,b.jb,b.x)),t.qb(21,49152,null,0,r.kb,[t.h,t.k,t.x],null,null),(l()(),t.gb(16777216,null,0,1,null,g)),t.qb(23,278528,null,0,h.i,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.rb(24,0,null,0,3,"ion-infinite-scroll",[["threshold","100px"]],null,[[null,"ionInfinite"]],(function(l,n,i){var t=!0;return"ionInfinite"===n&&(t=!1!==l.component.doInfinite(i)&&t),t}),b.cb,b.p)),t.qb(25,49152,null,0,r.F,[t.h,t.k,t.x],{threshold:[0,"threshold"]},null),(l()(),t.rb(26,0,null,0,1,"ion-infinite-scroll-content",[["loadingSpinner","bubbles"],["loadingText","\u52a0\u8f7d\u66f4\u591a\u4e2d..."]],null,null,null,b.bb,b.q)),t.qb(27,49152,null,0,r.G,[t.h,t.k,t.x],{loadingSpinner:[0,"loadingSpinner"],loadingText:[1,"loadingText"]},null)],(function(l,n){var i=n.component;l(n,8,0,i.keywords),l(n,11,0,"\u8f93\u5165\u4f60\u8981\u641c\u7d22\u7684\u5546\u54c1"),l(n,15,0,"0.5"),l(n,23,0,i.products),l(n,25,0,"100px"),l(n,27,0,"bubbles","\u52a0\u8f7d\u66f4\u591a\u4e2d...")}),(function(l,n){l(n,5,0,t.Db(n,10).ngClassUntouched,t.Db(n,10).ngClassTouched,t.Db(n,10).ngClassPristine,t.Db(n,10).ngClassDirty,t.Db(n,10).ngClassValid,t.Db(n,10).ngClassInvalid,t.Db(n,10).ngClassPending)}))}function f(l){return t.Lb(0,[(l()(),t.rb(0,0,null,null,1,"app-mall",[],null,null,null,x,p)),t.qb(1,114688,null,0,s,[e.a,o.a,r.Jb],null,null)],(function(l,n){l(n,1,0)}),null)}var m=t.nb("app-mall",s,f,{},{},[]),v=i("iInd");i.d(n,"MallPageModuleNgFactory",(function(){return k}));var k=t.ob(c,[],(function(l){return t.Ab([t.Bb(512,t.j,t.Z,[[8,[a.a,m]],[3,t.j],t.v]),t.Bb(4608,h.l,h.k,[t.s,[2,h.r]]),t.Bb(4608,d.p,d.p,[]),t.Bb(4608,r.b,r.b,[t.x,t.g]),t.Bb(4608,r.Ib,r.Ib,[r.b,t.j,t.p]),t.Bb(4608,r.Lb,r.Lb,[r.b,t.j,t.p]),t.Bb(1073742336,h.b,h.b,[]),t.Bb(1073742336,d.o,d.o,[]),t.Bb(1073742336,d.e,d.e,[]),t.Bb(1073742336,r.Fb,r.Fb,[]),t.Bb(1073742336,v.o,v.o,[[2,v.t],[2,v.m]]),t.Bb(1073742336,c,c,[]),t.Bb(1024,v.k,(function(){return[[{path:"",component:s}]]}),[])])}))}}]);