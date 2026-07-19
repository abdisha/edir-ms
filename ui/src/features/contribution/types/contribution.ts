export interface AddContributionRequest {
    name: string
    description: string
    startDate: string
    endDate: string
    dueDate: string
    contributionAmount: number
    penaltyAmount: number
    penaltyType: string
}

export interface ContributionResponse{
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

