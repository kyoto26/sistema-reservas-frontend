import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE, LANGUAGES, LANG_COOKIE, type Language } from "./translations";

export async function getServerLanguage(): Promise<Language> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return (LANGUAGES as string[]).includes(value ?? "") ? (value as Language) : DEFAULT_LANGUAGE;
}
