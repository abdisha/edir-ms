export const ContributionQueryKey ={
    contribution: ["contribution"] as const,
    memberContribution:(uuid:string)=>['member',uuid,'contribution'] as const,
}

