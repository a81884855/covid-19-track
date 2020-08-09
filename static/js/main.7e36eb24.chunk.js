(this["webpackJsonpreact-covid-tracker"]=this["webpackJsonpreact-covid-tracker"]||[]).push([[0],{101:function(e,t,a){e.exports=a(188)},106:function(e,t,a){},107:function(e,t,a){},178:function(e,t,a){},179:function(e,t,a){},180:function(e,t,a){},181:function(e,t,a){},184:function(e,t,a){},188:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(9),s=a.n(c),l=(a(106),a(107),a(191)),o=a(192),u=a(189),i=a(91),d=a(98),m=a(16),p=a.n(m),f=a(30),y=a(13),h=a(99),v=a(35),E=a.n(v),b=function(e,t,a){var c=r.a.createContext();return{Context:c,Provider:function(s){var l=s.children,o=Object(n.useReducer)(e,a),u=Object(h.a)(o,2),i=u[0],d=u[1],m={};for(var p in t)m[p]=t[p](d);return r.a.createElement(c.Provider,{value:Object(y.a)({state:i},m)},l)}}}((function(e,t){switch(t.type){case"fetch_countries_data":return Object(y.a)(Object(y.a)({},e),{},{countries:t.playload.countries,mapCountries:t.playload.data,tableData:t.playload.sortedData});case"fetch_country_info":return Object(y.a)(Object(y.a)({},e),{},{countryInfo:t.playload});case"handle_change_cases_type":return Object(y.a)(Object(y.a)({},e),{},{casesType:t.playload});case"handle_change_country":return Object(y.a)(Object(y.a)({},e),{},{country:t.playload.country,countryInfo:t.playload.data,mapCenter:t.playload.mapCenter,mapZoom:t.playload.zoom});case"fetch_history_data":return Object(y.a)(Object(y.a)({},e),{},{historyData:t.playload.series,historyDays:t.playload.dates});case"fetch_news_data":return Object(y.a)(Object(y.a)({},e),{},{newsData:t.playload});default:return{}}}),{getCountriesData:function(e){return Object(f.a)(p.a.mark((function t(){var a,n,r,c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.a.get("https://disease.sh/v3/covid-19/countries");case 2:return a=t.sent,n=a.data,(r=n.map((function(e){return{name:e.country,value:e.countryInfo.iso2}}))).unshift({name:"worldwide",value:"worldwide"}),c=Object(d.a)(n).sort((function(e,t){return t.cases-e.cases})),t.abrupt("return",e({type:"fetch_countries_data",playload:{countries:r,data:n,sortedData:c}}));case 8:case"end":return t.stop()}}),t)})))},getCountryInfo:function(e){return Object(f.a)(p.a.mark((function t(){var a,n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.a.get("https://disease.sh/v3/covid-19/all");case 2:return a=t.sent,n=a.data,t.abrupt("return",e({type:"fetch_country_info",playload:n}));case 5:case"end":return t.stop()}}),t)})))},getNewsData:function(e){return Object(f.a)(p.a.mark((function t(){var a,n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"f5dc9e6860394cb68131d82cea6fc0a0",t.next=3,E.a.get("https://newsapi.org/v2/everything?q=COVID&sortBy=publishedAt&apiKey=".concat("f5dc9e6860394cb68131d82cea6fc0a0","&pageSize=20&page=1"));case 3:return a=t.sent,n=a.data,t.abrupt("return",e({type:"fetch_news_data",playload:n.articles}));case 6:case"end":return t.stop()}}),t)})))},handleChangeCaseTypes:function(e){return function(){var t=Object(f.a)(p.a.mark((function t(a){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e({type:"handle_change_cases_type",playload:a}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},handleChangeCountry:function(e){return function(){var t=Object(f.a)(p.a.mark((function t(a){var n,r,c,s;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="worldwide"===a?"https://disease.sh/v3/covid-19/all":"https://disease.sh/v3/covid-19/countries/".concat(a),t.next=3,E.a.get(n);case 3:return r=t.sent,c=r.data,s=c.countryInfo?[c.countryInfo.lat,c.countryInfo.long]:[34.80746,-40.4796],5,t.abrupt("return",e({type:"handle_change_country",playload:{country:a,data:c,mapCenter:s,zoom:5}}));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},fetchHistoryData:function(e){return function(){var t=Object(f.a)(p.a.mark((function t(a){var n,r,c,s,l;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="worldwide"===a?"https://disease.sh/v3/covid-19/historical/all?lastdays=121":"https://disease.sh/v3/covid-19/historical/".concat(a,"?lastdays=121"),t.next=3,E.a.get(n);case 3:return r=t.sent,c=r.data,"worldwide"!==a&&(c=c.timeline),s=["cases","recovered","deaths"].map((function(e){var t=Object.values(c[e]),a=t.map((function(e,a){return t[a+1]-e>0?t[a+1]-e:0}));return a.pop(),{name:"".concat(e.charAt(0).toUpperCase()).concat(e.slice(1)),data:a}})),l=Object.keys(c.cases).slice(1),t.abrupt("return",e({type:"fetch_history_data",playload:{series:s,dates:l}}));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},{country:"worldwide",countryInfo:{},countries:[],mapCountries:[],tableData:[],casesType:"cases",mapCenter:{lat:34.80746,lng:-40.4796},mapZoom:3,historyData:[],historyDays:[],newsData:[]}),g=b.Provider,x=b.Context,w=a(197),C=a(198),O=a(195),j=a(196),D={cases:{hex:"#CC1034",rgb:"rgb(204, 16, 52)",half_op:"rgba(204, 16, 52, 0.5)",multiplier:400},recovered:{hex:"#7dd71d",rgb:"rgb(125, 215, 29)",half_op:"rgba(125, 215, 29, 0.5)",multiplier:800},deaths:{hex:"#fb4443",rgb:"rgb(251, 68, 67)",half_op:"rgba(251, 68, 67, 0.5)",multiplier:2e3}},_=function(e){return e>1e9?Math.round(e/1e8)/10+"Bn":e>1e6?(e/1e6).toFixed(2)+"M":e>1e4?Math.round(e/100)/10+"K":e},N=(a(178),function(){var e=Object(n.useContext)(x).state,t=e.mapCountries,a=e.casesType,c=e.mapCenter,s=e.mapZoom;return r.a.createElement("div",{className:"map"},r.a.createElement(w.a,{center:c,zoom:s},r.a.createElement(C.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"cases";return e.map((function(e){return r.a.createElement(O.a,{key:e.country,center:[e.countryInfo.lat,e.countryInfo.long],color:D[t].hex,fillColor:D[t].hex,fillOpacity:.4,radius:Math.sqrt(e[t])*D[t].multiplier},r.a.createElement(j.a,null,r.a.createElement("div",{className:"info-container"},r.a.createElement("div",{className:"info-flag",style:{backgroundImage:"url(".concat(e.countryInfo.flag,")")}}),r.a.createElement("div",{className:"info-name"},e.country),r.a.createElement("div",{className:"info-confirmed"},"Cases:",r.a.createElement("div",null,r.a.createElement("span",null,_(e.cases)," "),r.a.createElement("small",null,"+ ",e.todayCases," new"))),r.a.createElement("div",{className:"info-recovered"},"Recovered:",r.a.createElement("div",null,r.a.createElement("span",null,_(e.recovered)," "),r.a.createElement("small",null,"+ ",e.todayRecovered," new"))),r.a.createElement("div",{className:"info-deaths"},"Deaths:",r.a.createElement("div",null,r.a.createElement("span",null,_(e.deaths)," "),r.a.createElement("small",null,"+ ",e.todayDeaths," new"))))))}))}(t,a)))}),k=a(97),I=(a(179),[{Header:"Name",accessor:"country",style:{textAlign:"center"}},{Header:"Active",accessor:"active",style:{textAlign:"center"}},{Header:"Cases",accessor:"cases",style:{textAlign:"center"}},{Header:"Today Cases",accessor:"todayCases",style:{textAlign:"center"}},{Header:"Recovered",accessor:"recovered",style:{textAlign:"center"}},{Header:"Today Recovered",accessor:"todayDeaths",style:{textAlign:"center"}},{Header:"Deaths",accessor:"deaths",style:{textAlign:"center"}},{Header:"Today deaths",accessor:"todayDeaths",style:{textAlign:"center"}}]),A=function(){var e=Object(n.useContext)(x).state.tableData;return r.a.createElement(u.a,{className:"countries-table-container"},r.a.createElement("h4",null,"Worldwide Details"),r.a.createElement(k.a,{defaultPageSize:15,className:"-striped -highlight",data:e,columns:I}))},T=a(190),H=(a(180),function(e){var t=e.active,a=e.title,n=e.todayAmount,c=e.amount,s=e.styleClassname,l=e.click;return r.a.createElement(u.a,{onClick:l},r.a.createElement(T.a,{className:"card-box ".concat(t?"active":"")},r.a.createElement("h6",null,a),r.a.createElement("div",{className:s},"+ ",_(n)," ",r.a.createElement("small",null,"today")),r.a.createElement("small",null,_(c)," Total")))}),z=function(){var e=Object(n.useContext)(x),t=e.state,a=t.countryInfo,c=t.casesType,s=e.handleChangeCaseTypes;return r.a.createElement(l.a,{className:"mt-2"},r.a.createElement(o.a,{xs:12,sm:4},r.a.createElement(H,{active:"cases"===c,title:"Coronavirus Cases",todayAmount:a.todayCases,amount:a.cases,styleClassname:"info-confirmed",click:function(){return s("cases")}})),r.a.createElement(o.a,{xs:12,sm:4},r.a.createElement(H,{active:"recovered"===c,title:"Recovered",todayAmount:a.todayRecovered,amount:a.recovered,styleClassname:"info-recovered",click:function(){return s("recovered")}})),r.a.createElement(o.a,{xs:12,sm:4},r.a.createElement(H,{active:"deaths"===c,title:"Deaths",todayAmount:a.todayDeaths,amount:a.deaths,styleClassname:"info-deaths",click:function(){return s("deaths")}})))},R=a(193),P=(a(181),function(){var e=Object(n.useContext)(x).state,t=e.tableData,a=e.casesType;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",null,"Live ",r.a.createElement("span",{id:"casesType"},a)," by Country"),r.a.createElement("div",{className:"table"},r.a.createElement(R.a,{striped:!0},r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement("tr",{key:e.country},r.a.createElement("td",null,e.country),r.a.createElement("td",{style:{textAlign:"right"}},e[a]))}))))))}),F=a(95),M=a.n(F),B=function(){var e=Object(n.useContext)(x),t=e.fetchHistoryData,a=e.state,c=a.casesType,s=a.country,l=a.historyData,o=a.historyDays;Object(n.useEffect)((function(){t(s,c)}),[s,c]);var u={chart:{type:"line",zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{width:5,curve:"straight",dashArray:[0,1,3]},legend:{tooltipHoverFormatter:function(e,t){return e+" - "+t.w.globals.series[t.seriesIndex][t.dataPointIndex]}},markers:{size:0,hover:{sizeOffset:6}},xaxis:{categories:o,labels:{show:!1}},yaxis:{labels:{formatter:function(e){return _(e)}}},tooltip:{y:[{title:{formatter:function(e){return e}}}]},grid:{borderColor:"#f1f1f1"}};return r.a.createElement("div",null,r.a.createElement("h4",null,"History Data (Past 120 days)"),r.a.createElement(M.a,{options:u,series:l}))},V=a(194),L=a(96),S=a.n(L),W=(a(184),function(e){var t=e.article;return r.a.createElement("div",{className:"news-box"},r.a.createElement(l.a,null,r.a.createElement(o.a,{xs:4},r.a.createElement(V.a,{src:t.urlToImage,alt:""})),r.a.createElement(o.a,{xs:8},r.a.createElement("a",{href:t.url},r.a.createElement("strong",null,t.title)),r.a.createElement("div",{className:"mt-1"},r.a.createElement("small",null,"Published: ",S()(t.publishedAt).format("llll")),r.a.createElement("br",null),r.a.createElement("p",null,t.description.slice(0,120))))))}),Z=function(){var e=Object(n.useContext)(x).state.newsData;return r.a.createElement("div",null,r.a.createElement("h4",null,"Top News for COVID"),r.a.createElement("div",{className:"news-boxes"},e.map((function(e){return r.a.createElement(W,{article:e})}))))};var q=function(){var e=Object(n.createRef)(),t=Object(n.useContext)(x),a=t.state,c=a.country,s=a.countries,d=t.getCountryInfo,m=t.getCountriesData,p=t.handleChangeCountry,f=t.getNewsData;return Object(n.useEffect)((function(){m(),d(),f()}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(l.a,null,r.a.createElement(o.a,{lg:12,xl:8},r.a.createElement("div",{className:"app_header"},r.a.createElement("h1",null,"COVID-19 Tracker"),r.a.createElement("div",{className:"dropdown-box"},r.a.createElement(i.DropdownList,{data:s,ref:e,valueField:"value",textField:"name",defaultValue:c,onChange:function(e){return p(e.name)}}))),r.a.createElement(z,null),r.a.createElement(N,null),r.a.createElement(A,null)),r.a.createElement(o.a,{lg:12,xl:4},r.a.createElement(u.a,{className:"chart_container"},r.a.createElement(B,null)),r.a.createElement(u.a,{className:"table_container"},r.a.createElement(P,null)),r.a.createElement(u.a,{className:"news-container"},r.a.createElement(Z,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(185),a(186),a(187);s.a.render(r.a.createElement(g,null,r.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[101,1,2]]]);
//# sourceMappingURL=main.7e36eb24.chunk.js.map