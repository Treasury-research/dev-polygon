import { atom } from "recoil";

export const moduleActive = atom({
  key: "moduleActive",
  default: 'templateList', // 'templateList','claimList','claimList','creatTempalte','offerClaims','setLink','revocation'
});
