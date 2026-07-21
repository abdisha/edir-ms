export interface AddContributionRequest {
    name: string
    description: string
    startDate: Date
    endDate: Date
    dueDate: Date
    contributionAmount: number
    penaltyAmount: number
    penaltyType: string
}

export interface ContributionResponse{
    contributionStatus: string;
    id: string
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    dueDate: string,
    isClose:boolean,
    contributionAmount: number,
    penaltyAmount: number,
    penaltyType: string
}

export interface UpdateContribution{
    id: string
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    dueDate: string,
    isClose:boolean,
    contributionAmount: number,
    penaltyAmount: number,
    penaltyType: string
}


export interface Page {
    content: MemberContribution[]
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
}

export interface MemberContribution {
    id: string;
    fullName:string;
    memberId: string;
    contributionId: string;
    contributionAmount: number;
    penaltyAmount: number;
    rolledOverContribution: number;
    rolledOverPenalty: number;
    status:
        | "PENDING"
        | "PARTIALLY_PAID"
        | "PAID";
}
