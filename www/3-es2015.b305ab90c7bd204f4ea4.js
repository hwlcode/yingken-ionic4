(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{mE0X:function(l,n,u){"use strict";u.r(n);var t=u("8Y7J"),i=u("mrSG"),e=u("S3Px"),o=u("ZZ/e"),r=u("34Y5"),s=u("2Rin"),c=u("kVqo");class a{constructor(l,n,u,t,e,o,s,c){this.productsService=l,this.storage=n,this.modalCtrl=u,this.navCtrl=t,this.events=e,this.utilService=o,this.orderService=s,this.router=c,this.cart=[],this.sum=0,this.storage.get("user").then(l=>i.b(this,void 0,void 0,(function*(){null==l?((yield this.modalCtrl.create({component:r.a})).present(),this.navCtrl.navigateRoot("/tabs/index")):this.userId=l._id}))),this.events.subscribe("cart:add",l=>{this.getSum(l),this.cart=l}),this.storage.get("cart").then(l=>{null!=l&&(this.getSum(l),this.cart=l)})}ionViewDidEnter(){this.content.scrollToTop(0)}ngOnInit(){this.getProducts()}getSum(l){let n=0;for(let u=0;u<l.length;u++)n+=(l[u].num?l[u].num:0)*l[u].product.price;this.sum=n.toFixed(2)}getProducts(){this.getProductList("",1).subscribe(l=>{0===l.code&&(this.products=l.data.splice(0,4))},l=>{this.errorMsg=l})}getProductList(l,n){return this.productsService.getProductList(l,n)}goToDetail(l){this.router.navigate(["/detail"],{queryParams:{id:l}})}chooseProduct(){this.getSum(this.cart)}clearCart(){this.storage.remove("cart"),this.cart=[],this.events.publish("cart:add",[])}buyNow(){0===this.sum?this.utilService.showToast("\u60a8\u6ca1\u6709\u9700\u8981\u652f\u4ed8\u7684\u4ea7\u54c1"):this.orderService.httpPostOrder({products:JSON.stringify(this.cart),sumPrice:this.sum,customer:this.userId}).subscribe(l=>{0===l.code&&(this.storage.set("orders",this.cart),this.storage.set("sn",l.data.no),this.storage.set("no",l.data.sn),this.navCtrl.navigateForward("/pay-order"))})}}class b{}var d=u("pMnS"),p=u("oBZk"),g=u("/2TV"),h=u("W+v9"),m=u("s7LF"),x=u("SVse"),f=u("qoxc"),v=u("+ylL"),C=u("xgBC"),k=u("iInd"),P=t.pb({encapsulation:0,styles:[[".cart-null[_ngcontent-%COMP%]{font-size:14px;color:#666;padding:20px 0;text-align:center;min-height:150px}.clear-cart[_ngcontent-%COMP%]{font-size:14px;color:#e62465}.product-name[_ngcontent-%COMP%]{font-size:13px;white-space:normal;font-weight:400;text-overflow:ellipsis;color:#555;overflow:hidden;max-height:28px;line-height:23px;padding:0 0 0 15px}.price-box[_ngcontent-%COMP%]{font-size:12px;-webkit-box-pack:justify;justify-content:space-between;padding-left:15px;color:#555}.price[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:14px;font-weight:700;color:#e62465}.list[_ngcontent-%COMP%]{padding-bottom:60px}.list-item[_ngcontent-%COMP%]{padding:10px 0;border-bottom:1px solid #f2f2f2;margin:0 10px;--padding-start:0;--padding-end:0;--inner-padding-end:0}.list-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.btn[_ngcontent-%COMP%]{font-size:16px;--padding-start:25px;--padding-end:25px;--background:#24ad20;--background-activated:#24ad20;--color:#fff!important}.foot-price[_ngcontent-%COMP%]{padding:0 15px;color:#555}.foot-price[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#e62465}"]],data:{}});function q(l){return t.Lb(0,[(l()(),t.rb(0,0,null,null,1,"div",[["class","cart-null"]],null,null,null,null,null)),(l()(),t.Jb(-1,null,[" \u8d2d\u7269\u8f66\u7a7a\u7a7a\u5982\u4e5f\uff0c\u8d76\u5feb\u4f1a\u53bb\u6311\u9009\u5546\u54c1\u5427\uff5e "]))],null,null)}function D(l){return t.Lb(0,[(l()(),t.rb(0,0,null,null,25,"ion-item",[["class","list-item"]],null,null,null,p.eb,p.s)),t.qb(1,49152,null,0,o.I,[t.h,t.k,t.x],null,null),(l()(),t.rb(2,0,null,0,2,"ion-thumbnail",[["item-start",""]],null,null,null,p.vb,p.J)),t.qb(3,49152,null,0,o.Ab,[t.h,t.k,t.x],null,null),(l()(),t.rb(4,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),t.rb(5,0,null,0,20,"div",[["style","flex: 1;"]],null,null,null,null,null)),(l()(),t.rb(6,0,null,null,1,"h2",[["class","product-name"]],null,null,null,null,null)),(l()(),t.Jb(7,null,["",""])),(l()(),t.rb(8,0,null,null,17,"div",[["class","fl-box price-box"]],null,null,null,null,null)),(l()(),t.rb(9,0,null,null,10,"p",[["class","price"]],null,null,null,null,null)),(l()(),t.rb(10,0,null,null,1,"i",[],null,null,null,null,null)),(l()(),t.Jb(11,null,["\uffe5",""])),(l()(),t.Jb(-1,null,["/"])),(l()(),t.rb(13,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Jb(14,null,["",""])),(l()(),t.rb(15,0,null,null,4,"span",[["style","display: block; margin-top: 5px;"]],null,null,null,null,null)),(l()(),t.rb(16,0,null,null,3,"del",[["style","color: #999; font-size: 13px;"]],null,null,null,null,null)),(l()(),t.Jb(17,null,["\uffe5","/"])),(l()(),t.rb(18,0,null,null,1,"span",[["class","f12"]],null,null,null,null,null)),(l()(),t.Jb(19,null,["",""])),(l()(),t.rb(20,0,null,null,5,"app-count",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"click"]],(function(l,n,u){var t=!0,i=l.component;return"ngModelChange"===n&&(t=!1!==(l.context.$implicit.num=u)&&t),"click"===n&&(t=!1!==i.chooseProduct()&&t),t}),g.b,g.a)),t.qb(21,49152,null,0,h.a,[],null,null),t.Gb(1024,null,m.h,(function(l){return[l]}),[h.a]),t.qb(23,671744,null,0,m.l,[[8,null],[8,null],[8,null],[6,m.h]],{model:[0,"model"]},{update:"ngModelChange"}),t.Gb(2048,null,m.i,null,[m.l]),t.qb(25,16384,null,0,m.j,[[4,m.i]],null,null)],(function(l,n){l(n,23,0,n.context.$implicit.num)}),(function(l,n){l(n,4,0,t.vb(1,"",n.context.$implicit.product.banner.path,"")),l(n,7,0,n.context.$implicit.product.name),l(n,11,0,n.context.$implicit.product.price),l(n,14,0,n.context.$implicit.product.unit),l(n,17,0,n.context.$implicit.product.origin_price),l(n,19,0,n.context.$implicit.product.origin_price_unit),l(n,20,0,t.Db(n,25).ngClassUntouched,t.Db(n,25).ngClassTouched,t.Db(n,25).ngClassPristine,t.Db(n,25).ngClassDirty,t.Db(n,25).ngClassValid,t.Db(n,25).ngClassInvalid,t.Db(n,25).ngClassPending)}))}function J(l){return t.Lb(0,[t.Hb(671088640,1,{content:0}),(l()(),t.rb(1,0,null,null,11,"ion-header",[],null,null,null,p.Z,p.n)),t.qb(2,49152,null,0,o.C,[t.h,t.k,t.x],null,null),(l()(),t.rb(3,0,null,0,9,"ion-toolbar",[["class","toolbar"]],null,null,null,p.xb,p.L)),t.qb(4,49152,null,0,o.Db,[t.h,t.k,t.x],null,null),(l()(),t.rb(5,0,null,0,2,"ion-title",[],null,null,null,p.wb,p.K)),t.qb(6,49152,null,0,o.Bb,[t.h,t.k,t.x],null,null),(l()(),t.Jb(-1,0,["\u8d2d\u7269\u8f66"])),(l()(),t.rb(8,0,null,0,4,"ion-buttons",[["slot","primary"]],null,null,null,p.R,p.f)),t.qb(9,49152,null,0,o.m,[t.h,t.k,t.x],null,null),(l()(),t.rb(10,0,null,0,2,"ion-button",[["class","clear-cart"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.clearCart()&&t),t}),p.Q,p.e)),t.qb(11,49152,null,0,o.l,[t.h,t.k,t.x],null,null),(l()(),t.Jb(-1,0,["\u6e05\u7a7a\u8d2d\u7269\u8f66"])),(l()(),t.rb(13,0,null,null,13,"ion-content",[],null,null,null,p.U,p.i)),t.qb(14,49152,[[1,4]],0,o.v,[t.h,t.k,t.x],null,null),(l()(),t.gb(16777216,null,0,1,null,q)),t.qb(16,16384,null,0,x.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.rb(17,0,null,0,3,"ion-list",[["class","list"],["lines","none"]],null,null,null,p.gb,p.u)),t.qb(18,49152,null,0,o.P,[t.h,t.k,t.x],{lines:[0,"lines"]},null),(l()(),t.gb(16777216,null,0,1,null,D)),t.qb(20,278528,null,0,x.i,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.rb(21,0,null,0,5,"app-recommended",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"productClick"]],(function(l,n,u){var t=!0;return"productClick"===n&&(t=!1!==l.component.goToDetail(u)&&t),t}),f.b,f.a)),t.qb(22,49152,null,0,v.a,[],null,{productClick:"productClick"}),t.Gb(1024,null,m.h,(function(l){return[l]}),[v.a]),t.qb(24,671744,null,0,m.l,[[8,null],[8,null],[8,null],[6,m.h]],{model:[0,"model"]},null),t.Gb(2048,null,m.i,null,[m.l]),t.qb(26,16384,null,0,m.j,[[4,m.i]],null,null),(l()(),t.rb(27,0,null,null,13,"ion-footer",[],null,null,null,p.X,p.l)),t.qb(28,49152,null,0,o.A,[t.h,t.k,t.x],null,null),(l()(),t.rb(29,0,null,0,11,"ion-toolbar",[],null,null,null,p.xb,p.L)),t.qb(30,49152,null,0,o.Db,[t.h,t.k,t.x],null,null),(l()(),t.rb(31,0,null,0,9,"ion-buttons",[["slot","end"]],null,null,null,p.R,p.f)),t.qb(32,49152,null,0,o.m,[t.h,t.k,t.x],null,null),(l()(),t.rb(33,0,null,0,4,"div",[["class","foot-price"]],null,null,null,null,null)),(l()(),t.Jb(-1,null,["\uffe5"])),(l()(),t.rb(35,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Jb(36,null,["",""])),(l()(),t.Jb(-1,null,["\u5143"])),(l()(),t.rb(38,0,null,0,2,"ion-button",[["class","btn"],["expand","full"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.buyNow()&&t),t}),p.Q,p.e)),t.qb(39,49152,null,0,o.l,[t.h,t.k,t.x],{expand:[0,"expand"]},null),(l()(),t.Jb(-1,0,["\u63d0\u4ea4\u8ba2\u5355"]))],(function(l,n){var u=n.component;l(n,16,0,0==u.cart.length),l(n,18,0,"none"),l(n,20,0,u.cart),l(n,24,0,u.products),l(n,39,0,"full")}),(function(l,n){var u=n.component;l(n,21,0,t.Db(n,26).ngClassUntouched,t.Db(n,26).ngClassTouched,t.Db(n,26).ngClassPristine,t.Db(n,26).ngClassDirty,t.Db(n,26).ngClassValid,t.Db(n,26).ngClassInvalid,t.Db(n,26).ngClassPending),l(n,36,0,u.sum)}))}function M(l){return t.Lb(0,[(l()(),t.rb(0,0,null,null,1,"app-cart",[],null,null,null,J,P)),t.qb(1,114688,null,0,a,[e.a,C.b,o.Ib,o.Jb,o.e,s.a,c.a,k.m],null,null)],(function(l,n){l(n,1,0)}),null)}var y=t.nb("app-cart",a,M,{},{},[]),w=u("x8gb");u.d(n,"CartPageModuleNgFactory",(function(){return O}));var O=t.ob(b,[],(function(l){return t.Ab([t.Bb(512,t.j,t.Z,[[8,[d.a,y]],[3,t.j],t.v]),t.Bb(4608,x.l,x.k,[t.s,[2,x.r]]),t.Bb(4608,m.p,m.p,[]),t.Bb(4608,o.b,o.b,[t.x,t.g]),t.Bb(4608,o.Ib,o.Ib,[o.b,t.j,t.p]),t.Bb(4608,o.Lb,o.Lb,[o.b,t.j,t.p]),t.Bb(1073742336,x.b,x.b,[]),t.Bb(1073742336,m.o,m.o,[]),t.Bb(1073742336,m.e,m.e,[]),t.Bb(1073742336,o.Fb,o.Fb,[]),t.Bb(1073742336,k.o,k.o,[[2,k.t],[2,k.m]]),t.Bb(1073742336,w.a,w.a,[]),t.Bb(1073742336,b,b,[]),t.Bb(1024,k.k,(function(){return[[{path:"",component:a}]]}),[])])}))}}]);