import { NFCTagData } from '@/types/nfc';

export const PRESEEDED_NFC_TAGS: NFCTagData[] = [
  {
    code: 'PKB-PIKA25',
    ballModel: 'Volt Vault Switch',
    ballSlug: 'volt-vault-switch',
    batchNumber: 'BATCH-2026-IT-01',
    mfgDate: '2026-02-14',
    nfcUid: '04:1A:89:FE:42:61:80',
    verificationHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    forcedPokemonSlug: 'pikachu',
  },
  {
    code: 'PKB-CHAR06',
    ballModel: 'Classic MK4 Red & White',
    ballSlug: 'classic-mk4',
    batchNumber: 'BATCH-2026-IT-02',
    mfgDate: '2026-03-01',
    nfcUid: '04:B2:91:7C:E5:19:90',
    verificationHash: 'sha256:4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    forcedPokemonSlug: 'charizard',
  },
  {
    code: 'PKB-MEW150',
    ballModel: 'Master Artifact',
    ballSlug: 'master-artifact',
    batchNumber: 'BATCH-2026-IT-09',
    mfgDate: '2026-01-20',
    nfcUid: '04:DD:33:AA:91:02:11',
    verificationHash: 'sha256:ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    forcedPokemonSlug: 'mewtwo',
  },
  {
    code: 'PKB-GENG94',
    ballModel: 'Nocturnal Bio-Glow',
    ballSlug: 'nocturnal-bio-glow',
    batchNumber: 'BATCH-2026-IT-04',
    mfgDate: '2026-02-28',
    nfcUid: '04:4F:78:22:B9:55:40',
    verificationHash: 'sha256:a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
    forcedPokemonSlug: 'gengar',
  },
  {
    code: 'PKB-SQUI07',
    ballModel: 'Tactical Great Ball',
    ballSlug: 'tactical-great',
    batchNumber: 'BATCH-2026-IT-03',
    mfgDate: '2026-03-10',
    nfcUid: '04:99:A1:66:34:CD:72',
    verificationHash: 'sha256:88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589',
    forcedPokemonSlug: 'squirtle',
  },
  {
    code: 'PKB-EEV133',
    ballModel: 'Classic MK4 Red & White',
    ballSlug: 'classic-mk4',
    batchNumber: 'BATCH-2026-IT-05',
    mfgDate: '2026-03-18',
    nfcUid: '04:CC:81:44:09:FE:33',
    verificationHash: 'sha256:3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b',
    forcedPokemonSlug: 'eevee',
  },
];

export function resolveNFCTag(code: string): NFCTagData {
  const clean = code.trim().toUpperCase();
  const matched = PRESEEDED_NFC_TAGS.find((t) => t.code.toUpperCase() === clean);
  if (matched) return matched;

  // Generate valid dynamic physical tag record for any input code
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const hexHex = Math.abs(hash).toString(16).padStart(8, '0');
  const uidHex = Math.abs(hash * 31).toString(16).padStart(8, '0');

  const models = [
    { name: 'Classic MK4 Red & White', slug: 'classic-mk4' },
    { name: 'Volt Vault Switch', slug: 'volt-vault-switch' },
    { name: 'Luxury Onyx & Gold', slug: 'luxury-onyx-gold' },
    { name: 'Tactical Great Ball', slug: 'tactical-great' },
    { name: 'Nocturnal Bio-Glow', slug: 'nocturnal-bio-glow' },
  ];
  const chosenModel = models[Math.abs(hash) % models.length];

  return {
    code: clean,
    ballModel: chosenModel.name,
    ballSlug: chosenModel.slug,
    batchNumber: `BATCH-2026-IT-${(Math.abs(hash) % 15 + 1).toString().padStart(2, '0')}`,
    mfgDate: '2026-03-01',
    nfcUid: `04:${uidHex.slice(0, 2)}:${uidHex.slice(2, 4)}:${uidHex.slice(4, 6)}:${uidHex.slice(6, 8)}:80:19`.toUpperCase(),
    verificationHash: `sha256:${hexHex}99f2a0b1c784918e${hexHex}330089aef412998a44b1c5520`,
  };
}
