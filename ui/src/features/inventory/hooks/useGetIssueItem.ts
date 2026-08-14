import {useQuery} from "@tanstack/react-query";
import {getIssueItems, getIssues} from "@/features/inventory/api/inventory.issue.api.ts";


export  function useGetIssue(){
    return useQuery({
        queryFn:()=>getIssues(),
        queryKey:["inventory-issue"]
    })
}

export function useGetIssueItem(id?:string){
    return useQuery({
        queryFn:()=>getIssueItems(id!),
        queryKey:["inventory-issue",id],
        enabled:!!id
    })
}
