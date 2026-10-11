import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove pokeball-lampada, pokeball-porta-oggetti, and hello-kitty-ball objects
for pid in ['pokeball-lampada', 'pokeball-porta-oggetti', 'hello-kitty-ball']:
    pattern = rf"\s*\{{\s*id:\s*'{pid}'[\s\S]*?allowCustomEngraving: true,[\s\S]*?\}},\n"
    content = re.sub(pattern, '', content)

# Clean Premier Ball
content = re.sub(
    r"id:\s*'premier-ceremonial-box'[\s\S]*?name:\s*'[^']+'",
    "id: 'premier-ceremonial-box',\n    slug: 'premier-ceremonial-box',\n    name: 'Premier Ball'",
    content
)
content = re.sub(
    r"id:\s*'premier-ceremonial-box'[\s\S]*?price:\s*[\d\.]+",
    lambda m: re.sub(r"price:\s*[\d\.]+", "price: 26.90", m.group(0)),
    content
)

# Clean Dusk Ball
content = re.sub(
    r"id:\s*'nocturnal-bio-glow'[\s\S]*?name:\s*'[^']+'",
    "id: 'nocturnal-bio-glow',\n    slug: 'nocturnal-bio-glow',\n    name: 'Dusk Ball'",
    content
)
content = re.sub(
    r"id:\s*'nocturnal-bio-glow'[\s\S]*?price:\s*[\d\.]+",
    lambda m: re.sub(r"price:\s*[\d\.]+", "price: 28.90", m.group(0)),
    content
)

# Clean Quick Ball
content = re.sub(
    r"id:\s*'aero-quick-surge'[\s\S]*?name:\s*'[^']+'",
    "id: 'aero-quick-surge',\n    slug: 'aero-quick-surge',\n    name: 'Quick Ball'",
    content
)
content = re.sub(
    r"id:\s*'aero-quick-surge'[\s\S]*?price:\s*[\d\.]+",
    lambda m: re.sub(r"price:\s*[\d\.]+", "price: 26.90", m.group(0)),
    content
)

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated productsData without functional and hello kitty items")
