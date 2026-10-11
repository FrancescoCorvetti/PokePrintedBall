with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Make sure prices and names are strictly aligned with mockup:
# classic-mk4: 24.90
# tactical-great-stash: 26.90, name: 'Great Ball', category: 'speciali'
# volt-vault-switch: 26.90, name: 'Ultra Ball', category: 'speciali'
# master-artifact-led: 29.90, name: 'Master Ball', category: 'speciali'
# pokeball-lampada: 34.90, name: 'Poké Ball Lampada', category: 'funzionali'
# pokeball-porta-oggetti: 27.90, name: 'Poké Ball Porta Oggetti', category: 'funzionali'
# luxury-onyx-gold-drop: 32.90, name: 'Luxury Ball', category: 'speciali'
# hello-kitty-ball: 29.90, name: 'Hello Kitty Ball', category: 'personalizzate'

import re

# Fix tactical-great-stash
text = re.sub(
    r"id:\s*'tactical-great-stash'[\s\S]*?name:\s*'[^']+'[\s\S]*?price:\s*[\d\.]+",
    lambda m: re.sub(r"name:\s*'[^']+'", "name: 'Great Ball'", re.sub(r"price:\s*[\d\.]+", "price: 26.90", m.group(0))),
    text
)

# Fix volt-vault-switch price
text = re.sub(
    r"id:\s*'volt-vault-switch'[\s\S]*?price:\s*[\d\.]+",
    lambda m: re.sub(r"price:\s*[\d\.]+", "price: 26.90", m.group(0)),
    text
)

# Fix luxury-onyx-gold-drop name and price
text = re.sub(
    r"id:\s*'luxury-onyx-gold-drop'[\s\S]*?name:\s*'[^']+'[\s\S]*?price:\s*[\d\.]+",
    lambda m: re.sub(r"name:\s*'[^']+'", "name: 'Luxury Ball'", re.sub(r"price:\s*[\d\.]+", "price: 32.90", m.group(0))),
    text
)

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Product details fine-tuned")
