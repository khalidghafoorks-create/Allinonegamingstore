// 31. ADMIN PIN
var ADMIN_PIN="5425"; var secretClick=0;
document.getElementById('secretArea').onclick=function(){ secretClick++; if(secretClick>=5){ document.getElementById('pinOverlay').style.display='flex'; secretClick=0; } setTimeout(()=>secretClick=0,2000); };
function checkPin(){ var p=document.getElementById('pinInput').value; if(p===ADMIN_PIN){ document.getElementById('pinOverlay').style.display='none'; document.getElementById('settingsPanel').style.display='block'; } else alert("Galat PIN"); }
function closePin(){ document.getElementById('pinOverlay').style.display='none'; }
function lockSettings(){ document.getElementById('settingsPanel').style.display='none'; }

// 32. MAIN BANNER
var BANNERS=[]; var mainBannerPhotos=[]; var bannerIdx=0;
function renderMainBanner(){ var b=document.getElementById('mainBanner'); if(mainBannerPhotos.length>0){ b.innerHTML='<img src="'+mainBannerPhotos[bannerIdx%mainBannerPhotos.length]+'"><div class="banner-dots">'+mainBannerPhotos.map((_,i)=>'<span style="width:8px;height:8px;border-radius:50%;background:'+(i===bannerIdx%mainBannerPhotos.length?'#fff':'#555')+';display:inline-block"></span>').join('')+'</div>'; } }
function rotateBanner(){ if(mainBannerPhotos.length>1){ bannerIdx++; renderMainBanner(); } }
setInterval(rotateBanner,3000);
function uploadBanner(e){ var f=e.target.files[0]; if(!f) return; var r=new FileReader(); r.onload=function(ev){ mainBannerPhotos.push(ev.target.result); BANNERS=mainBannerPhotos; renderBannerList(); renderMainBanner(); }; r.readAsDataURL(f); }
function renderBannerList(){ document.getElementById('bannerList').innerHTML=mainBannerPhotos.map((p,i)=>'<div class="banner-item"><img src="'+p+'"><button class="btn-small" onclick="deleteBanner('+i+')">Delete</button></div>').join(''); }
function deleteBanner(i){ mainBannerPhotos.splice(i,1); renderBannerList(); renderMainBanner(); }
function clearBanners(){ mainBannerPhotos=[]; renderBannerList(); renderMainBanner(); }
function saveBanners(){ localStorage.setItem('ladla_banners',JSON.stringify(mainBannerPhotos)); alert("Banners Save ✅"); }

// 33. STORE NAME
var storeName="LADLA GAME STORE";
function applyStoreName(){ document.getElementById('storeNameTxt').innerText=storeName; document.getElementById('footerStore').innerText=storeName; document.title=storeName; }
function updateStoreNameUI(){ var n=document.getElementById('sStoreName').value.trim(); var t=document.getElementById('sTagline').value.trim(); if(n) storeName=n; if(t) document.getElementById('taglineTxt').innerText=t; applyStoreName(); saveAll(); alert("Store Name Save ✅"); }

// 34. THEMES 20
var THEMES=[{bg:"#0a0014",accent:"#a855f7"},{bg:"#02120a",accent:"#00ff88"},{bg:"#120d00",accent:"#f5c518"},{bg:"#140000",accent:"#ff2222"},{bg:"#000a1a",accent:"#00cfff"},{bg:"#150010",accent:"#ff2d95"},{bg:"#160a00",accent:"#ff6a00"},{bg:"#000814",accent:"#0066ff"},{bg:"#00140f",accent:"#00c896"},{bg:"#0a0a0a",accent:"#c0c0c0"},{bg:"#1a0000",accent:"#8b0000"},{bg:"#0f001a",accent:"#d4af37"},{bg:"#000000",accent:"#ffffff"},{bg:"#1a0033",accent:"#ff00aa"},{bg:"#001a0f",accent:"#00e676"},{bg:"#0d0800",accent:"#ffcc00"},{bg:"#141400",accent:"#ffea00"},{bg:"#0a0a0a",accent:"#25f4ee"},{bg:"#0f0800",accent:"#f7931a"},{bg:"#e8f4ff",accent:"#00bfff"}];
var curTheme=0;
function applyTheme(i){ curTheme=i; document.documentElement.style.setProperty('--bg',THEMES[i].bg); document.documentElement.style.setProperty('--accent',THEMES[i].accent); document.documentElement.style.setProperty('--banner',THEMES[i].accent); document.documentElement.style.setProperty('--button',THEMES[i].accent); document.documentElement.style.setProperty('--glow','0 0 25px '+THEMES[i].accent); }
function renderThemeGrid(){ document.getElementById('themeGrid').innerHTML=THEMES.map((t,i)=>'<button onclick="applyTheme('+i+')" style="border-color:'+t.accent+'">'+(i+1)+'. Theme</button>').join(''); }
function saveTheme(){ localStorage.setItem('ladla_theme',curTheme); alert("Theme Save ✅"); }

// 35. PACKS - 25K TO 200K - $300 TO $2500
function makeBigPacks(coin){ return [
 {name:"25,000 "+coin, price:"$300", icon:"icon-512.png"},
 {name:"32,000 "+coin, price:"$380", icon:"icon-512.png"},
 {name:"50,000 "+coin, price:"$600", icon:"icon-512.png"},
 {name:"81,000 "+coin, price:"$950", icon:"icon-512.png"},
 {name:"100,000 "+coin, price:"$1200", icon:"icon-512.png"},
 {name:"120,000 "+coin, price:"$1450", icon:"icon-512.png"},
 {name:"162,000 "+coin, price:"$1950", icon:"icon-512.png"},
 {name:"200,000 "+coin, price:"$2500", icon:"icon-512.png"},
]; }

// 36. DEFAULT GAMES 8
var GAMES=[
 {id:"pubg", name:"PUBG Mobile", coin:"UC", icon:"icon-512.png", filter:"PUBG", packs:makeBigPacks("UC"), small:[{name:"60 UC",price:"$3",icon:"icon-512.png"},{name:"325 UC",price:"$12",icon:"icon-512.png"}]},
 {id:"bgmi", name:"BGMI", coin:"UC", icon:"icon-512.png", filter:"PUBG", packs:makeBigPacks("UC"), small:[]},
 {id:"ff", name:"Free Fire", coin:"Diamonds", icon:"icon-512.png", filter:"Free Fire", packs:makeBigPacks("Diamonds"), small:[{name:"100 Diamonds",price:"$3",icon:"icon-512.png"}]},
 {id:"ffmax", name:"Free Fire MAX", coin:"Diamonds", icon:"icon-512.png", filter:"Free Fire", packs:makeBigPacks("Diamonds"), small:[]},
 {id:"cod", name:"COD Mobile", coin:"CP", icon:"icon-512.png", filter:"COD", packs:makeBigPacks("CP"), small:[]},
 {id:"mlbb", name:"Mobile Legends", coin:"Diamonds", icon:"icon-512.png", filter:"MLBB", packs:makeBigPacks("Diamonds"), small:[]},
 {id:"tiktok", name:"TikTok", coin:"Coins", icon:"icon-512.png", filter:"TikTok", packs:makeBigPacks("Coins"), small:[]},
 {id:"valorant", name:"Valorant", coin:"VP", icon:"icon-512.png", filter:"Valorant", packs:makeBigPacks("VP"), small:[]},
];

// 37. ORDERS / STATUS / REASONS
var orders=[]; var defaultStatus="SUCCESS"; var pendingReason="Payment pending - wait karo"; var failedReason="Payment failed - dobara try karo";
function updateDefaultUI(){ var el=document.getElementById('defaultStatusSel'); if(el) el.value=defaultStatus; document.getElementById('ordersTop').innerHTML="Total Orders: "+orders.length; }
function setDefaultStatus(v){ defaultStatus=v; }
function saveOrderSettings(){ defaultStatus=document.getElementById('defaultStatusSel').value; saveAll(); alert("Order Settings Save ✅"); }
function saveReasonSettings(){ pendingReason=document.getElementById('pendingReasonInp').value||pendingReason; failedReason=document.getElementById('failedReasonInp').value||failedReason; saveAll(); alert("Reasons Save ✅"); }

// 38. PAYMENT / FILTER / LOGO / CONTACT
var paySettings={card:1,apple:1,usdt:1,btc:1}; var filters=["All","PUBG","Free Fire","COD","MLBB","TikTok","Valorant"];
var contactInfo="", addressInfo="";
function savePaymentSettings(){ var c=document.querySelectorAll('#payToggles input'); paySettings={card:c[0].checked?1:0,apple:c[1].checked?1:0,usdt:c[2].checked?1:0,btc:c[3].checked?1:0}; saveAll(); alert("Payment Save ✅"); }
function saveFilterSettings(){ var v=document.getElementById('filterInput').value; if(v) filters=v.split(',').map(s=>s.trim()); saveAll(); renderFilters(); }
function saveLogo(e){ var f=e.target.files[0]; var r=new FileReader(); r.onload=function(ev){ document.getElementById('logoImg').src=ev.target.result; localStorage.setItem('ladla_logo',ev.target.result); }; r.readAsDataURL(f); }
function saveContact(){ contactInfo=document.getElementById('contactInp').value; addressInfo=document.getElementById('addressInp').value; document.getElementById('footerContact').innerText="Contact: "+contactInfo+" | Address: "+addressInfo; saveAll(); alert("Contact Save ✅"); }
function saveGame(){ saveAll(); }

// 39. VARIABLES
var curGame=null, curPack=null, curPay="CARD", verifiedUid="", verifiedUser="BINRAO / KALEOZ_122", curOrderId="", _curCard=null, _curBrand="VISA";
var curFilter="All", searchTxt="";

// 40. RENDER MAIN
function renderFilters(){ document.getElementById('filterBar').innerHTML=filters.map(f=>'<button class="'+(curFilter===f?'active':'')+'" onclick="setFilter(\''+f+'\')">'+f+'</button>').join(''); }
function setFilter(f){ curFilter=f; renderAll(); }
function gameCard(g){ return '<div class="card-game" onclick="openGame(\''+g.id+'\')"><img src="'+g.icon+'"><b>'+g.name+'</b><br><small>'+g.coin+' • 8 Packs</small></div>'; }
function renderAll(){
  renderFilters();
  var list=GAMES.filter(g=>{ if(curFilter!=="All" && g.filter!==curFilter) return false; if(searchTxt && !g.name.toLowerCase().includes(searchTxt.toLowerCase())) return false; return true; });
  document.getElementById('trendingGrid').innerHTML=list.slice(0,4).map(gameCard).join('');
  document.getElementById('allGrid').innerHTML=list.map(gameCard).join('');
  renderOrders(); renderGamesEditor(); renderPayToggles(); renderThemeGrid();
}
document.getElementById('search').oninput=function(){ searchTxt=this.value; renderAll(); };
function uploadPackPhoto(e,gi,pi,isSmall){ var f=e.target.files[0]; var r=new FileReader(); r.onload=function(ev){ if(isSmall) GAMES[gi].small[pi].icon=ev.target.result; else GAMES[gi].packs[pi].icon=ev.target.result; saveAll(); renderGamesEditor(); }; r.readAsDataURL(f); }
function addPack(gi,isSmall){ var n=prompt("Pack Name - Example 5000 UC"); var p=prompt("Price - Example $60"); if(!n) return; if(isSmall) GAMES[gi].small.push({name:n,price:p||"$0",icon:"icon-512.png"}); else GAMES[gi].packs.push({name:n,price:p||"$0",icon:"icon-512.png"}); saveAll(); renderGamesEditor(); }
function deletePack(gi,pi,isSmall){ if(isSmall) GAMES[gi].small.splice(pi,1); else GAMES[gi].packs.splice(pi,1); saveAll(); renderGamesEditor(); }
function renderOrders(){ document.getElementById('ordersList').innerHTML=orders.map((o,i)=>'<div class="order-row">'+o.id+' - '+o.pack+' - '+o.status+' <button class="btn-small" onclick="setOrderStatus('+i+',\'SUCCESS\')">SUCCESS</button><button class="btn-small" onclick="setOrderStatus('+i+',\'PENDING\')">PENDING</button><button class="btn-small" onclick="setOrderStatus('+i+',\'FAILED\')">FAILED</button></div>').join('')||"Koi order nahi"; updateDefaultUI(); }
function setOrderStatus(i,s){ orders[i].status=s; saveAll(); renderOrders(); }
function clearOrders(){ orders=[]; saveAll(); renderOrders(); alert("Orders Clear"); }

// 41. OPEN GAME / VERIFY
function openGame(id){
  curGame=GAMES.find(g=>g.id===id); curPack=null; verifiedUid=""; verifiedUser="BINRAO / KALEOZ_122";
  document.getElementById('detailTitle').innerText=curGame.name;
  document.getElementById('detailBannerTxt').innerText=curGame.name+" MEGA DEAL";
  document.getElementById('soldList').innerHTML='<div class="sold-card">Ahmed - 50,000 UC - 2 min ago ✅</div><div class="sold-card">Ali - 100,000 Diamonds - 5 min ago ✅</div>';
  document.getElementById('verifyCard').style.display='none';
  document.getElementById('uidInput').value="";
  var h=""; curGame.small.forEach((p,i)=>{ h+='<div class="pack" onclick="selectPack('+i+',true)"><img src="'+p.icon+'"><b>'+p.name+'</b><br>'+p.price+'</div>'; });
  curGame.packs.forEach((p,i)=>{ h+='<div class="pack" onclick="selectPack('+i+',false)"><img src="'+p.icon+'"><b>'+p.name+'</b><br>'+p.price+'</div>'; });
  document.getElementById('packsWrap').innerHTML=h;
  document.getElementById('overlayPage').style.display='block';
}
function buyNowPack(i){ selectPack(i,false); goToPayment(); }
function verifyUid(){
  var uid=document.getElementById('uidInput').value.trim();
  if(uid.length<5){ alert("Sahi UID likho"); return; }
  verifiedUid=uid; verifiedUser="BINRAO / KALEOZ_122";
  document.getElementById('verifyCard').style.display='block';
  document.getElementById('verifiedUserTxt').innerText=verifiedUser;
  document.getElementById('verifiedUidTxt').innerText="UID: "+uid+" • Fixed User: BINRAO";
}
function logoutAccount(){ verifiedUid=""; document.getElementById('verifyCard').style.display='none'; }
function selectPack(i,isSmall){
  curPack=isSmall?curGame.small[i]:curGame.packs[i];
  document.querySelectorAll('.pack').forEach(el=>el.classList.remove('selected'));
  var els=document.querySelectorAll('.pack'); if(els[i]) els[i].classList.add('selected');
}
function closeFlow(){ document.getElementById('overlayPage').style.display='none'; document.getElementById('page2').style.display='none'; document.getElementById('page3').style.display='none'; document.getElementById('page4').style.display='none'; document.getElementById('mainPage').style.display='block'; }
function backToPage1(){ closeFlow(); }

// 42. PAGE 2 FIXED - goToPayment + selectPay
function goToPayment(){
  if(!curPack){ alert("Pehle Pack Select karo"); return; }
  if(!verifiedUid){ alert("Pehle UID Verify karo"); return; }
  curOrderId="LADLA-"+Math.floor(100000+Math.random()*900000);
  document.getElementById('overlayPage').style.display='none';
  document.getElementById('page2').style.display='block';
  // Summary sirf Pack + Order ID - UID / Pack wali 2 lines hata di
  document.getElementById('summaryBox').innerHTML="<b>1 PACK SELECTED</b><br>"+curPack.name+" - "+curPack.price+"<br>Order ID: "+curOrderId;
  var cards=[
   {brand:"VISA", bank:"Meezan", num:"5869 •••• •••• 5869", exp:"12/28", holder:"BINRAO"},
   {brand:"Mastercard", bank:"HBL", num:"8888 •••• •••• 8888", exp:"09/27", holder:"BINRAO"},
   {brand:"GOLD VIP", bank:"Ladla", num:"1234 •••• •••• 1234", exp:"11/29", holder:"LADLA VIP"},
  ];
  document.getElementById('realCards').innerHTML=cards.map((c,i)=>'<div class="real-card '+(i===0?'selected':'')+'" onclick="selectPay(\'CARD\','+i+',\''+c.brand+'\')"><div class="bank">'+c.brand+' • '+c.bank+'</div><div class="number">'+c.num+'</div><div class="row"><span>'+c.holder+'</span><span>Exp '+c.exp+'</span></div></div>').join('');
  _curCard=cards[0]; _curBrand="VISA";
  document.getElementById('payOpts').innerHTML=(paySettings.card?'<div class="pay-opt selected" onclick="selectPay(\'CARD\',0,\'VISA\')">💳 Card</div>':'')+(paySettings.apple?'<div class="pay-opt" onclick="selectPay(\'APPLE\')">🍎 Apple Pay</div>':'')+(paySettings.usdt?'<div class="pay-opt" onclick="selectPay(\'USDT\')">🟢 USDT</div>':'')+(paySettings.btc?'<div class="pay-opt" onclick="selectPay(\'BTC\')">🟠 Bitcoin</div>':'');
}
function selectPay(pay, idx, brand){
  curPay=pay; if(brand) _curBrand=brand;
  if(idx!==undefined){ document.querySelectorAll('.real-card').forEach(el=>el.classList.remove('selected')); document.querySelectorAll('.real-card')[idx].classList.add('selected'); }
  document.querySelectorAll('.pay-opt').forEach(el=>el.classList.remove('selected'));
  document.getElementById('appleBox').style.display=(pay==='APPLE')?'block':'none';
}

// 43. LOADING - goToLoading
function goToLoading(){
  var cvc=document.getElementById('cvcInput').value.trim();
  if(curPay==='CARD' && cvc.length<3){ alert("CVC likho - 3 digit"); return; }
  document.getElementById('popupF1').style.display='block';
  setTimeout(()=>{
    document.getElementById('popupF1').style.display='none';
    document.getElementById('page2').style.display='none';
    document.getElementById('page3').style.display='block';
    document.getElementById('loadUidLine').innerText="UID: "+verifiedUid+" • User: "+verifiedUser;
    orders.unshift({id:curOrderId, pack:curPack.name+" - "+curPack.price, uid:verifiedUid, status:defaultStatus, card:_curBrand, time:new Date().toLocaleString()});
    saveAll();
    var p=0; var steps=["Connecting...","Verifying...","Transferring...","Completing..."];
    var iv=setInterval(()=>{
      p+=2; if(p>100) p=100;
      document.getElementById('loadBar').style.width=p+"%";
      document.getElementById('loadPct').innerText=p+"%";
      document.getElementById('loadTxt').innerText=steps[Math.floor(p/25)]||"Completing...";
      if(p>=100){ clearInterval(iv); showResult(); }
    },120);
  },3000);
}

// 44. RESULT - showResult
function showResult(){
  document.getElementById('page3').style.display='none';
  document.getElementById('page4').style.display='block';
  var o=orders[0];
  var t=document.getElementById('resTitle');
  if(defaultStatus==="SUCCESS"){ t.innerText="PAYMENT SUCCESS ✅ VIP"; t.style.color="#00ff88"; document.getElementById('resReason').innerText="Transfer ho gaya!"; }
  else if(defaultStatus==="PENDING"){ t.innerText="PAYMENT PENDING ⏳"; t.style.color="orange"; document.getElementById('resReason').innerText=pendingReason; }
  else { t.innerText="PAYMENT FAILED ❌"; t.style.color="red"; document.getElementById('resReason').innerText=failedReason; }
  document.getElementById('resPack').innerText="Pack: "+curPack.name+" - "+curPack.price+" | Order: "+curOrderId;
  document.getElementById('resUid').innerText="UID: "+verifiedUid;
  document.getElementById('resUser').innerText="Username: "+verifiedUser;
  document.getElementById('resCard').innerText="Card: "+_curBrand+" • Pay: "+curPay;
  document.getElementById('resTime').innerText="Time: "+new Date().toLocaleString();
}
function retryPay(){ document.getElementById('page4').style.display='none'; document.getElementById('page2').style.display='block'; }

// 45. LAST FUNCTIONS
function contactAdmin(){ alert("Contact: "+contactInfo); }
function uploadGamePhoto(e,gi){ var f=e.target.files[0]; var r=new FileReader(); r.onload=function(ev){ GAMES[gi].icon=ev.target.result; saveAll(); renderAll(); }; r.readAsDataURL(f); }
function removeGamePhoto(gi){ GAMES[gi].icon="icon-512.png"; saveAll(); renderAll(); }
function collectGames(){ return GAMES; }
function addGame(){ var n=prompt("Game Name"); if(!n) return; var c=prompt("Coin Name - UC / Diamonds"); GAMES.push({id:"g"+Date.now(), name:n, coin:c||"Coins", icon:"icon-512.png", filter:"All", packs:makeBigPacks(c||"Coins"), small:[]}); saveAll(); renderAll(); alert("Game Add ✅"); }
function deleteGame(gi){ if(confirm("Delete?")){ GAMES.splice(gi,1); saveAll(); renderAll(); } }
function updatePay(){ savePaymentSettings(); }
function readFile(file,cb){ var r=new FileReader(); r.onload=function(e){ cb(e.target.result); }; r.readAsDataURL(file); }
function getBackup(){ return JSON.stringify({games:GAMES, orders:orders, defaultStatus:defaultStatus, pendingReason:pendingReason, failedReason:failedReason, paySettings:paySettings, filters:filters, storeName:storeName, banners:mainBannerPhotos, theme:curTheme}); }
function exportBackup(){ var b=getBackup(); document.getElementById('backupText').value=b; navigator.clipboard.writeText(b); alert("Backup Copy ✅"); }
function importBackup(){ try{ var d=JSON.parse(document.getElementById('backupText').value); if(d.games) GAMES=d.games; if(d.orders) orders=d.orders; if(d.defaultStatus) defaultStatus=d.defaultStatus; alert("Backup Restore ✅"); saveAll(); location.reload(); }catch(e){ alert("Galat Backup"); } }
function saveAll(){ localStorage.setItem('ladla_all', JSON.stringify({games:GAMES, orders:orders, defaultStatus:defaultStatus, pendingReason:pendingReason, failedReason:failedReason, paySettings:paySettings, filters:filters, storeName:storeName, banners:mainBannerPhotos, theme:curTheme, contact:contactInfo, address:addressInfo})); }
function loadAll(){ var s=localStorage.getItem('ladla_all'); if(!s) return; try{ var d=JSON.parse(s); if(d.games) GAMES=d.games; if(d.orders) orders=d.orders; if(d.defaultStatus) defaultStatus=d.defaultStatus; if(d.pendingReason) pendingReason=d.pendingReason; if(d.failedReason) failedReason=d.failedReason; if(d.paySettings) paySettings=d.paySettings; if(d.filters) filters=d.filters; if(d.storeName) storeName=d.storeName; if(d.banners) mainBannerPhotos=d.banners; if(d.theme!==undefined) curTheme=d.theme; if(d.contact) contactInfo=d.contact; if(d.address) addressInfo=d.address; }catch(e){} }
function renderGamesEditor(){
  var el=document.getElementById('gamesEditor'); if(!el) return;
  el.innerHTML=GAMES.map((g,gi)=>'<div class="game-edit"><div style="display:flex;gap:10px;align-items:center"><img src="'+g.icon+'" style="width:45px;height:45px;border-radius:10px"><b>'+g.name+'</b><input type="file" accept="image/*" onchange="uploadGamePhoto(event,'+gi+')"><button class="btn-small" onclick="removeGamePhoto('+gi+')">Remove Photo</button><button class="btn-small" onclick="deleteGame('+gi+')" style="background:red;color:#fff">Delete Game</button></div>'
  +'<b>Small Packs</b>'+g.small.map((p,pi)=>'<div class="pack-edit"><img src="'+p.icon+'"><input value="'+p.name+'" onchange="GAMES['+gi+'].small['+pi+'].name=this.value;saveAll()"><input value="'+p.price+'" onchange="GAMES['+gi+'].small['+pi+'].price=this.value;saveAll()"><input type="file" onchange="uploadPackPhoto(event,'+gi+','+pi+',true)"><button onclick="deletePack('+gi+','+pi+',true)">X</button></div>').join('')
  +'<button class="btn-small" onclick="addPack('+gi+',true)">+ Add Small Pack</button><br><b>Big Packs 25K-200K</b>'+g.packs.map((p,pi)=>'<div class="pack-edit"><img src="'+p.icon+'"><input value="'+p.name+'" onchange="GAMES['+gi+'].packs['+pi+'].name=this.value;saveAll()"><input value="'+p.price+'" onchange="GAMES['+gi+'].packs['+pi+'].price=this.value;saveAll()"><input type="file" onchange="uploadPackPhoto(event,'+gi+','+pi+',false)"><button onclick="deletePack('+gi+','+pi+',false)">X</button></div>').join('')
  +'<button class="btn-small" onclick="addPack('+gi+',false)">+ Add Big Pack</button></div>').join('');
}
function renderPayToggles(){ var el=document.getElementById('payToggles'); if(!el) return; el.innerHTML='Card <input type="checkbox" '+(paySettings.card?'checked':'')+'> Apple Pay <input type="checkbox" '+(paySettings.apple?'checked':'')+'> USDT <input type="checkbox" '+(paySettings.usdt?'checked':'')+'> Bitcoin <input type="checkbox" '+(paySettings.btc?'checked':'')+'>'; }

// START
loadAll(); applyStoreName(); applyTheme(curTheme); renderMainBanner(); renderAll();
