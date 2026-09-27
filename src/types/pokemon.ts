export type PokemonType =
  | 'Normal'
  | 'Fire'
  | 'Water'
  | 'Grass'
  | 'Electric'
  | 'Ice'
  | 'Fighting'
  | 'Poison'
  | 'Ground'
  | 'Flying'
  | 'Psychic'
  | 'Bug'
  | 'Rock'
  | 'Ghost'
  | 'Dragon'
  | 'Steel'
  | 'Fairy'
  | 'Dark';

export type Poke3DStatus = 'AVAILABLE' | 'COMING SOON' | 'CUSTOM REQUEST';

export interface PokemonCustomSuggestion {
  topColor: string;
  bottomColor: string;
  ringColor: string;
  name: string;
}

export interface PokemonItem {
  id: number;
  pokedexNumber: string; // e.g. "#0025"
  name: string;
  slug: string;
  generation: number;
  types: PokemonType[];
  spriteUrl: string;
  description: string;
  poke3dStatus: Poke3DStatus;
  matchedProductSlugs: string[]; // Linked slugs in productsData
  suggestedCustomColors?: PokemonCustomSuggestion;
}
