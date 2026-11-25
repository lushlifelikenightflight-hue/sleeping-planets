/* Independent pointer capture lets both thumbs steer at the same time. */
(function(root){
'use strict';
class VirtualStick {
 constructor(element,enabled,onStart=()=>{}){
  this.element=element;this.x=0;this.y=0;this.pointerId=null;
  const update=e=>{
   const dx=e.clientX-this.center.x,dy=e.clientY-this.center.y,d=Math.hypot(dx,dy);
   const amount=Math.min(d/this.radius,1),strength=Math.max(0,(amount-.12)/.88);
   this.x=d?dx/d*strength:0;this.y=d?dy/d*strength:0;
   element.style.setProperty('--stick-x',`${d?dx/d*amount*this.radius:0}px`);
   element.style.setProperty('--stick-y',`${d?dy/d*amount*this.radius:0}px`);
  };
  element.addEventListener('pointerdown',e=>{
   if(e.button!==0||this.pointerId!==null||!enabled())return;
   e.preventDefault();e.stopPropagation();
   const r=element.getBoundingClientRect();this.center={x:r.left+r.width/2,y:r.top+r.height/2};this.radius=r.width*.28;
   this.pointerId=e.pointerId;element.setPointerCapture(e.pointerId);element.classList.add('active');onStart();update(e);
  });
  element.addEventListener('pointermove',e=>{if(e.pointerId===this.pointerId){e.preventDefault();e.stopPropagation();update(e);}});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])element.addEventListener(type,e=>{if(e.pointerId===this.pointerId){e.preventDefault();e.stopPropagation();this.reset();}});
 }
 reset(){
  const id=this.pointerId;this.pointerId=null;this.x=0;this.y=0;
  this.element.style.setProperty('--stick-x','0px');this.element.style.setProperty('--stick-y','0px');this.element.classList.remove('active');
  if(id!==null&&this.element.hasPointerCapture(id))this.element.releasePointerCapture(id);
 }
}
root.VirtualStick=VirtualStick;
})(typeof window==='undefined'?globalThis:window);
