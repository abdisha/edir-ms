import {api} from "@/shared/api/client.ts";

export async function addMember(memberRequest: any) {
  const response = await api.post("members", memberRequest);
  return response.data;
}

export async function getMembers() {
  const response = await api.get("members/");
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
