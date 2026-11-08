# v0.18.21d 몹 가지몬/데비드라몬 오른쪽 그림이 츄몬으로 나오던 문제 수정
덮어쓸 파일: index.html, patch.js
- 원인: v0.18.21c의 좌우반전 그림(canvas)에 complete/naturalWidth가 없어 drawEnemy가 "이미지 미로드"로 보고 기본 몹(츄몬/누메몬/스카몬) 그림으로 대체함. 반전 그림에 해당 속성을 추가
