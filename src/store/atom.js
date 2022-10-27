import { atom } from "recoil";

export const moduleActive = atom({
  key: "moduleActive",
  default: 'offerClaims', // 'templateList','claimsList','creatTempalte','offerClaims','link','revocation'
});
