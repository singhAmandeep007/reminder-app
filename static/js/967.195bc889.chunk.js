"use strict";(self.webpackChunktodo_app=self.webpackChunktodo_app||[]).push([[967],{967:(e,s,r)=>{r.d(s,{Reminders:()=>N});var i=r(458),l=r(379),a=r(686),d=r(788),c=r(107),n=r(899),t=r(742),o=r(808),x=r(579);const m=e=>{let{children:s,...r}=e;return(0,x.jsxs)(t.$n,{size:"icon",variant:"ghost",className:"shrink-0 opacity-30 hover:bg-accent-dark hover:text-destructive hover:opacity-100",...r,children:[(0,x.jsx)(o.A,{className:"icon"}),s]})},h=e=>{let{reminder:s}=e;return(0,x.jsxs)("div",{className:"flex flex-1 items-center justify-between gap-2 py-2","data-testid":"reminder-item-".concat(s.id),children:[(0,x.jsx)("div",{children:s.title}),(0,x.jsx)(m,{"data-testid":"delete-reminder-item-".concat(s.id)})]})},j=()=>{var e;const s=(0,c.S9)(),{data:r,refetch:i}=(0,c.z5)(s),{data:l}=(0,c.yj)(),a=l&&(null===(e=l.find((e=>e.id===s.groupId)))||void 0===e?void 0:e.name);return(0,x.jsxs)("div",{className:"flex flex-1 flex-col overflow-hidden p-4",children:[(0,x.jsxs)("div",{className:"mb-2 flex items-center justify-between",children:[(0,x.jsx)(t.o5,{variant:"h3",className:"text-md flex items-center justify-between font-bold leading-none","data-testid":"active-list-title",children:a||"All"}),(0,x.jsx)("div",{className:"flex gap-2",children:(0,x.jsx)(t.$n,{size:"icon",variant:"ghost",className:"hover:text-primary","data-testid":"refresh-reminder-list",children:(0,x.jsx)(n.A,{className:"icon",onClick:i})})})]}),r&&(0,x.jsx)("div",{className:"flex-1 overflow-scroll",children:(0,x.jsx)("ul",{className:"divide divide-y",children:r.map((e=>(0,x.jsx)("li",{children:(0,x.jsx)(h,{reminder:e})},e.id)))})})]})};var v=r(360),f=r(43);const p=e=>{let{reminderGroup:s}=e;const r=(0,c.jL)(),{groupId:i}=(0,c.GV)(c.hk),l=i===(null===s||void 0===s?void 0:s.id),a=(0,c.cn)("flex flex-1 items-center justify-between py-2 cursor-pointer gap-2"),d=(0,c.cn)(l&&"text-primary"),n=(0,f.useCallback)((e=>{r((0,c.dR)(e))}),[r]);return s?(0,x.jsxs)("div",{className:a,"data-testid":"reminder-group-item-".concat(s.id),onClick:()=>n({groupId:s.id}),children:[(0,x.jsxs)("div",{className:d,children:[" ",s.name]}),(0,x.jsx)(m,{"data-testid":"delete-reminder-group-item-".concat(s.id)})]}):(0,x.jsx)("div",{className:a,"data-testid":"reminder-group-item-all",onClick:()=>n({groupId:void 0}),children:(0,x.jsx)("div",{className:d,children:"All"})})},u=()=>{const{data:e}=(0,c.kI)();return(0,x.jsxs)("div",{className:"flex min-w-[200px] flex-1 flex-col overflow-hidden bg-secondary p-4",children:[(0,x.jsx)("div",{className:"mb-2 flex justify-center",children:(0,x.jsxs)(t.$n,{className:"gap-1 hover:bg-accent-dark hover:text-primary",variant:"ghost",children:[(0,x.jsx)(v.A,{className:"icon"}),"Add list"]})}),(0,x.jsx)("div",{className:"flex-1 overflow-scroll",children:(0,x.jsxs)("ul",{className:"divide divide-y",children:[(0,x.jsx)("li",{children:(0,x.jsx)(p,{})},"all"),e&&e.map((e=>(0,x.jsx)("li",{children:(0,x.jsx)(p,{reminderGroup:e})},e.id)))]})})]})},N=()=>{const{isBelowMd:e}=(0,d.d)("md");return(0,x.jsx)("div",{className:"mx-auto h-full max-w-screen-md p-8",children:(0,x.jsxs)("div",{className:"flex h-full flex-col rounded border-2 border-primary shadow-lg lg:h-3/4",children:[(0,x.jsx)("nav",{className:"flex h-[--navbar-height] border-b-2 border-primary",children:(0,x.jsx)("ul",{className:"flex flex-1 items-center justify-between px-4",children:(0,x.jsx)("li",{children:"Reminders"})})}),(0,x.jsxs)(i.YZ,{direction:e?"vertical":"horizontal",className:"flex-1",autoSaveId:"reminders-panel-group",children:[(0,x.jsx)(i.Zk,{maxSize:50,className:"flex flex-col",children:(0,x.jsx)(u,{})}),(0,x.jsx)(i.TW,{className:"group",children:(0,x.jsx)("div",{className:(0,c.cn)("flex h-full w-8 items-center border-primary bg-secondary",e?"h-8 w-full border-b-2":"border-r-2"),children:(0,x.jsx)("span",{className:(0,c.cn)("mx-auto rounded group-hover:bg-primary group-hover:text-secondary",e?"px-1":"py-1"),children:e?(0,x.jsx)(l.A,{className:"icon"}):(0,x.jsx)(a.A,{className:"icon"})})})}),(0,x.jsx)(i.Zk,{className:"flex flex-col",children:(0,x.jsx)(j,{})})]})]})})}}}]);
//# sourceMappingURL=967.195bc889.chunk.js.map