# v0.18.22b — 류우다몬/코만드라몬 계열 도트 적용 + 스킬 개선

배포 파일: index.html, patch.js, lang.js, lang_en.js, assets/digimon/ 12개 폴더(ryudamon, ginryumon, hisyaryumon, ouryumon, samudramon, commandramon, sealsdramon, tankdramon, darkdramon, hicommandramon, cargodramon, brigadramon)

## 도트
- 12종 도트(오른쪽 단일 방향, 왼쪽은 반전) 적용. 가이오몬 = samudramon, 히사류몬 = hisyaryumon, 실즈드라몬 = sealsdramon, 하이코만드라몬 = hicommandramon 폴더 사용(게임 내부 id는 기존 유지).
- 영어 표기: Samudramon / Sealsdramon / Hisyaryumon / Hi-Commandramon.

## 버그/개선
- 류우다몬 계열 가드→돌진, 코만드라몬 계열 차징→발사: 좌클릭을 뗄 때도 동작(E·모바일 버튼 그대로).
- 입력 유지 중 skill1, 떼는 순간 skill2를 0.5초(없으면 skill1). 소환 E는 skill 포즈 재생.
- 코만드라몬/실즈드라몬/다크드라몬 E: 히트스캔 → 관통 투사체. 크기는 스킬 범위 배율 적용, 최대 충전 시 화면 끝까지 도달. (탱크드라몬은 연쇄 폭발이라 유지)
- 하이코만드라몬 계열 Q: 8초 소환수 공격력·공격속도 +30/40/50%. 소환수 없으면 2기 자동 소환, 소환 남은 시간 8초로 연장. 카고드라몬: 하이코만드라몬 1기 추가. 브리가드라몬: 추가로 2초마다 카고드라몬 1기(총 5기)가 맵을 직선 비행, 1초 뒤 지나간 경로에 0.25초 간격 순차 폭발(소환수 공격의 1.2배).

## 임시 수치(승인 필요)
투사체 속도 1100~1600px/s, 최소 사거리 = 기존 길이×0.55, 폭발 반경 140×스킬범위, 비행 기준선은 플레이어 주변 화면 ±0.9배에서 추출 후 맵 끝에서 끝까지.
