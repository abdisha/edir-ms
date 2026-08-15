import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEdir } from "@/features/edir/api/edir-apis.ts";
import { MemberQueryKey } from "@/features/edir/api/member-query.key.ts";
import type { AxiosError } from "axios";

export function useCreateEdir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEdir,

    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: MemberQueryKey.edir,
        })
        .then(() => {
          toast.success("Edir created successfully");
        });
    },

    onError: (error: AxiosError<EdirErrorResponse>) => {
      console.log(error);
      if (
        error.response?.data.validationErrors &&
        Object.keys(error.response?.data.validationErrors).length > 0
      ) {
        let errorMessages = Object.entries(
          error.response?.data.validationErrors,
        )
          .map(([key, messages]) => `${key}: ${messages}`)
          .join("\n");
        console.log("Validation Errors:", errorMessages);
        toast.error(errorMessages);
      } else {
        toast.error(error?.message || "Failed to create Edir");
      }
    },
  });
}

interface EdirErrorResponse {
  message?: string;
  validationErrors?: FieldValidationErrors[];
}

interface FieldValidationErrors {
  fieldName: string;
  errorMessage: string;
}
