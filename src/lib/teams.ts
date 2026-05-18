const TEAM_NAMES: Record<string, string> = {
  ALG: "Argélia",
  ARG: "Argentina",
  AUS: "Austrália",
  AUT: "Áustria",
  BEL: "Bélgica",
  BIH: "Bósnia e Herzegovina",
  BRA: "Brasil",
  CAN: "Canadá",
  CC:  "Especiais",
  CIV: "Costa do Marfim",
  COD: "Rep. Dem. do Congo",
  COL: "Colômbia",
  CPV: "Cabo Verde",
  CRO: "Croácia",
  CUW: "Curaçao",
  CZE: "República Tcheca",
  ECU: "Equador",
  EGY: "Egito",
  ENG: "Inglaterra",
  ESP: "Espanha",
  FRA: "França",
  FWC: "Copa do Mundo",
  GER: "Alemanha",
  GHA: "Gana",
  HAI: "Haiti",
  IRN: "Irã",
  IRQ: "Iraque",
  JOR: "Jordânia",
  JPN: "Japão",
  KOR: "Coreia do Sul",
  KSA: "Arábia Saudita",
  MAR: "Marrocos",
  MEX: "México",
  NED: "Países Baixos",
  NOR: "Noruega",
  NZL: "Nova Zelândia",
  PAN: "Panamá",
  PAR: "Paraguai",
  POR: "Portugal",
  QAT: "Catar",
  RSA: "África do Sul",
  SCO: "Escócia",
  SEN: "Senegal",
  SUI: "Suíça",
  SWE: "Suécia",
  TUN: "Tunísia",
  TUR: "Turquia",
  URU: "Uruguai",
  USA: "Estados Unidos",
  UZB: "Uzbequistão"
};

const TEAM_FLAGS: Record<string, string> = {
  ALG: "🇩🇿", ARG: "🇦🇷", AUS: "🇦🇺", AUT: "🇦🇹", BEL: "🇧🇪",
  BIH: "🇧🇦", BRA: "🇧🇷", CAN: "🇨🇦", CC:  "⭐", CIV: "🇨🇮",
  COD: "🇨🇩", COL: "🇨🇴", CPV: "🇨🇻", CRO: "🇭🇷", CUW: "🇨🇼",
  CZE: "🇨🇿", ECU: "🇪🇨", EGY: "🇪🇬", ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", ESP: "🇪🇸",
  FRA: "🇫🇷", FWC: "🏆", GER: "🇩🇪", GHA: "🇬🇭", HAI: "🇭🇹",
  IRN: "🇮🇷", IRQ: "🇮🇶", JOR: "🇯🇴", JPN: "🇯🇵", KOR: "🇰🇷",
  KSA: "🇸🇦", MAR: "🇲🇦", MEX: "🇲🇽", NED: "🇳🇱", NOR: "🇳🇴",
  NZL: "🇳🇿", PAN: "🇵🇦", PAR: "🇵🇾", POR: "🇵🇹", QAT: "🇶🇦",
  RSA: "🇿🇦", SCO: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", SEN: "🇸🇳", SUI: "🇨🇭", SWE: "🇸🇪",
  TUN: "🇹🇳", TUR: "🇹🇷", URU: "🇺🇾", USA: "🇺🇸", UZB: "🇺🇿"
};

export function getTeamName(code: string): string {
  return TEAM_NAMES[code] ?? code;
}

export function getTeamFlag(code: string): string {
  return TEAM_FLAGS[code] ?? "🏳️";
}
