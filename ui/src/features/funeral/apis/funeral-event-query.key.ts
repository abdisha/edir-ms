export const FuneralEventQueryKey ={
    allFuneralEvent:["funeral-events"] as const,
    funeralEvent:(id:string)=>["funeral-event",id] as const
}