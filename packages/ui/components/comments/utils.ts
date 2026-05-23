export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export const SPANISH_WORDS = [
  // Common profanity
  "mierda",
  "puta",
  "puto",
  "putos",
  "putas",
  "pendejo",
  "pendeja",
  "pendejos",
  "pendejas",
  "cabron",
  "cabrona",
  "cabrones",
  "chingada",
  "chingado",
  "chingar",
  "chingo",
  "verga",
  "culero",
  "culera",
  "culo",
  "pinche",
  "pinches",
  "joder",
  "jodido",
  "jodida",
  "hostia",
  "hostias",
  "zorra",
  "zorras",
  "hijoputa",
  "hijosdeputa",
  "imbecil",
  "idiota",
  "estupido",
  "estupida",
  "gilipollas",
  "maricon",
  "maricones",
  "cojon",
  "cojones",
  "chingar",
  "chingon",
  "mamada",
  "mamadas",
  "mamar",
  "putamadre",
  "malparido",
  "malparida",
  // Accented variants (unicode escapes — encoding-safe across all bundlers)
  "cabrón",
  "cabr\u00f3n",
  "cojón",
  "coj\u00f3n",
  "coño",
  "co\u00f1o",
  "maricón",
  "maric\u00f3n",
  "imbécil",
  "imb\u00e9cil",
  "estúpido",
  "est\u00fapido",
  "estúpida",
  "est\u00fapida",
  "gilipollas",
];
