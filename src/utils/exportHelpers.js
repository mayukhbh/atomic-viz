function downloadUrl(href,filename){const link=document.createElement('a');link.href=href;link.download=filename;document.body.appendChild(link);link.click();link.remove();}
export function downloadBlob(blob,filename){const href=URL.createObjectURL(blob);try{downloadUrl(href,filename);}finally{setTimeout(()=>URL.revokeObjectURL(href),1000);}}
/** Capture the registered active Canvas and its retained postprocessed frame. */
export function captureScreenshot(canvas,filename='atomicviz'){
 if(!canvas||!canvas.width||!canvas.height)throw Error('No active 3D view. Open a view and try again.');
 const href=canvas.toDataURL('image/png');if(href==='data:,')throw Error('Canvas capture failed. Reload the view and retry.');
 downloadUrl(href,`${filename}-${Date.now()}.png`);
}
/** Static mesh snapshot. Labels, trails, stars and postprocessing are unsupported.
 * Snapshot meshes share geometry/materials; never dispose the live scene's resources.
 */
export async function exportGLTF(scene,filename='atomicviz-model'){
 if(!scene)throw Error('No active 3D scene. Open a view and try again.');
 const [{GLTFExporter},{Scene}]=await Promise.all([import('three/examples/jsm/exporters/GLTFExporter.js'),import('three')]);
 scene.updateMatrixWorld(true);const snapshot=new Scene();
 scene.traverseVisible(object=>{
  if(!object.isMesh||object.isInstancedMesh||!object.geometry||!object.material||object.material.isShaderMaterial||Array.isArray(object.material))return;
  const mesh=object.clone(false);mesh.matrixAutoUpdate=false;mesh.matrix.copy(object.matrixWorld);mesh.userData={};snapshot.add(mesh);
 });
 if(!snapshot.children.length)throw Error('This view has no supported meshes. Add atoms or choose a molecule first.');
 const data=await new GLTFExporter().parseAsync(snapshot,{binary:false});downloadBlob(new Blob([JSON.stringify(data)],{type:'model/gltf+json'}),`${filename}-${Date.now()}.gltf`);return data;
}
