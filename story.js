/* Pure progression model, shared by the browser and focused Node tests. */
(function(root){
'use strict';
class Journey {
 constructor(planets,raw={}){this.planets=planets;raw=raw&&typeof raw==='object'?raw:{};const ids=new Set(planets.flatMap(p=>p.memories.map(m=>m.id)));this.memories=new Set((Array.isArray(raw.memories)?raw.memories:[]).filter(id=>ids.has(id)));this.endingSeen=raw.endingSeen===true;this.planet=planets.some(p=>p.id===raw.planet)&&this.unlocked(raw.planet)?raw.planet:planets[0].id;}
 definition(id){return this.planets.find(p=>p.id===id);}
 count(id){return this.definition(id).memories.filter(m=>this.memories.has(m.id)).length;}
 complete(id){const p=this.definition(id);return !!p&&p.memories.every(m=>this.memories.has(m.id));}
 unlocked(id){const p=this.definition(id);return !!p&&(!p.requires||p.requires.every(req=>this.complete(req)));}
 canDream(planetId,memoryId){const p=this.definition(planetId),m=p?.memories.find(m=>m.id===memoryId);return !!m&&this.unlocked(planetId)&&(!m.final||p.memories.filter(a=>!a.final).every(a=>this.memories.has(a.id)));}
 remember(planetId,memoryId){if(!this.canDream(planetId,memoryId))return {ok:false};const wasComplete=this.complete(planetId),isNew=!this.memories.has(memoryId);this.memories.add(memoryId);return {ok:true,isNew,starLit:!wasComplete&&this.complete(planetId),ending:planetId==='origin'&&this.complete(planetId)};}
 travel(id){if(!this.unlocked(id))return false;this.planet=id;return true;}
 snapshot(){return {version:2,planet:this.planet,memories:[...this.memories],endingSeen:this.endingSeen};}
 static migrate(raw){raw=raw&&typeof raw==='object'?raw:{};const map={'last-book':'minato-cafe',station:'minato-ticket',letters:'minato-laundry',soup:'home-soup',garden:'home-garden'};return {version:2,planet:raw.planet===1?'home':'minato',memories:(Array.isArray(raw.memories)?raw.memories:[]).map(id=>map[id]).filter(Boolean)};}
}
root.Journey=Journey;if(typeof module!=='undefined')module.exports=Journey;
})(typeof window!=='undefined'?window:globalThis);
