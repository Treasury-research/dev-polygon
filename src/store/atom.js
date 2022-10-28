import { atom } from "recoil";

export const moduleActive = atom({
  key: "moduleActive",
  default: 'templateList', // 'templateList','claimList','claimList','creatTempalte','offerClaims','setLink','revocation'
});


export const activeDrawerState = atom({
  key: 'activeDrawerState',
  default: {
    
  }
})