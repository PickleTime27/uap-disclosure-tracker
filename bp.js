const fs=require("fs");
["src/app/legislation","src/app/timeline","src/app/whistleblowers"].forEach(d=>fs.mkdirSync(d,{recursive:true}));
console.log("Folders created!");
