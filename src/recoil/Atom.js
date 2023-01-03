import { atom } from "recoil";

export const resetToken = atom({
	key: "token",
	default: false,
});