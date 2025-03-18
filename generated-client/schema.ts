import { UserApi } from "./apis/UserApi";
import { CertificateApi } from "./apis/CertificateApi";
import { LogoutApi } from "./apis/LogoutApi";

export const userApi: UserApi = new UserApi();
export const certificateApi: CertificateApi = new CertificateApi();
export const logoutApi: LogoutApi = new LogoutApi();
