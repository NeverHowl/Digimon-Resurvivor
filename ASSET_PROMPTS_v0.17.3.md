# v0.17.3 도트 리소스 생성 기록

생성 방식: 내장 이미지 생성 도구. 모든 리소스는 투명 배경 PNG로 생성했으며, 게임 로딩 시 작은 캔버스 스프라이트로 변환하여 사용합니다.

## 맵 오브젝트 시트

아래 공통 프롬프트의 `{subject}`를 각 항목으로 대체했습니다.

```text
Use case: stylized-concept. Asset type: production pixel-art game sprite sheet, transparent background. Create {subject} All frames in one evenly spaced horizontal row, each frame in an equal square cell, identical anchor and scale, generous transparent padding so frames never overlap. Style: chunky 64x64 logical pixel sprites enlarged with nearest-neighbor, limited 12-color palette, crisp stepped dark outlines, 2-3 tone cel shading, no anti-aliasing, no blur, no text or UI. Top-down 3/4 view suitable for a retro Digimon action roguelike. Only the object and its necessary effects, completely transparent outside. The center of ground contact is identical in every cell. Pixel-art readability is more important than detail.
```

| 파일 | subject |
|---|---|
| coffin.png | sealed vampire stone coffin, red sealing rune. 3 frames: closed intact, cracked lid with red rune, fully open dark interior. No monster. |
| vat.png | small green laboratory incubation glass capsule on metal base, tiny indistinct specimen. 3 frames: intact glowing green fluid, open hatching empty capsule, shattered glass broken machine. |
| idol.png | corrupted dark stone altar idol, purple glowing cracks. 3 frames: dormant intact, brightly cursed glowing intact, broken stone rubble. |
| volcano.png | ground volcanic vent tile, red black cracked rock oval around a central lava hole. 4 frames: idle dark vent, orange lava warning, vertical lava and fire eruption rising from same centered vent, cooling smoking vent. |

## 하트버블·드릴

```text
Use case: stylized-concept. Asset type: game effect sprite. Draw {subject}. Chunky retro 64x64 logical pixel art enlarged with nearest-neighbor. Limited palette, 2-3 tone shading, crisp stepped silhouette, no blur, no text, no antialiasing, transparent surrounding background. Full object fits with transparent padding. Designed to remain readable very small in a top down action game.
```

| 파일 | subject |
|---|---|
| heart.png | a single translucent pink soap bubble enclosing a solid red pixel heart, white stepped highlight, no background, centered sprite |
| drill.png | a single large steel conical drill bit pointing RIGHT horizontally, silver spiral threads, dark outline, gold mechanical collar on its left base, centered sprite |

## 소형 유물 이펙트

```text
Use case: stylized-concept. Asset type: small game relic companion effect sprite. {subject}. Coarse chunky retro pixel art, 32x32 logical pixels enlarged, limited 8 color palette and dark outline, no blur, no antialiasing, no text, fully transparent surrounding background, centered with generous padding. Readable as a very small floating game effect.
```

| 파일 | subject |
|---|---|
| cell.png | single tiny glowing organic chimera cell, an irregular translucent teal and purple membrane with warm orange nucleus, centered |
| flame.png | single small phoenix-shaped crimson flame wisp, orange-yellow core with red stepped feather edges, centered |
| halo.png | single violet dark sacred halo, a thin elliptical purple ring with four small jagged star points, viewed at slight top-down angle, empty transparent center |
