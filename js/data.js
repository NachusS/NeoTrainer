'use strict';
window.NEO_DATA = {
  version: '4.0.0',
  build: '28/07/2026 13:30',
  equipment: [
    ['none','Sin material'],['mat','Esterilla'],['dumbbells','Mancuernas'],['bands','Bandas'],
    ['pullup','Barra de dominadas'],['bench','Banco'],['trx','TRX'],['kettlebell','Kettlebell']
  ],
  goals: [
    ['general','Mejorar condición física'],['fatloss','Reducir grasa corporal'],['strength','Ganar fuerza'],
    ['muscle','Ganar masa muscular'],['mobility','Mejorar movilidad'],['lower','Potenciar piernas'],['pullupGoal','Conseguir dominadas']
  ],
  activity: [
    ['sedentary','Sedentario'],['light','Actividad ligera'],['moderate','Actividad moderada'],['active','Muy activo']
  ],
  limitations: [
    ['none','Ninguna'],['knees','Rodillas'],['back','Espalda'],['shoulders','Hombros'],['wrists','Muñecas'],['cardio','Limitación cardiovascular']
  ],
  exercises: [
    {id:'incline',name:'Flexiones inclinadas',area:'Pecho · Tríceps',level:1,impact:'low',equipment:['none'],avoid:['wrists'],duration:35,reps:'8–12',muscles:'Pecho, tríceps y hombro anterior',steps:['Apoya las manos sobre una superficie estable.','Mantén el cuerpo alineado.','Desciende el pecho con control.','Empuja sin bloquear bruscamente los codos.']},
    {id:'knees',name:'Flexiones con rodillas',area:'Pecho · Técnica',level:1,impact:'low',equipment:['mat'],avoid:['knees','wrists'],duration:35,reps:'8–12',muscles:'Pecho, tríceps y core',steps:['Apoya rodillas y manos.','Activa abdomen y glúteos.','Baja el pecho manteniendo la espalda neutra.','Regresa de forma controlada.']},
    {id:'pushup',name:'Flexiones de pecho',area:'Pecho · Tríceps',level:2,impact:'medium',equipment:['none'],avoid:['wrists','shoulders'],duration:40,reps:'6–12',muscles:'Pecho, tríceps, hombro y core',steps:['Coloca manos algo más anchas que los hombros.','Mantén el cuerpo en línea recta.','Flexiona codos y baja el pecho.','Empuja hasta volver al inicio.']},
    {id:'diamond',name:'Flexiones diamante',area:'Tríceps · Pecho',level:3,impact:'medium',equipment:['none'],avoid:['wrists','shoulders'],duration:40,reps:'5–10',muscles:'Tríceps, pecho y core',steps:['Junta las manos bajo el pecho.','Mantén codos próximos al cuerpo.','Desciende con control.','Empuja manteniendo la alineación.']},
    {id:'decline',name:'Flexiones declinadas',area:'Pecho superior',level:3,impact:'medium',equipment:['bench'],avoid:['wrists','shoulders'],duration:40,reps:'6–10',muscles:'Pecho superior, hombros y tríceps',steps:['Apoya los pies en una superficie estable.','Mantén abdomen firme.','Desciende el pecho entre las manos.','Empuja sin perder la línea corporal.']},
    {id:'explosive',name:'Flexiones explosivas',area:'Pecho · Potencia',level:4,impact:'high',equipment:['mat'],avoid:['wrists','shoulders','cardio'],duration:30,reps:'4–8',muscles:'Pecho, tríceps y potencia del tren superior',steps:['Adopta posición de flexión.','Desciende con control.','Empuja de forma explosiva.','Aterriza suavemente y estabiliza.']}
  ]
};
