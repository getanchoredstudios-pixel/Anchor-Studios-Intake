'use strict';
const packages = {
  brand: {name:'Brand Foundations',price:650,description:'Primary logo and alternate lockup, color palette and typography, one-page brand guide, and two rounds of refinements.'},
  web: {name:'Website Launch',price:1500,description:'Up to five pages, responsive design and development, contact form and basic SEO setup, and two rounds of refinements.'},
  social: {name:'Social Starter',price:450,description:'12 branded social templates, 12 accompanying captions, a 30-day content calendar, and one round of refinements.'}
};
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}));
const dialog=document.querySelector('#package-dialog');
let selected;
document.querySelectorAll('[data-package]').forEach(button=>button.addEventListener('click',()=>{
  selected=packages[button.dataset.package];
  document.querySelector('#dialog-title').textContent=selected.name;
  document.querySelector('#dialog-price').textContent='$'+selected.price.toLocaleString('en-US')+' / one time';
  document.querySelector('#dialog-description').textContent=selected.description;
  document.querySelector('#brief-link').href='intake.html?package='+encodeURIComponent(selected.name);
  dialog.showModal();document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('#download-scope').addEventListener('click',()=>{
 if(!selected)return;
 const text='ANCHORED STUDIOS\n'+selected.name+'\n$'+selected.price+' USD / one time\n\n'+selected.description+'\n\nFinal scope and scheduling must be confirmed before work begins. Domain, hosting, paid tools, printing, and advertising costs are separate. Online checkout is not available; no payment has been taken.\n';
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download=selected.name.toLowerCase().replaceAll(' ','-')+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
document.querySelector('#year').textContent=new Date().getFullYear();
