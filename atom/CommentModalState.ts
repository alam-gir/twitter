import { atom } from "recoil";
export const commentModalState = atom({
  key: "commentModalState",
  default: false,
});

export const docIdState = atom({
  key: "docIdState",
  default: "id",
});
