import {api} from "@/shared/api/client.ts";

export async function addMember(memberRequest: any) {
  const response = await api.post("members", memberRequest);
  return response.data;
}

export async function getMembers(page:number=0,size:number=10) {
  const response = await api.get("members?page="+page+"&size="+size);
  return response.data;
}
export async function getMember(uuid:string) {
  const response = await api.get("members/"+uuid);
  return response.data;
}


export async function revokeMember(id: string) {
  const result = await api.put(`members/${id}/revoke`);

  return result.data;
}

export async function deceasedMember(id: string) {
  const result = await api.put(`members/${id}/deceased`);
  return result.data;
}

export async function appointMember(id: string) {
  const result = await api.put(`members/${id}/appointment`);
  return result.data;
}
