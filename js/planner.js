'use strict';
window.NEO_PLANNER = (() => {
  const D = () => window.NEO_DATA;
  function bmi(profile){
    const w=Number(profile.weight), h=Number(profile.height)/100;
    return w>0&&h>0 ? w/(h*h) : null;
  }
  function bmiLabel(value){
    if(value===null) return {label:'Pendiente',tone:'neutral'};
    if(value<18.5) return {label:'Peso bajo',tone:'amber'};
    if(value<25) return {label:'Rango saludable',tone:'green'};
    if(value<30) return {label:'Sobrepeso',tone:'amber'};
    if(value<35) return {label:'Obesidad grado I',tone:'red'};
    if(value<40) return {label:'Obesidad grado II',tone:'red'};
    return {label:'Obesidad grado III',tone:'red'};
  }
  function readiness(profile){
    const required=['name','sex','age','weight','height','activity','goal','daysPerWeek','minutesPerSession'];
    return required.every(k=>profile[k]!==null&&profile[k]!==''&&profile[k]!==undefined);
  }
  function riskScore(profile){
    const age=Number(profile.age)||30, b=bmi(profile), limits=profile.limitations||[];
    let score=0;
    if(age>=65) score+=3; else if(age>=55) score+=2; else if(age>=45) score+=1;
    if(b!==null){ if(b>=35||b<17) score+=3; else if(b>=30||b<18.5) score+=2; else if(b>=27) score+=1; }
    if(profile.activity==='sedentary') score+=2;
    if(limits.includes('cardio')) score+=3;
    score+=Math.min(2,limits.filter(x=>x!=='none').length);
    return score;
  }
  function intensity(profile,stats){
    const r=riskScore(profile), completed=Number(stats.workouts)||0;
    if(r>=6) return {level:1,label:'Muy suave',sets:2,rest:105};
    if(r>=4) return {level:1,label:'Suave',sets:2,rest:90};
    if(r>=2) return {level:2,label:'Moderada',sets:3,rest:75};
    if(completed>=12 && profile.activity==='active') return {level:4,label:'Alta',sets:4,rest:45};
    if(completed>=5) return {level:3,label:'Media-alta',sets:3,rest:60};
    return {level:2,label:'Moderada',sets:3,rest:75};
  }
  function availableExercise(ex,profile,intensityLevel){
    const eq=profile.equipment||['none'];
    const limits=profile.limitations||[];
    const equipmentOk=ex.equipment.includes('none')||ex.equipment.some(x=>eq.includes(x));
    const limitationOk=!ex.avoid.some(x=>limits.includes(x));
    return equipmentOk && limitationOk && ex.level<=Math.max(1,intensityLevel);
  }
  function selectExercises(profile,stats){
    const intensityData=intensity(profile,stats);
    let list=D().exercises.filter(ex=>availableExercise(ex,profile,intensityData.level));
    if(!list.length) list=D().exercises.filter(ex=>ex.id==='incline'||ex.id==='knees');
    if(profile.goal==='strength'||profile.goal==='muscle') list.sort((a,b)=>b.level-a.level);
    if(profile.goal==='fatloss') list.sort((a,b)=>b.duration-a.duration);
    if(profile.goal==='mobility'||riskScore(profile)>=4) list.sort((a,b)=>a.level-b.level);
    return list.slice(0,Math.min(5,list.length));
  }
  function makePlan(profile,stats,startDate=new Date()){
    if(!readiness(profile)) return {ready:false,reason:'Completa el perfil para generar tu plan.'};
    const i=intensity(profile,stats), chosen=selectExercises(profile,stats);
    const requested=Math.max(2,Math.min(6,Number(profile.daysPerWeek)||3));
    const risk=riskScore(profile), days=risk>=6?Math.min(2,requested):risk>=4?Math.min(3,requested):requested;
    const patterns={2:[1,4],3:[1,3,5],4:[1,2,4,6],5:[1,2,3,5,6],6:[1,2,3,4,5,6]};
    const weekdayPattern=patterns[days]||patterns[3], sessions=[];
    for(let offset=0;offset<42 && sessions.length<days*4;offset++){
      const d=new Date(startDate); d.setHours(12,0,0,0); d.setDate(startDate.getDate()+offset);
      const wd=d.getDay()===0?7:d.getDay();
      if(!weekdayPattern.includes(wd)) continue;
      const rotation=sessions.length%Math.max(1,chosen.length);
      const ordered=[...chosen.slice(rotation),...chosen.slice(0,rotation)];
      sessions.push({
        id:`session-${d.toISOString().slice(0,10)}`,
        date:d.toISOString().slice(0,10),
        title:profile.goal==='lower'?'Fuerza y estabilidad':'Full body adaptado',
        minutes:Number(profile.minutesPerSession)||30,
        intensity:i.label,
        sets:i.sets,
        rest:i.rest,
        exercises:ordered.slice(0,Math.max(2,Math.min(4,Math.floor((Number(profile.minutesPerSession)||30)/8)))).map(x=>x.id),
        completed:false
      });
    }
    return {ready:true,days,intensity:i,exercises:chosen,sessions,reason:`Ajustado a ${profile.age} años, IMC ${bmi(profile).toFixed(1)}, actividad ${profile.activity} y objetivo ${profile.goal}.`};
  }
  return {bmi,bmiLabel,readiness,riskScore,intensity,selectExercises,makePlan};
})();
