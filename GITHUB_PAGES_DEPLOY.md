# GitHub Pages 업데이트

1. 이 ZIP을 압축 해제합니다. **ZIP 파일 자체를 저장소에 올려도 게임은 업데이트되지 않습니다.**
2. `index.html`, `patch.js`, `assets` 폴더를 GitHub Pages에서 사용 중인 저장소의 게시 위치에 덮어씁니다. 기존 주소가 저장소 최상위를 배포하도록 설정되어 있다면 세 항목 모두 최상위에 있어야 합니다.
3. `assets/digimon`, `assets/audio`의 하위 폴더와 파일까지 업로드됐는지 확인합니다. GitHub Pages는 파일 이름의 대소문자를 구분합니다.
4. 변경 사항을 커밋하고 Push origin까지 누릅니다. 배포가 완료된 뒤 페이지를 새로 고칩니다. 오른쪽 위의 `BUILD v0.11.e`를 확인합니다.
5. 이전 버전 번호가 계속 보이면 게시 위치의 `index.html`이 교체되지 않은 상태입니다. `BUILD v0.11.e`인데 적이 대체 도형으로 보이면 해당 이미지 파일이 배포되지 않은 상태입니다.
6. 1번 레이어 적 파일은 `assets/digimon/chuumon/Chuumon_right.png`처럼 폴더는 소문자, 파일의 첫 글자는 대문자입니다. GitHub Pages는 대소문자를 구분합니다.
