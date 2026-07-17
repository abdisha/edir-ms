import {queryKeys} from "@/shared/api/queryKeys";
import {useMutation, useQueryClient,} from "@tanstack/react-query";

import {addMember} from "../api/member-apis";
import {toast} from "sonner";

const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMember,

    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: queryKeys.member,
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
