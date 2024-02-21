import md5 from "md5";
import Cookies from "js-cookie";

export enum CookiesName{
    "UserPublicApi" = "UserPublicApi",
    "UserPrivateApi" = "UserPrivateApi"
}

export const BASE_URL_CHARACTERS = "http://gateway.marvel.com/v1/public/characters"
export const BASE_URL_COMICS = "http://gateway.marvel.com/v1/public/comics"
export const BASE_URL_CREATORS = "http://gateway.marvel.com/v1/public/creators"

export const ts = Number(new Date());

export const hashCookies = md5(
    ts +
      (Cookies.get("UserPrivateApi") ?? "") +
      (Cookies.get("UserPublicApi") ?? "")
  );