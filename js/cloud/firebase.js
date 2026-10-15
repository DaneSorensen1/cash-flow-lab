import {summarize,publicSummary} from '../engine/summary.js';
// Pinned CDN modules keep the production app buildless. Loaded only if configured.
const SDK='13.0.0';let shared;
export async function connectFirebase(config){if(!config.firebase)return null;if(shared)return shared;shared=(async()=>{const [app,auth,fs]=await Promise.all([import(`https://www.gstatic.com/firebasejs/${SDK}/firebase-app.js`),import(`https://www.gstatic.com/firebasejs/${SDK}/firebase-auth.js`),import(`https://www.gstatic.com/firebasejs/${SDK}/firebase-firestore.js`)]);const instance=app.getApps().length?app.getApp():app.initializeApp(config.firebase);const a=auth.getAuth(instance);await auth.setPersistence(a,auth.browserLocalPersistence);await a.authStateReady();const user=a.currentUser||(await auth.signInAnonymously(a)).user;return {fs,db:fs.getFirestore(instance),uid:user.uid,auth:a};})().catch(e=>{shared=null;throw e;});return shared;}
export function createCloud(config,getState,persist,status){let connection=null,timer=null,busy=false,retry=2000,stopped=false;
 async function init(){if(!config.firebase){status('Progress saves on this device · local mode');return;}try{connection=await connectFirebase(config);getState().uid=connection.uid;persist();status('Class sync ready · progress saves locally first');schedule();}catch{status('Class sync unavailable · progress still saves on this device');schedule(retry);retry=Math.min(retry*2,60000);}}
 function schedule(delay=1200){if(!config.firebase||stopped)return;clearTimeout(timer);timer=setTimeout(flush,delay);}
 async function flush(){if(busy){schedule();return;}if(!connection){await init();return;}const state=getState();if(!state.identity)return;busy=true;
 try{const {fs,db,uid}=connection;const doc=(col,key)=>fs.doc(db,col,key);const summary=summarize(state,config);summary.uid=uid;await fs.setDoc(doc('cfl_players',uid),{uid,name:state.identity.name,block:state.identity.block,updatedAt:Date.now()});try{await fs.setDoc(doc('cfl_stats',uid),JSON.parse(JSON.stringify(summary)));}catch(e){const {testPrep,...rest}=summary;await fs.setDoc(doc('cfl_stats',uid),JSON.parse(JSON.stringify(rest)));console.warn('cfl_stats: testPrep not yet allowed by Firestore rules; saved without it');}
 const sent=new Set(state.cloud.sent||[]);const pending=state.attempts.filter(a=>!sent.has(a.attemptId)).slice(0,30);
 for(const a of pending){const ref=doc('cfl_attempts',uid+'_'+a.attemptId);const existing=await fs.getDoc(ref);if(!existing.exists())await fs.setDoc(ref,JSON.parse(JSON.stringify({...a,uid,name:state.identity.name,block:state.identity.block})));sent.add(a.attemptId);state.cloud.sent=[...sent];persist();}
 if(config.leaderboard?.enabled){await fs.setDoc(doc('cfl_public_stats',uid),publicSummary(summary));}else{await fs.deleteDoc(doc('cfl_public_stats',uid)).catch(()=>{});}
 retry=2000;status('Saved on this device · synced to class');if(state.attempts.some(a=>!sent.has(a.attemptId)))schedule(200);
 }catch{status('Saved on this device · class sync will retry');schedule(retry);retry=Math.min(retry*2,60000);}finally{busy=false;}}
 return {init,schedule,flush,stop(){stopped=true;clearTimeout(timer);}};
}
export async function teacherConnection(config){const c=await connectFirebase(config);if(!c)return null;const authorized=(await c.fs.getDoc(c.fs.doc(c.db,'cfl_teachers',c.uid))).exists();return {...c,authorized};}
