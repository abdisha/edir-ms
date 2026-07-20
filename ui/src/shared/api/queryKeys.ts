// shared/api/queryKeys.ts

export const queryKeys = {
    edir: ["edir"] as const,
    member: ["member"] as const,
    contribution: ["contribution"] as const,
    memberContribution:(uuid:string)=>['member',uuid,'contribution'] as const,
};