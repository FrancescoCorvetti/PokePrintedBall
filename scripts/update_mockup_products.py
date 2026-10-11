import sys

new_products = """  {
    id: 'pokeball-lampada',
    slug: 'pokeball-lampada',
    name: 'Poké Ball Lampada',
    subtitle: "Lampada d'ambiente 3D con calotta apribile e anello LED interno a luce calda",
    price: 34.90,
    originalPrice: 39.90,
    category: 'funzionali',
    categoryLabel: 'POKÉ BALL FUNZIONALI',
    ballType: 'lampball',
    stockStatus: 'in_stock',
    leadTimeDays: 1,
    badge: 'BESTSELLER',
    rating: 5.0,
    reviewsCount: 78,
    description: "Lampada d'atmosfera artigianale stampata in 3D con anello luminoso LED integrato. Apertura a conchiglia a 45 gradi con cavo USB-C incluso.",
    longDescription: "La Poké Ball Lampada illumina la tua stanza o postazione gaming con una luce ambrata morbida e rilassante. La calotta superiore si inclina a scatto rivelando il diffusore interno stampato in PETG traslucido che diffonde i LED in modo omogeneo. Include dimmer tattile e base espositiva.",
    features: [
      'Anello LED a luce calda 3000K a basso consumo',
      'Apertura a conchiglia a 45° con cerniera rinforzata',
      'Alimentazione USB-C con cavo intrecciato incluso',
      'Base espositiva inclusa',
      'Materiali resistenti e atossici'
    ],
    specs: {
      diameter: '105 mm',
      material: 'PLA+ ecologico & diffusore in PETG traslucido',
      weight: '145 g',
      printTime: '6h 30min',
      magnets: '2x Neodimio per fermo chiusura',
      finishType: 'FDM Satin Bicolore con diffusore opalino',
      layerHeight: '0.16 mm',
      tolerances: '±0.1 mm'
    },
    galleryAngles: defaultGalleryAngles,
    availableSupports: standardSupports,
    availableFinishes: standardFinishes,
    allowCustomEngraving: true,
    engravingPrice: 2.50,
    engravingMaxChars: 20,
  },
  {
    id: 'pokeball-porta-oggetti',
    slug: 'pokeball-porta-oggetti',
    name: 'Poké Ball Porta Oggetti',
    subtitle: 'Vano organizer sagomato per cavi USB, auricolari, monete e piccoli accessori desk',
    price: 27.90,
    originalPrice: 32.00,
    category: 'funzionali',
    categoryLabel: 'POKÉ BALL FUNZIONALI',
    ballType: 'holderball',
    stockStatus: 'in_stock',
    leadTimeDays: 1,
    badge: 'FUNZIONALE',
    rating: 4.8,
    reviewsCount: 52,
    description: 'Il contenitore perfetto per organizzare la scrivania. Scocca bicolore con vano interno capiente e clip sagomata per cavi.',
    longDescription: "Trasforma la tua scrivania con un organizer da collezione. All'interno della sfera trova posto uno scomparto sagomato con alloggiamento per auricolari wireless e vano cavi anti-aggrovigliamento, protetto da magneti N52 che garantiscono una chiusura solida.",
    features: [
      'Vano interno spazioso per cavi, cuffie e piccoli oggetti',
      'Chiusura a scatto con magneti al neodimio N52',
      'Scocca bicolore classica con dettagli satinati',
      'Design compatto perfetto per la scrivania'
    ],
    specs: {
      diameter: '100 mm',
      material: 'PLA+ Bio ad alta resistenza',
      weight: '115 g',
      printTime: '5h 15min',
      magnets: '4x Magneti N52 nichelati',
      finishType: 'FDM Satin con interni lisci',
      layerHeight: '0.16 mm',
      tolerances: '±0.1 mm'
    },
    galleryAngles: defaultGalleryAngles,
    availableSupports: standardSupports,
    availableFinishes: standardFinishes,
    allowCustomEngraving: true,
    engravingPrice: 2.50,
    engravingMaxChars: 20,
  },
  {
    id: 'hello-kitty-ball',
    slug: 'hello-kitty-ball',
    name: 'Hello Kitty Ball',
    subtitle: 'Edizione personalizzata crossover con fiocco rosa 3D, baffetti scolpiti e calotta bianco perla',
    price: 29.90,
    originalPrice: 35.00,
    category: 'personalizzate',
    categoryLabel: 'POKÉ BALL PERSONALIZZATE',
    ballType: 'hellokittyball',
    stockStatus: 'in_stock',
    leadTimeDays: 1,
    badge: 'SPECIAL EDITION',
    rating: 5.0,
    reviewsCount: 94,
    description: "L'iconico crossover tra Poké Ball e Hello Kitty. Calotta bianco latte con fiocchetto rosa a rilievo e chiusura magnetica.",
    longDescription: "Uno dei design più richiesti della nostra community. Realizzata con finitura bicolore bianco satinato e dettagli rosa pastello rifiniti a mano. Il fiocchetto iconico è modellato in 3D con contorni morbidi e si integra armoniosamente con le proporzioni della sfera classica.",
    features: [
      'Fiocco Hello Kitty 3D sagomato a rilievo',
      'Baffetti e dettagli frontali incisi con precisione',
      'Calotta bianco seta con pulsante centrale metallico',
      'Chiusura magnetica con 4 magneti N52'
    ],
    specs: {
      diameter: '100 mm',
      material: 'PLA+ Silk Bianco Perla & Rosa Pastello',
      weight: '110 g',
      printTime: '5h 45min',
      magnets: '4x Magneti N52 neodimio',
      finishType: 'Silk Glossy & Satin',
      layerHeight: '0.16 mm',
      tolerances: '±0.1 mm'
    },
    galleryAngles: defaultGalleryAngles,
    availableSupports: standardSupports,
    availableFinishes: standardFinishes,
    allowCustomEngraving: true,
    engravingPrice: 2.50,
    engravingMaxChars: 20,
  },
"""

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Update classic-mk4
content = content.replace("name: 'Classic Ball Core — Mk. IV',", "name: 'Poké Ball Classica',")
content = content.replace("price: 14.90,", "price: 24.90,")
content = content.replace("category: 'pokeballs',", "category: 'classiche',", 1)
content = content.replace("categoryLabel: 'POKÉ BALLS',", "categoryLabel: 'POKÉ BALL CLASSICHE',", 1)

# Update volt-vault-switch
content = content.replace("name: 'Volt Vault — Switch Edition',", "name: 'Ultra Ball',")
content = content.replace("price: 18.90,", "price: 26.90,")
content = content.replace("category: 'special-balls',", "category: 'speciali',", 1)
content = content.replace("categoryLabel: 'SPECIAL BALLS',", "categoryLabel: 'POKÉ BALL SPECIALI',", 1)

# Update master-artifact-led
content = content.replace("name: 'Master Ball Core — Studio Edition',", "name: 'Master Ball',")
content = content.replace("price: 21.90,", "price: 29.90,")
content = content.replace("category: 'collectibles',", "category: 'speciali',", 1)
content = content.replace("categoryLabel: 'COLLECTIBLES',", "categoryLabel: 'POKÉ BALL SPECIALI',", 1)

# Update tactical-great-stash
content = content.replace("name: 'Tactical Great Ball — Stash Pod',", "name: 'Great Ball',")
content = content.replace("price: 16.90,", "price: 26.90,")
content = content.replace("category: 'pokeballs',", "category: 'speciali',", 1)

# Update luxury-onyx-gold-drop
content = content.replace("name: 'Luxury Ball — Onyx & Gold Relic',", "name: 'Luxury Ball',")
content = content.replace("price: 26.90,", "price: 32.90,")
content = content.replace("category: 'special-balls',", "category: 'speciali',", 1)

# Insert the 3 new products
target_str = "export const productsData: Product[] = [\n"
if target_str in content and 'pokeball-lampada' not in content:
    content = content.replace(target_str, target_str + new_products)

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated src/data/products.ts successfully")
