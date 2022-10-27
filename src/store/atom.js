import { atom } from "recoil";

export const moduleActive = atom({
  key: "moduleActive",
  default: 'templateList', // 'templateList','claimsList','creatTempalte','offerClaims','link','revocation'
});
