export interface People {

  id?: string;

  name?: string;

  birthdate?: string;

  genre?: string;

  city?: string;

  status?: 'active' | 'inactive';

  // DTHFUI-13319: campo de domínio primitivo (incluindo falsy 0 e '') para validar
  // controlValueWithLabel em modo service. Aceita number | string.
  tipo?: number | string;

  // Colunas-espelho de CONTROLE (SEM controlValueWithLabel). Mesmo valor cru de
  // genre/status/tipo, para comparar lado a lado COM x SEM no grid em modo service.
  genreSem?: string;

  statusSem?: 'active' | 'inactive';

  tipoSem?: number | string;

  nickname?: string;

  email?: string;

  nationality?: string;

  birthPlace?: string;

  graduation?: string;

  father?: string;

  mother?: string;

  street?: string;

  country?: string;

  genreDescription?: string;

  statusDescription?: string;

  cityName?: string;

  state?: string;

  uf?: string;

  dependents?: Array<any>;

  // DTHFUI-14204: períodos para validar po-datepicker nos modos month-year e year na edição inline.
  // Cada campo guarda o model no formato esperado pela coluna (ISO Basic, ISO Extended ou sem ISO).
  mesAnoBasic?: string;
  mesAnoExtended?: string;
  mesAnoSemIso?: string;
  anoBasic?: string;
  anoExtended?: string;
  anoSemIso?: string;
  mesAnoLimitado?: string;
  mesAnoObrigatorio?: string;
}
