import {useMutation, useQueryClient,} from "@tanstack/react-query";

import {addMember} from "../api/member-apis";
import {toast} from "sonner";
import {MemberQueryKey} from "@/features/edir/api/member-query.key.ts";

const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMember,

    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: MemberQueryKey.members(0, 10),
        })
        .then(() => {
          toast.success("Member created successfully");
        });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create member");
    },
  });
};

export default useCreateMember;
