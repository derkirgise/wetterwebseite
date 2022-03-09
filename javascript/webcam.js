var bllist = ["BW","BY","BE","BB","HB","HH","HE","MV","NI","NW","RP","SL","SN","ST","SH","TH"];
var blName = ["Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen","Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz","Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen"];
var blApilist = ["Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg","Hesse","Mecklenburg-Western Pomerania","Lower Saxony","North Rhine-Westphalia","Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt","Schleswig-Holstein","Thuringia"]





const videolink = ["https://www.youtube.com/embed/55sS4BroQGw?autoplay=1&mute=1",
"https://www.youtube.com/embed/fzY1Pcj8XhM?autoplay=1&mute=1",
"https://www.youtube.com/embed/Qrp9WQegYX4?autoplay=1&mute=1",
"https://www.panoramablick.com/embed/29106",
"https://www.panoramablick.com/embed/29562",
"https://www.youtube.com/embed/OqFpq68VRqc?autoplay=1&mute=1",
"https://www.youtube.com/embed/Z2GiSzeJsxc?autoplay=1&mute=1",
"https://www.youtube.com/embed/cCc2nazd7jQ?autoplay=1&mute=1",
"https://www.youtube.com/embed/SZp1Q6LX7Wk?autoplay=1&mute=1",
"https://www.youtube.com/embed/i179T7RN1y4?autoplay=1&mute=1",
"https://www.panoramablick.com/embed/28935",
"https://www.panoramablick.com/embed/30385",
"https://www.panoramablick.com/embed/30323",
"https://www.youtube.com/embed/Xdz0TiyF7LY?autoplay=1&mute=1",
"https://www.youtube.com/embed/2YO5Dq7DOGw?autoplay=1&mute=1",
"https://www.youtube.com/embed/huTfRXMDFTk?autoplay=1&mute=1"];

var maplink = ["https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d837.9760674714652!2d9.789166240609381!3d48.09814303927475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479bc59cfe3286e1%3A0xc272d1576dd5c9a5!2sB%C3%BCrgermeisteramt%20Biberach%20an%20der%20Ri%C3%9F%20(Rathaus)!5e1!3m2!1sde!2sde!4v1646613140910!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.3424098529504!2d12.52810895135147!3d47.89105757617509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x825f392763f485c!2zNDfCsDUzJzI3LjgiTiAxMsKwMzEnNDkuMSJF!5e0!3m2!1sde!2sde!4v1646675577105!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.0526996656367!2d13.334278451481772!3d52.51438534429859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a85106c3af6af9%3A0xeb8cfeb90ef2262d!2sTiergarten!5e0!3m2!1sde!2sde!4v1646678833366!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19757.51814030602!2d14.313452839851378!3d51.75699622651686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47087468c70cd015%3A0xea9d69304b06fa96!2sNiederlausitz%20aktuell!5e0!3m2!1sde!2sde!4v1646690888771!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11278.426194801837!2d8.574314946104632!3d53.539967086602076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b6b111c4204e61%3A0x426cf77630073a0!2sBremerhaven!5e0!3m2!1sde!2sde!4v1646691226135!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d303368.04948368686!2d9.918183878884177!3d53.55661313356823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b161837e1813b9%3A0x4263df27bd63aa0!2sHamburg!5e0!3m2!1sde!2sde!4v1646676960841!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159671.99780826125!2d8.528855941234003!3d51.295024986848944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bb96a322afad87%3A0x7853dfa67caf33c4!2s34508%20Willingen%20(Upland)!5e0!3m2!1sde!2sde!4v1646676275414!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296906.31615230645!2d13.16010340600833!3d54.45268951183914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ab43be69cbbd7f%3A0x80ba77d923cc7534!2zUsO8Z2Vu!5e0!3m2!1sde!2sde!4v1646678161124!5m2!1sde!2sde",
"nhttps://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.5967704442223!2d8.636510651522315!3d53.8855962417852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b404c0d6dbfcf9%3A0x42ee6e1a916cae7e!2sDuhnen%2C%2027476%20Cuxhaven!5e0!3m2!1sde!2sde!4v1646676088255!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228872.62314748234!2d6.8933595684481475!3d50.671026818317294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf0316fbf3ef65%3A0x42760fc4a2a7d80!2s53359%20Rheinbach!5e0!3m2!1sde!2sde!4v1646679623957!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82126.3022853391!2d8.172319453683743!3d49.965476236440445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd912e33df1379%3A0x422d4d510db1ba0!2sMainz!5e0!3m2!1sde!2sde!4v1646691292883!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83345.21572566756!2d6.912327182544494!3d49.24724803902886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4795b152e302c0eb%3A0x422d4d510db6b80!2sSaarbr%C3%BCcken!5e0!3m2!1sde!2sde!4v1646691399267!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.917891925836!2d13.744944515753337!3d51.054603879563246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709cf43a2d90c97%3A0xd3cab83670db49a4!2sCarolabr%C3%BCcke%2C%20Dresden!5e0!3m2!1sde!2sde!4v1646691530918!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159052.95322877145!2d11.832290619218188!3d51.47279915430639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a66347fcfc709f%3A0x4236659f806e460!2sHalle%20(Saale)!5e0!3m2!1sde!2sde!4v1646678770493!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1184294.6639428297!2d7.224969561663418!3d54.57505205283237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b49185d6e344e5%3A0x52b294625db15b7a!2sSchl%C3%BCttsiel%2C%2025842%20Ockholm!5e0!3m2!1sde!2sde!4v1646678503225!5m2!1sde!2sde",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.994249987742!2d10.643598139713983!3d51.108566256526395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x417196e46cb5c089%3A0xd9e0e0cf95d9b841!2sRathaus%20Bad%20Langensalza!5e0!3m2!1sde!2sde!4v1646676817551!5m2!1sde!2sde"];


function selectbl(index){
//index 0 - 15 um land zu wählen
console.log(videolink[index]);
document.getElementById("mainVid").src = videolink[index];
document.getElementById("mainMap").src = maplink[index];
document.getElementById("currentBl").innerHTML = blName[index];
}

if (localStorage.state != null){
  console.log("HALLLLLLOOOOOO");
  console.log(blApilist.indexOf(localStorage.state));
  selectbl(blApilist.indexOf(localStorage.state));
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlState = urlParams.get('state')

console.log(urlState);


if(urlState != null){
  selectbl(bllist.indexOf(urlState));
}




