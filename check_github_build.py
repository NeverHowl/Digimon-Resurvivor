#!/usr/bin/env python3
"""Check paths that must survive a case-sensitive GitHub Pages deployment."""
import json
import re
from collections import defaultdict
from pathlib import Path

root = Path(__file__).resolve().parent
code = (root / "patch.js").read_text(encoding="utf-8")
html = (root / "index.html").read_text(encoding="utf-8")
missing = []

def require(path):
    if not (root / path).is_file():
        missing.append(path)

require("patch.js")
require("index.html")
if not re.search(r'<script\s+src="patch\.js\?v=[^"]+"', html):
    missing.append("index.html: versioned patch.js script reference")

# Every monster spawned by the five layers and every boss uses these paths.
block = code.split("const V06_SPRITES={", 1)[1].split("};", 1)[0]
one_sided = {"chuumon", "numemon", "sukamon", "monzaemon"}
for sprite in re.findall(r"[a-z]+:'([a-z]+)'", block):
    sides = ("right",) if sprite in one_sided else ("left", "right")
    for side in sides:
        require(f"assets/digimon/{sprite}/{sprite}_{side}.png")
    if sprite in one_sided:
        leftovers = [p.name for p in (root / "assets/digimon" / sprite).glob("*") if p.is_file() and p.name != f"{sprite}_right.png"]
        for name in leftovers:
            missing.append(f"obsolete sprite to delete: assets/digimon/{sprite}/{name}")
require("assets/digimon/yggdrasil/yggdrasil.png")

# Starting forms and later evolutions from the current patch.
forms = code.split("const V013_FORMS={", 1)[1].split("};", 1)[0]
for sprite in re.findall(r"^\s*([a-z]+):\[", forms, re.M):
    require(f"assets/digimon/{sprite}/{sprite}_right.png")
frames = json.loads(code.split("const V013_FRAME_INDEX=", 1)[1].split(";", 1)[0])
for form, parts in frames.items():
    for part, sides in parts.items():
        for side in sides:
            require(f"assets/digimon/{form}/animation/{form}_{part}_{side}.png")

files = defaultdict(list)
for path in (root / "assets").rglob("*"):
    if path.is_file():
        files[str(path.relative_to(root)).casefold()].append(str(path.relative_to(root)))
collisions = [paths for paths in files.values() if len(paths) > 1]
for item in missing:
    print("MISSING:", item)
for group in collisions:
    print("CASE COLLISION:", " | ".join(group))
if missing or collisions:
    raise SystemExit(f"FAILED: {len(missing)} missing paths, {len(collisions)} case collisions")
print(f"PASS: essential paths exist with exact case; {len(files)} unique assets")
