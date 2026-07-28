// shared/api/queryKeys.ts

export const queryKeys = {
    edir: ["edir"] as const,
    member:(uuid:string)=> ["member",uuid] as const,
    createMember:["createMember"] as const,
    members:(page:number,size:number)=>['members',page,size] as const,
    contribution: ["contribution"] as const,
    memberContribution:(uuid:string)=>['member',uuid,'contribution'] as const,
};