(this.webpackJsonpreact=this.webpackJsonpreact||[]).push([[0],{11:function(t,e,n){},30:function(t,e,n){"use strict";n.r(e);var c=n(0),i=n(20),r=n(16),s=n(3),a=n(4),o=n(5);n(11);var l=n(2),u=null,h=[[100,100]];function j(t){var e=Object(c.useRef)(null),n=1.5,i=function(e,n){return[(.15+parseFloat(e)/1e3*.7)*t.width,.5*t.height-parseFloat(n)/1e3*.7*t.width]},r=function(t,e){h.push([t[0]+e*(Math.random()-.5),t[1]+e*(Math.random()-.5)])},s=function(e){for(var n=t.uv[0],c=t.uv[1],r=0;r<t.vortices.length;++r){var s=t.vortices[r],o=i(s[0],s[1]),l=Object(a.a)(o,2),u=l[0],h=l[1],j=(e[0]-u)/100,d=(e[1]-h)/100,v=j*j+d*d;"source"==s[3]?(n+=s[2]*j/100/v,c+=s[2]*d/100/v):(n+=s[2]*d/100/v,c-=s[2]*j/100/v)}return[n,c]},j=function(t){var e=s(t),c=s([t[0]+e[0]*n/2,t[1]+e[1]*n/2]);t[0]+=c[0]*n,t[1]+=c[1]*n},d=document.createElement("canvas");d.width=t.width,d.height=t.height;var v=function(t){if(4==t.toString().length){var e=parseInt(t.toString()[0])/100,n=parseInt(t.toString()[1])/10,c=parseInt(t.toString().substr(2))/100;if(isNaN(e)||isNaN(n)||isNaN(c))return null;var i=function(t){return 5*c*(.2969*Math.sqrt(t)-.126*t-.3516*t*t+.2843*t*t*t-.1015*t*t*t*t)},r=function(t){return t<=n?e/(n*n)*(2*n*t-t*t):e/((1-n)*(1-n))*(1-2*n+2*n*t-t*t)},s=Math.round(6/c),a=Object(o.a)(Array(2*s+1).keys()).map((function(t){return t/s*(t/s)/(2+t/s)}));a.reverse();var l=a.map((function(t){return[t,r(t)+i(t)]}));return a.reverse(),a.splice(0,1),l.push.apply(l,Object(o.a)(a.map((function(t){return[t,r(t)-i(t)]})))),l}return null}(t.airfoil),b=function(){var n=d.getContext("2d");n.clearRect(0,0,t.width,t.height),n.fillStyle="#000000";for(var c=0;c<h.length;++c){var r=h[c];n.fillRect(r[0],r[1],1,1)}!function(e){for(var n=0;n<t.vortices.length;++n){var c=i(t.vortices[n][0],t.vortices[n][1]),r=Object(a.a)(c,2),s=r[0],o=r[1];t.iselect==n?(e.strokeStyle="#880000",e.beginPath(),e.moveTo(s,Math.max(1,o-15)),e.lineTo(s,Math.min(t.height,o+15)),e.stroke(),e.beginPath(),e.moveTo(Math.max(1,s-15),o),e.lineTo(Math.min(t.width,s+15),o),e.stroke(),e.fillStyle="#880000",e.beginPath(),e.arc(s,o,3,0,2*Math.PI)):(e.fillStyle="#008800",e.beginPath(),e.arc(s,o,3,0,2*Math.PI)),e.fill()}}(n),function(e){if(null!=v){var n=.7*t.width;e.strokeStyle="#888888",e.beginPath(),e.moveTo(.15*t.width+v[0][0]*n,t.height/2-v[0][1]*n);for(var c=1;c<v.length;++c)e.lineTo(.15*t.width+v[c][0]*n,t.height/2-v[c][1]*n);e.stroke()}}(n);var s=e.current.getContext("2d");s.clearRect(0,0,t.width,t.height),s.drawImage(d,0,0)};Object(c.useEffect)((function(){null!=u&&clearInterval(u),u=setInterval((function(){!function(){for(var e=0;e<h.length;++e)j(h[e]);h=h.filter((function(e){return Math.random()>.001&&isFinite(e[0])&&isFinite(e[1])&&e[0]>.2*-t.width&&e[0]<1.2*t.width&&e[1]>.2*-t.height&&e[1]<1.2*t.height}));for(var c=function(e){if("source"==t.vortices[e][3]&&t.vortices[e][2]<0){var c=i(t.vortices[e][0],t.vortices[e][1]),r=Object(a.a)(c,2),s=r[0],o=r[1];h=h.filter((function(c){var i=c[0]-s,r=c[1]-o;return i*i+r*r>-.15*n*t.vortices[e][2]}))}},s=0;s<t.vortices.length;++s)c(s);for(var o=Math.max(.01,t.uv[0]),l=Math.max(.01,-t.uv[1]),u=3/Math.sqrt(o*o+l*l),d=t.height-t.spacing/o*t.delta;d>.2*-t.height;d-=t.spacing/o)r([0,d],u);for(var v=t.spacing/l*(1-t.delta);v<1.2*t.width;v+=t.spacing/l)r([v,t.height],u);for(var b=0;b<t.vortices.length;++b)if("source"==t.vortices[b][3]&&t.vortices[b][2]>0)for(var O=i(t.vortices[b][0],t.vortices[b][1]),f=Object(a.a)(O,2),x=f[0],g=f[1],p=3*Math.ceil(2.07*t.vortices[b][2]/t.spacing),m=.1*t.vortices[b][2]*n,M=0;M<p;++M){var w=m+(Math.random()-.5)*n*4,S=x+w*Math.cos(2*M*Math.PI/p),y=g+w*Math.sin(2*M*Math.PI/p);r([S,y],.5*t.vortices[b][2]/1e3)}}(),b()}),30)}),[t]);return Object(l.jsx)("canvas",{ref:e,onClick:function(t){var n=e.current,c=n.getBoundingClientRect(),i=n.width/c.width,s=n.height/c.height,a=(t.clientX-c.left)*i,o=(t.clientY-c.top)*s;if(Math.random()<.5)for(var l=10,u=-10;u<l;u++)r([a-l,o+u],0),r([a+l,o+u],0),r([a+u,o-l],0),r([a+u,o+l],0);else for(var h=0;h<14;h++)r([a-h,o-14+h],0),r([a+h,o-14+h],0),r([a-h,o+14-h],0),r([a+h,o+14-h],0)},onMouseMove:function(n){var c=e.current,i=c.getBoundingClientRect(),r=c.width/i.width,o=c.height/i.height,l=(n.clientX-i.left)*r,u=(n.clientY-i.top)*o,h=s([l,u]),j=Object(a.a)(h,2),d=j[0],v=j[1],b=function(e,n){return[(e/t.width-.15)/.7*1e3,(.5*t.height-n)/(.7*t.width)*1e3]}(l,u),O=Object(a.a)(b,2),f=O[0],x=O[1],g=.5*(t.uv[0]*t.uv[0]+t.uv[1]*t.uv[1]-d*d-v*v);t.setmousestate([f,x,d,-v,g])},onMouseLeave:function(){t.setmousestate([])},width:t.width,height:t.height})}function d(t){var e=function(e,n){var c=Object(o.a)(t.vortices),i=parseFloat(e.target.value);isNaN(i)||(n(c[t.selected],i),t.setvortices(c))},n=function(t){return e(t,(function(t,e){t[0]=e}))},c=function(t){return e(t,(function(t,e){t[1]=e}))},i=function(t){return e(t,(function(t,e){t[2]=e}))},r=function(e){var n=Object(o.a)(t.vortices);n[t.selected][3]=e.target.value,t.setvortices(n)},s=function(){var e=Object(o.a)(t.vortices);e.splice(t.selected,0,Object(o.a)(e[t.selected])),t.setvortices(e)},a=function(){var e=Object(o.a)(t.vortices);e.splice(t.selected,1),console.log(t.selected,e.length),t.setvortices(e)};return Object(l.jsx)("div",{children:Object(l.jsx)("table",{children:Object(l.jsxs)("tbody",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"x"}),Object(l.jsx)("th",{children:"y"}),Object(l.jsx)("th",{children:"strength"})]}),t.vortices.map((function(e,o){return Object(l.jsxs)("tr",{onFocus:function(){t.setselected(o)},onClick:function(){t.setselected(o)},onTouchStart:function(){t.setselected(o)},children:[Object(l.jsx)("td",{children:Object(l.jsx)("input",{type:"number",value:e[0],onChange:n,min:-500,max:1500,readOnly:o!=t.selected})}),Object(l.jsx)("td",{children:Object(l.jsx)("input",{type:"number",value:e[1],onChange:c,min:-500,max:500,readOnly:o!=t.selected})}),Object(l.jsx)("td",{children:Object(l.jsx)("input",{type:"number",value:e[2],onChange:i,min:-100,max:100,readOnly:o!=t.selected})}),Object(l.jsx)("td",{children:Object(l.jsxs)("select",{value:e[3],onChange:r,children:[Object(l.jsx)("option",{value:"vortex",children:"vortex"}),Object(l.jsx)("option",{value:"source",children:"source"})]})}),Object(l.jsxs)("td",{children:[" ",o==t.selected?Object(l.jsx)("button",{onClick:s,children:"duplicate"}):Object(l.jsx)("span",{})]}),Object(l.jsxs)("td",{children:[" ",o==t.selected?Object(l.jsx)("button",{disabled:t.vortices.length<=1,onClick:a,children:"remove"}):Object(l.jsx)("span",{})]})]},o)}))]})})})}function v(t){return Object(l.jsxs)("div",{children:[Object(l.jsxs)("p",{children:[" ","u",Object(l.jsx)("sub",{children:"\u221e"})," ",Object(l.jsx)("input",{type:"number",step:.001,value:t.uv[0],onChange:function(e){var n=Math.max(0,Math.min(1,e.target.value));t.setuv([n,t.uv[1]])},min:0,max:1}),"   ","v",Object(l.jsx)("sub",{children:"\u221e"})," ",Object(l.jsx)("input",{type:"number",step:.001,value:-t.uv[1],onChange:function(e){var n=Math.max(0,Math.min(1,e.target.value));t.setuv([t.uv[0],-n])},min:0,max:1})," ","   ","\u03b4"," ",Object(l.jsx)("input",{type:"number",step:.01,value:t.delta,onChange:function(e){var n=Math.max(0,Math.min(1,e.target.value));t.setdelta(n)},min:0,max:1})]}),Object(l.jsxs)("p",{children:[" naca ",Object(l.jsx)("input",{type:"text",value:t.airfoil,onChange:function(e){t.setairfoil(e.target.value)},min:0,max:1})]})]})}function b(t){return 0==t.mousestate.length?Object(l.jsx)("div",{}):Object(l.jsxs)("div",{children:[Object(l.jsxs)("p",{children:["x=",t.mousestate[0].toFixed(0)]}),Object(l.jsxs)("p",{children:["y=",t.mousestate[1].toFixed(0)]}),Object(l.jsxs)("p",{children:["u=",t.mousestate[2].toFixed(2)]}),Object(l.jsxs)("p",{children:["v=",t.mousestate[3].toFixed(2)]}),Object(l.jsxs)("p",{children:["p=",t.mousestate[4].toFixed(2)]})]})}function O(){var t,e=[1280,720],n=Object(c.useState)(0),i=Object(a.a)(n,2),s=i[0],o=i[1],u=Object(c.useState)([1,0]),h=Object(a.a)(u,2),O=h[0],f=h[1],x=Object(c.useState)(0),g=Object(a.a)(x,2),p=g[0],m=g[1],M=Object(c.useState)(""),w=Object(a.a)(M,2),S=w[0],y=w[1],C=Object(c.useState)([]),F=Object(a.a)(C,2),k=F[0],I=F[1],P=Object(r.b)(),N=Object(a.a)(P,2),R=N[0],T=N[1],q=R.get("v"),_=Object(c.useState)(null==(t=q)?[[500,0,100,"vortex"]]:t.split("~").map((function(t){var e=t.split("_");return[parseFloat(e[0]),parseFloat(e[1]),parseFloat(e[2]),e[3]]}))),B=Object(a.a)(_,2),E=B[0],J=B[1];return Object(l.jsx)("table",{children:Object(l.jsxs)("tbody",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{rowSpan:2,children:Object(l.jsx)("img",{src:"qi.jpg"})}),Object(l.jsx)("td",{children:Object(l.jsx)(d,{vortices:E,selected:s,setvortices:function(t){J(t);for(var e=function(t){return t[0].toString()+"_"+t[1].toString()+"_"+t[2].toString()+"_"+t[3]},n=e(t[0]),c=1;c<t.length;++c)n+="~",n+=e(t[c]);T({v:n})},setselected:o,width:e[0],height:e[1]})}),Object(l.jsx)("td",{rowSpan:2,width:"100px",valign:"bottom",children:Object(l.jsx)(b,{mousestate:k})}),Object(l.jsx)("td",{rowSpan:2,children:Object(l.jsx)("img",{src:"qi.jpg"})})]}),Object(l.jsx)("tr",{children:Object(l.jsx)("td",{children:Object(l.jsx)(v,{uv:O,setuv:f,delta:p,setdelta:m,airfoil:S,setairfoil:y})})}),Object(l.jsx)("tr",{children:Object(l.jsx)("td",{colSpan:4,children:Object(l.jsx)(j,{width:e[0],height:e[1],uv:O,spacing:20,u0:[1,0],vortices:E,iselect:s,delta:p,airfoil:S,setmousestate:I})})})]})})}var f=document.getElementById("root"),x=Object(i.createRoot)(f),g=Object(r.a)([{path:"*",element:Object(l.jsx)(O,{})}]);x.render(Object(l.jsx)(c.StrictMode,{children:Object(l.jsx)(s.b,{router:g})}))}},[[30,1,2]]]);
//# sourceMappingURL=main.a28125a6.chunk.js.map