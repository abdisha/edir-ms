
const StoreKeys= {
    stores:["stores"] as const,
    store:(id:string)=>["store",id]as const,
}
export default StoreKeys;