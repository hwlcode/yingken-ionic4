(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{WAL3:function(e,t,o){"use strict";o.r(t),o.d(t,"iosTransitionAnimation",(function(){return n})),o.d(t,"shadow",(function(){return r}));var a=o("CZWo"),r=function(e){return e.shadowRoot||e},n=function(e,t){try{var o="rtl"===e.ownerDocument.dir,n=o?"-99.5%":"99.5%",l=o?"33%":"-33%",i=t.enteringEl,c=t.leavingEl,s="back"===t.direction,d=i.querySelector(":scope > ion-content"),f=i.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),m=i.querySelectorAll(":scope > ion-header > ion-toolbar"),y=Object(a.a)(),b=Object(a.a)();if(y.addElement(i).duration(t.duration||540).easing(t.easing||"cubic-bezier(0.32,0.72,0,1)").fill("both").beforeRemoveClass("ion-page-invisible"),c&&e){var p=Object(a.a)();p.addElement(e),y.addAnimation(p)}if(d||0!==m.length||0!==f.length?(b.addElement(d),b.addElement(f)):b.addElement(i.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),y.addAnimation(b),s?b.beforeClearStyles(["opacity"]).fromTo("transform","translateX("+l+")","translateX(0%)").fromTo("opacity",.8,1):b.beforeClearStyles(["opacity"]).fromTo("transform","translateX("+n+")","translateX(0%)"),d){var u=r(d).querySelector(".transition-effect");if(u){var S=u.querySelector(".transition-cover"),T=u.querySelector(".transition-shadow"),X=Object(a.a)(),E=Object(a.a)(),v=Object(a.a)();X.addElement(u).beforeStyles({opacity:"1"}).afterStyles({opacity:""}),E.addElement(S).beforeClearStyles(["opacity"]).fromTo("opacity",0,.1),v.addElement(T).beforeClearStyles(["opacity"]).fromTo("opacity",.03,.7),X.addAnimation([E,v]),b.addAnimation([X])}}if(m.forEach((function(e){var t=Object(a.a)();t.addElement(e),y.addAnimation(t);var i=Object(a.a)();i.addElement(e.querySelector("ion-title"));var c=Object(a.a)();c.addElement(e.querySelectorAll("ion-buttons,[menuToggle]"));var d=Object(a.a)();d.addElement(e.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));var f=Object(a.a)();f.addElement(r(e).querySelector(".toolbar-background"));var m=Object(a.a)(),b=e.querySelector("ion-back-button");if(b&&m.addElement(b),t.addAnimation([i,c,d,f,m]),i.fromTo("opacity",.01,1),c.fromTo("opacity",.01,1),d.fromTo("opacity",.01,1),s)i.fromTo("transform","translateX("+l+")","translateX(0%)"),d.fromTo("transform","translateX("+l+")","translateX(0%)"),m.fromTo("opacity",.01,1);else if(i.fromTo("transform","translateX("+n+")","translateX(0%)"),d.fromTo("transform","translateX("+n+")","translateX(0%)"),f.beforeClearStyles(["opacity"]).keyframes([{offset:0,opacity:.01},{offset:.99,opacity:1},{offset:1,opacity:"var(--opacity)"}]),m.fromTo("opacity",.01,1),b){var p=Object(a.a)();p.addElement(r(b).querySelector(".button-text")).fromTo("transform",o?"translateX(-100px)":"translateX(100px)","translateX(0px)"),t.addAnimation(p)}})),c){var q=Object(a.a)(),j=c.querySelector(":scope > ion-content");if(q.addElement(j),q.addElement(c.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),y.addAnimation(q),s?q.beforeClearStyles(["opacity"]).fromTo("transform","translateX(0%)",o?"translateX(-100%)":"translateX(100%)"):q.fromTo("transform","translateX(0%)","translateX("+l+")").fromTo("opacity",1,.8),j){var O=r(j).querySelector(".transition-effect");if(O){var A=O.querySelector(".transition-cover"),g=O.querySelector(".transition-shadow"),h=Object(a.a)(),C=Object(a.a)(),w=Object(a.a)();h.addElement(O).beforeStyles({opacity:"1"}).afterStyles({opacity:""}),C.addElement(A).beforeClearStyles(["opacity"]).fromTo("opacity",.1,0),w.addElement(g).beforeClearStyles(["opacity"]).fromTo("opacity",.7,.03),h.addAnimation([C,w]),q.addAnimation([h])}}c.querySelectorAll(":scope > ion-header > ion-toolbar").forEach((function(e){var t=Object(a.a)();t.addElement(e);var n=Object(a.a)();n.addElement(e.querySelector("ion-title"));var i=Object(a.a)();i.addElement(e.querySelectorAll("ion-buttons,[menuToggle]"));var c=Object(a.a)(),d=e.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");d.length>0&&c.addElement(d);var f=Object(a.a)();f.addElement(r(e).querySelector(".toolbar-background"));var m=Object(a.a)(),b=e.querySelector("ion-back-button");if(b&&m.addElement(b),t.addAnimation([n,i,c,m,f]),y.addAnimation(t),m.fromTo("opacity",.99,0),n.fromTo("opacity",.99,0),i.fromTo("opacity",.99,0),c.fromTo("opacity",.99,0),s){if(n.fromTo("transform","translateX(0%)",o?"translateX(-100%)":"translateX(100%)"),c.fromTo("transform","translateX(0%)",o?"translateX(-100%)":"translateX(100%)"),f.beforeClearStyles(["opacity"]).fromTo("opacity",1,.01),b){var p=Object(a.a)();p.addElement(r(b).querySelector(".button-text")),p.fromTo("transform","translateX(0%)","translateX("+(o?-124:124)+"px)"),t.addAnimation(p)}}else n.fromTo("transform","translateX(0%)","translateX("+l+")").afterClearStyles(["transform"]),c.fromTo("transform","translateX(0%)","translateX("+l+")").afterClearStyles(["transform","opacity"]),m.afterClearStyles(["opacity"]),n.afterClearStyles(["opacity"]),i.afterClearStyles(["opacity"])}))}return y}catch(k){throw k}}}}]);