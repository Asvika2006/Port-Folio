const $=s=>document.querySelector(s),root=document.documentElement;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
// theme
const saved=localStorage.getItem("theme");
const setTheme=t=>{root.dataset.theme=t;$("#theme use").setAttribute("href","#i-"+(t==="dark"?"sun":"moon"))};
setTheme(saved||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
$("#theme").onclick=()=>{const t=root.dataset.theme==="dark"?"light":"dark";setTheme(t);try{localStorage.setItem("theme",t)}catch(e){}};
// skills (built from data so they're easy to edit)
const DV="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const L=(n,f)=>`<img src="${DV}${n}/${n}-${f||"original"}.svg" alt="" loading="lazy" onerror="this.remove()"${n==="github"?' class="inv"':""}>`;
const SK=[
 {t:"Languages",i:"code",s:[["Python",L("python")],["Java",L("java")],["JavaScript",L("javascript")],["HTML",L("html5")],["SQL",L("mysql")],["C",L("c")],["C++",L("cplusplus")]]},
 {t:"Web & security",i:"globe",s:[["Full-stack development"],["HTML5",L("html5")],["CSS3",L("css3")],["JavaScript",L("javascript")],["Browser extensions"]]},
 {t:"Core domains",i:"cpu",s:[["Artificial Intelligence"],["Cybersecurity"],["Data Science"],["Generative AI & AI Agents"],["Data Engineering"],["Computer Vision"],["Data Structures & Algorithms"]]},
 {t:"Tools & databases",i:"db",s:[["MySQL",L("mysql")],["Git",L("git")],["GitHub",L("github")],["OpenCV",L("opencv")],["MS Office"]]}];
$("#skillgrid").innerHTML=SK.map(g=>`<article class="card reveal tilt"><h3><svg class="i"><use href="#i-${g.i}"/></svg>${g.t}</h3><ul class="tags">${g.s.map(x=>`<li>${x[1]||""}${x[0].replace("&","&amp;")}</li>`).join("")}</ul></article>`).join("");
// typed
const el=$("#typed"),words=["secure systems","AI-powered tools","computer vision apps","full-stack web apps"];
if(reduce)el.textContent=words[0];else{let w=0,c=0,d=false;(function tick(){const t=words[w];c+=d?-1:1;el.textContent=t.slice(0,c);let ms=d?40:80;
 if(!d&&c===t.length){d=true;ms=1400}else if(d&&c===0){d=false;w=(w+1)%words.length;ms=300}setTimeout(tick,ms)})()}
// menu
const nav=$("#menu"),b=$(".burger");
b.onclick=()=>{const o=nav.classList.toggle("open");b.setAttribute("aria-expanded",o)};
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>{nav.classList.remove("open");b.setAttribute("aria-expanded",false)});
// scroll progress
addEventListener("scroll",()=>{const h=root.scrollHeight-innerHeight;$("#pg").style.width=(h>0?scrollY/h*100:0)+"%"},{passive:true});
// reveal + counters
const count=n=>{const to=+n.dataset.to,suf=n.dataset.suf||"";if(reduce){n.textContent=to+suf;return}let s=null;
 const f=t=>{s=s||t;const p=Math.min((t-s)/1200,1);n.textContent=Math.round(to*p)+suf;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll("[data-to]").forEach(count);io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(n=>io.observe(n));
// tilt + cursor glow (mouse only)
if(!reduce&&matchMedia("(hover:hover)").matches){
 document.querySelectorAll(".tilt").forEach(c=>{c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.style.transform=`perspective(800px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-4px)`});c.addEventListener("mouseleave",()=>c.style.transform="")});
 addEventListener("mousemove",e=>{const g=$("#glow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"},{passive:true})}
$("#yr").textContent=new Date().getFullYear();
$("#cf").onsubmit=e=>{e.preventDefault();const f=e.target;
 location.href="mailto:asvika2momlatha@gmail.com?subject="+encodeURIComponent("Portfolio message from "+f.n.value)+"&body="+encodeURIComponent(f.m.value+"\n\nFrom: "+f.n.value+" ("+f.e.value+")")};
