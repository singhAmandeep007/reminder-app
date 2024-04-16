"use strict";(self.webpackChunktodo_app=self.webpackChunktodo_app||[]).push([[1,386,176],{1:(e,t,d)=>{d.r(t),d.d(t,{createReminder:()=>r.createReminder,deleteReminder:()=>r.deleteReminder,getReminderGroups:()=>r.getReminderGroups,getReminders:()=>r.getReminders});var r=d(5386)},5386:(e,t,d)=>{d.r(t),d.d(t,{createReminder:()=>m,deleteReminder:()=>g,getReminderGroups:()=>l,getReminders:()=>p});var r=d(4880),i=d(153),s=d(4349),a=d(1176);const n={id:(0,s.uR)(),name:"group 1",createdAt:"2021-09-01T00:00:00Z",updatedAt:"2021-09-01T00:00:00Z"},u={id:(0,s.uR)(),name:"group 2",createdAt:"2021-09-03T00:00:00Z",updatedAt:"2021-09-03T00:00:00Z"},o=[n,u],c=[{id:(0,s.uR)(),state:"ACTIVE",title:"task 1.1",isPinned:!1,group:n,createdAt:"2021-09-02T00:00:00Z",updatedAt:"2021-09-02T00:00:00Z"},{id:(0,s.uR)(),state:"ACTIVE",title:"task 1.2",isPinned:!1,group:n,createdAt:"2021-10-04T00:00:00Z",updatedAt:"2021-10-04T00:00:00Z"},{id:(0,s.uR)(),state:"ACTIVE",title:"task 2.2",isPinned:!1,group:u,createdAt:"2021-10-04T00:00:00Z",updatedAt:"2021-10-04T00:00:00Z"},{id:(0,s.uR)(),state:"ACTIVE",title:"task 3.1",isPinned:!1,createdAt:"2021-10-05T00:00:00Z",updatedAt:"2021-10-05T00:00:00Z"},{id:(0,s.uR)(),state:"ACTIVE",title:"task 3.2",isPinned:!1,createdAt:"2021-10-05T00:00:00Z",updatedAt:"2021-10-05T00:00:00Z",group:u}],p=r.L.get((0,a.urlPrefix)("/reminders"),(e=>{let{request:t}=e;const d=(0,s.wm)(t.url);let r=structuredClone(c);return d.groupId&&(r=r.filter((e=>{var t;return(null===e||void 0===e||null===(t=e.group)||void 0===t?void 0:t.id)===d.groupId}))),d.state&&(r=r.filter((e=>e.state===d.state))),i.c.json({data:r},{status:200})})),l=r.L.get((0,a.urlPrefix)("/reminder-groups"),(()=>i.c.json({data:o},{status:200}))),m=r.L.post((0,a.urlPrefix)("/reminders"),(async e=>{let{request:t}=e;const{title:d,groupId:r}=await t.json(),a=o.find((e=>e.id===r));if(r&&!a)return i.c.json({message:"Reminder Group with id ".concat(r," not found!")},{status:404});const n={id:(0,s.uR)(),state:"ACTIVE",title:d,isPinned:!1,...r?a:{},createdAt:(new Date).toISOString(),updatedAt:(new Date).toISOString()};return c.push(n),i.c.json({data:n},{status:201})})),g=r.L.delete((0,a.urlPrefix)("/reminders/:id"),(e=>{let{params:t}=e;const d=c.findIndex((e=>e.id===t.id));return-1===d?i.c.json({message:"Reminder with id ".concat(t.id," not found!")},{status:404}):(c.splice(d,1),i.c.json({message:"Reminder with id ".concat(t.id," deleted!")},{status:200}))}))},1176:(e,t,d)=>{d.r(t),d.d(t,{urlPrefix:()=>i});const r="https://todo-app.com/api/v1/",i=e=>{if("/"!==e[0])throw new Error("MSW handler path should start with a forward slash.");return"/"===r[27]?"".concat(r).concat(e.slice(1)):"".concat(r).concat(e)}}}]);
//# sourceMappingURL=1.9587c62a.chunk.js.map