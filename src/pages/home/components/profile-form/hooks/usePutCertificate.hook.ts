import { useMutation } from "@tanstack/react-query";
import { certificateApi } from "../../../../../schema";
import { Certificate } from "../../../../../../generated-client";

export const usePutCertificate = () => {
  return useMutation({
    mutationFn: async ({ certificate }: { certificate: Certificate }) => {
      const response = await certificateApi.certificateUpdate({
        idCertificate: certificate.idCertificate,
        certificate: certificate,
      });

      console.log(response);
    },
  });
};
