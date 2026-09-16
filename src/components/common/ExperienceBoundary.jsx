import { Component } from 'react';
export class ExperienceBoundary extends Component {
 state={error:null};
 static getDerivedStateFromError(error){return {error};}
 componentDidCatch(error){console.error('AtomicViz view failed:',error);}
 render(){if(!this.state.error)return this.props.children;
 return <div role="alert" className="absolute inset-0 flex items-center justify-center p-8 text-white pointer-events-auto"><div className="max-w-md rounded-2xl border border-cyan-400/30 bg-slate-950/95 p-6"><h2 className="text-xl font-bold mb-3">This view could not load</h2><p className="text-white/70 mb-4">Try again or choose another section. If 3D remains unavailable, check your browser’s hardware acceleration.</p><button className="px-4 py-2 bg-cyan-500 text-black rounded-lg" onClick={()=>this.setState({error:null})}>Try again</button><button className="ml-3 px-4 py-2 bg-white/10 rounded-lg" onClick={()=>window.location.reload()}>Reload</button></div></div>;}
}
