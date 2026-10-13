import fs from 'node:fs';
const out='dist';
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
for(const name of ['index.html','teacher.html','board.html','config.js','icon.svg','.nojekyll','css','js'])fs.cpSync(name,`${out}/${name}`,{recursive:true});
console.log('Prepared static assets in dist/. Root files remain directly deployable to GitHub Pages.');
