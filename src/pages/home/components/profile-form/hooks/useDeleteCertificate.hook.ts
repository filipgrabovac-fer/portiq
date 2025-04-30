import { useMutation } from "@tanstack/react-query";
import { certificateApi } from "../../../../../schema";
import { Certificate } from "../../../../../../generated-client";

export type UseDeleteCertificateProps = {
  onSuccess?: (
    data: void,
    variables: {
      certificate: Certificate;
    },
    context: unknown
  ) => Promise<unknown> | unknown;
};

export const useDeleteCertificate = ({
  onSuccess,
}: UseDeleteCertificateProps) => {
  return useMutation({
    mutationFn: async ({ certificate }: { certificate: Certificate }) => {
      const response = await certificateApi.certificateDestroy({
        idCertificate: certificate.idCertificate,
      });
    },
    onSuccess: onSuccess,
  });
};
