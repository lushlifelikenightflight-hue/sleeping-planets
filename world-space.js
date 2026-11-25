/* Authored 3D spaces. Geometry, collision and interaction share these anchors. */
(function(root){
'use strict';
const rooms={
 fish:{name:'魚屋の店内',type:'fish',memories:['minato-fish']},
 cafe:{name:'喫茶・月舟',type:'cafe',memories:['minato-cafe']},
 station:{name:'駅の待合室',type:'station',memories:['minato-ticket']},
 laundry:{name:'路地の家',type:'laundry',memories:['minato-laundry']},
 cottage:{name:'灯りの残る家・室内',type:'cottage',memories:['home-soup','home-boots']},
 school:{name:'古い校舎',type:'school',memories:['origin-photo']},
 family:{name:'最後まで灯りのあった家',type:'family',memories:['origin-promise']},
 bedroom:{name:'少年の部屋',type:'bedroom',memories:['origin-room']}
};
const buildings={minato:[['fish',12.875,6.6,6,5.4],['cafe',24.75,7,6,6.5],['station',36.75,8,6,4.6],['laundry',55.5,5.8,6,6.2]],home:[['cottage',26.5,9,7,4.5]],origin:[['school',25.5,8,6,5.5],['family',39.25,7,6,6],['bedroom',50.5,6.5,6,5.8]]};
const rect=(x,z,w,d,id)=>({x,z,w,d,id});
function outdoor(planet){
 const houses=buildings[planet.id].map(([id,x,w,d,h])=>({id,x,z:-5,w,d,h,door:{x,z:-5+d/2+.65},...rooms[id]}));
 const points=planet.memories.filter(m=>!houses.some(b=>b.memories.includes(m.id))).map(m=>({...m,x:m.x/40,z:m.final?5.6:planet.id==='home'?-2:3.4,type:'memory'}));
 points.push(...houses.map(b=>({id:'door-'+b.id,type:'door',building:b.id,x:b.door.x,z:b.door.z,title:b.name})),{id:'ship',type:'ship',x:planet.ship/40,z:2.6,title:'宇宙船'});
 const colliders=houses.map(b=>rect(b.x,b.z,b.w,b.d,b.id));
 colliders.push(rect(planet.ship/40,4.8,2.8,2,'ship-hull'));
 for(let x=7;x<planet.width/40-2;x+=8)colliders.push(rect(x,6.3,.4,.4,'lamp-'+x));
 if(planet.id==='minato')colliders.push(rect(47,4.8,2.4,.8,'bench'),rect(51.75,6.7,2.4,.8,'last-bench'));
 if(planet.id==='home')colliders.push(rect(37.5,.4,2.4,.8,'garden-bench'),rect(38,-5,.6,.6,'tree'));
 if(planet.id==='origin')colliders.push(rect(31.5,5.2,2.4,.8,'bench'),rect(15,-6,.6,.6,'tree'));
 return {id:planet.id,room:null,name:planet.name,width:planet.width/40,bounds:{minX:.6,maxX:planet.width/40-.6,minZ:-11,maxZ:8},spawn:{x:planet.spawn/40,z:2.6},points,buildings:houses,colliders};
}
function interior(planet,id){
 const def=rooms[id];if(!def||!buildings[planet.id].some(b=>b[0]===id))throw new Error('Unknown room: '+id);
 const points=def.memories.map((mid,i)=>({...planet.memories.find(m=>m.id===mid),x:i?2.7:-2,z:i?1:0,type:'memory'}));
 points.push({id:'exit',type:'exit',x:0,z:3.25,title:'外へ出る'});
 const colliders=[rect(-2,-2,2.3,1.25,'table'),rect(4.35,-1.6,.8,4,'shelf'),rect(-4.3,-2,.8,3,'cabinet')];
 if(['cafe','cottage','family'].includes(def.type))colliders.push(rect(1.5,-1.9,1.6,1.1,'second-table'));
 if(['cafe','cottage','family'].includes(def.type))colliders.push(rect(-2,-2.9,2.4,.8,'chair-left'),rect(1.5,-2.8,2.4,.8,'chair-right'));
 if(def.type==='fish')for(let i=0;i<3;i++)colliders.push(rect(1+i,-2.6,.75,1,'crate-'+i));
 if(def.type==='school')for(let i=0;i<3;i++)colliders.push(rect(.7+i*.9,-2.5,.65,.7,'desk-'+i));
 if(def.type==='station')colliders.push(rect(1.8,-1.8,2.4,.8,'station-bench'));
 if(def.type==='bedroom')colliders.push(rect(2.6,-1.8,2,3.2,'bed'),rect(0,-2.25,1.6,.65,'window-seat'));
 colliders.push(rect(-3.7,2,.7,.7,'plant-left'),rect(3.9,2,.7,.7,'plant-right'));
 return {id:planet.id+':'+id,room:id,type:def.type,name:def.name,width:10,bounds:{minX:-4.65,maxX:4.65,minZ:-3.65,maxZ:3.65},spawn:{x:0,z:2.6},points,buildings:[],colliders};
}
function canStand(space,x,z,r=.24){const b=space.bounds;if(x<b.minX||x>b.maxX||z<b.minZ||z>b.maxZ)return false;return !space.colliders.some(c=>{const cx=Math.max(c.x-c.w/2,Math.min(c.x+c.w/2,x)),cz=Math.max(c.z-c.d/2,Math.min(c.z+c.d/2,z));return Math.hypot(x-cx,z-cz)<r;});}
function move(space,player,dx,dz){const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.15));for(let i=0;i<n;i++){if(canStand(space,player.x+dx/n,player.z))player.x+=dx/n;if(canStand(space,player.x,player.z+dz/n))player.z+=dz/n;}}
function clearLine(space,a,b){const n=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.15);for(let i=1;i<=n;i++)if(!canStand(space,a.x+(b.x-a.x)*i/n,a.z+(b.z-a.z)*i/n))return false;return true;}
function path(space,start,target){
 if(!target||!canStand(space,target.x,target.z))return [];
 if(clearLine(space,start,target))return [target];
 const step=.5,b=space.bounds,nx=Math.floor((b.maxX-b.minX)/step)+1,nz=Math.floor((b.maxZ-b.minZ)/step)+1;
 const pos=i=>({x:b.minX+(i%nx)*step,z:b.minZ+Math.floor(i/nx)*step});
 const cell=p=>Math.round((p.z-b.minZ)/step)*nx+Math.round((p.x-b.minX)/step);
 const s=cell(start),goal=cell(target),queue=[s],prev=new Map([[s,-1]]);let found=false;
 for(let head=0;head<queue.length;head++){const cur=queue[head];if(cur===goal){found=true;break;}const cx=cur%nx,cz=Math.floor(cur/nx);for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const x=cx+dx,z=cz+dz,i=z*nx+x;if(x<0||x>=nx||z<0||z>=nz||prev.has(i))continue;const p=pos(i);if(!canStand(space,p.x,p.z)||!clearLine(space,pos(cur),p))continue;prev.set(i,cur);queue.push(i);}}
 if(!found)return [];const result=[target];for(let i=goal;i!==s;i=prev.get(i))result.unshift(pos(i));const smooth=[];let current=start;while(result.length){let end=result.length-1;while(end>0&&!clearLine(space,current,result[end]))end--;current=result[end];smooth.push(current);result.splice(0,end+1);}return smooth;
}
function gait(distance,side=0){const phase=((distance/1.2+side*.5)%1+1)%1,swing=phase>=.5,u=swing?(phase-.5)*2:phase*2;return {z:swing?-.3+.6*u:.3-.6*u,y:swing?Math.sin(u*Math.PI)*.19:0,stance:!swing,phase};}
root.Space={rooms,outdoor,interior,canStand,move,path,clearLine,gait};
})(typeof window==='undefined'?globalThis:window);
