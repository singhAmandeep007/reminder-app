"use strict";(self.webpackChunktodo_app=self.webpackChunktodo_app||[]).push([[386,176],{5386:(t,e,d)=>{d.r(e),d.d(e,{createReminder:()=>A,deleteReminder:()=>g,getReminderGroups:()=>l,getReminders:()=>p});var r=d(4880),a=d(153),s=d(4349),i=d(1176);const n={id:(0,s.uR)(),name:"group 1",createdAt:"2021-09-01T00:00:00Z",updatedAt:"2021-09-01T00:00:00Z"},u={id:(0,s.uR)(),name:"group 2",createdAt:"2021-09-03T00:00:00Z",updatedAt:"2021-09-03T00:00:00Z"},o=[n,u],c=[{id:(0,s.uR)(),state:"ACTIVE",title:"task 1.1",isPinned:!1,group:n,createdAt:"2021-09-02T00:00:00Z",updatedAt:"2021-09-02T00:00:00Z"},{id:(0,s.uR)(),state:"ACTIVE",title:"task 1.2",isPinned:!1,group:n,createdAt:"2021-10-04T00:00:00Z",updatedAt:"2021-10-04T00:00:00Z"},{id:(0,s.uR)(),state:"ACTIVE",title:"task 2.2",isPinned:!1,group:u,createdAt:"2021-10-04T00:00:00Z",updatedAt:"2021-10-04T00:00:00Z"},{id:(0,s.uR)(),state:"ACTIVE",title:"task 3.1",isPinned:!1,createdAt:"2021-10-05T00:00:00Z",updatedAt:"2021-10-05T00:00:00Z"},{id:(0,s.uR)(),state:"ACTIVE",title:"task 3.2",isPinned:!1,createdAt:"2021-10-05T00:00:00Z",updatedAt:"2021-10-05T00:00:00Z",group:u}],p=r.L.get((0,i.urlPrefix)("/reminders"),(t=>{let{request:e}=t;const d=(0,s.wm)(e.url);let r=structuredClone(c);return d.groupId&&(r=r.filter((t=>{var e;return(null===t||void 0===t||null===(e=t.group)||void 0===e?void 0:e.id)===d.groupId}))),d.state&&(r=r.filter((t=>t.state===d.state))),a.c.json({data:r},{status:200})})),l=r.L.get((0,i.urlPrefix)("/reminder-groups"),(()=>a.c.json({data:o},{status:200}))),A=r.L.post((0,i.urlPrefix)("/reminders"),(async t=>{let{request:e}=t;const{title:d,groupId:r}=await e.json(),i=o.find((t=>t.id===r));if(r&&!i)return a.c.json({message:"Reminder Group with id ".concat(r," not found!")},{status:404});const n={id:(0,s.uR)(),state:"ACTIVE",title:d,isPinned:!1,...r?i:{},createdAt:(new Date).toISOString(),updatedAt:(new Date).toISOString()};return c.push(n),a.c.json({data:n},{status:201})})),g=r.L.delete((0,i.urlPrefix)("/reminders/:id"),(t=>{let{params:e}=t;const d=c.findIndex((t=>t.id===e.id));return-1===d?a.c.json({message:"Reminder with id ".concat(e.id," not found!")},{status:404}):(c.splice(d,1),a.c.json({message:"Reminder with id ".concat(e.id," deleted!")},{status:200}))}))},1176:(t,e,d)=>{d.r(e),d.d(e,{urlPrefix:()=>a});const r="https://todo-app.com/api/v1/",a=t=>{if("/"!==t[0])throw new Error("MSW handler path should start with a forward slash.");return"/"===r[27]?"".concat(r).concat(t.slice(1)):"".concat(r).concat(t)}}}]);
//# sourceMappingURL=386.7df48e0d.chunk.js.map