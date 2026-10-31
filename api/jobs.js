const technical = /embedded|firmware|hardware|electronics|electrical|silicon|\bSoC\b|\bCPU\b|\bRTL\b|\bASIC\b|\bFPGA\b|physical design|verification|validation|RISC-V|low.level|\bDFT\b/i;
const junior = /intern|graduate|entry.level|junior|trainee|apprentice|early.career/i;
function eligible(j) { return technical.test(j.title) && junior.test(j.title) && !/senior|staff|principal|manager|director/i.test(j.title); }
module.exports = async function handler(req, res) {
  const sources = [{board:'tenstorrentuniversity',name:'Tenstorrent University'},{board:'tenstorrent',name:'Tenstorrent'}];
  const results = await Promise.all(sources.map(async s=>{
    try {
      const r=await fetch(`https://boards-api.greenhouse.io/v1/boards/${s.board}/jobs`,{signal:AbortSignal.timeout(9000)});
      if(!r.ok) throw new Error('Feed unavailable');
      const data=await r.json();
      if(!Array.isArray(data.jobs)) throw new Error('Invalid feed');
      return {source:s.name,status:'ok',jobs:data.jobs.filter(eligible).map(j=>({id:`gh-${j.id}`,title:j.title,company:'Tenstorrent',location:j.location?.name||'See listing',url:j.absolute_url,updated:j.updated_at,source:s.name,type:/intern/i.test(j.title)?'Internship':'Graduate role'}))};
    }catch(e){return {source:s.name,status:'unavailable',jobs:[]};}
  }));
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=1800');
  res.status(200).json({checkedAt:new Date().toISOString(),jobs:[...new Map(results.flatMap(r=>r.jobs).map(j=>[j.id,j])).values()],sources:results.map(({source,status})=>({source,status})),coverage:'Selected public company feeds only. LinkedIn and Naukri use outbound searches. Eligibility must be checked on the original listing.'});
};
module.exports.eligible=eligible;
