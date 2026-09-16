import {useEffect,useRef} from 'react';
/** Focus trap, Escape, opener restoration and inert background for modal overlays. */
export function useDialog(onClose){
 const ref=useRef(null),closeRef=useRef(onClose);
 useEffect(()=>{closeRef.current=onClose;},[onClose]);
 useEffect(()=>{
  const root=ref.current,opener=document.activeElement;if(!root)return;
  const inert=[];let branch=root;
  while(branch.parentElement&&branch!==document.body){for(const sibling of branch.parentElement.children)if(sibling!==branch){inert.push([sibling,sibling.inert]);sibling.inert=true;}branch=branch.parentElement;}
  const items=()=>[...root.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),[tabindex="0"]')];
  (items()[0]||root).focus();
  const handle=e=>{
   if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeRef.current?.();}
   if(e.key==='Tab'){const all=items(),first=all[0],last=all.at(-1);if(!first){e.preventDefault();root.focus();}else if(e.shiftKey&&(document.activeElement===first||!root.contains(document.activeElement))){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||!root.contains(document.activeElement))){e.preventDefault();first.focus();}}
  };
  document.addEventListener('keydown',handle,true);
  return ()=>{document.removeEventListener('keydown',handle,true);inert.forEach(([el,value])=>{el.inert=value;});if(opener?.isConnected)opener.focus();};
 },[]);return ref;
}
