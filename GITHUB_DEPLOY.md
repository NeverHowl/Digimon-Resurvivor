# v.0.13.a GitHub Pages 배포

1. ZIP을 풀고 이 폴더에서 `python3 check_github_build.py`를 실행해 `PASS`를 확인합니다.
2. GitHub 저장소의 게임 파일 위치에 **압축을 푼** `index.html`, `patch.js`, `assets/` 전체를 올립니다. ZIP 파일 한 개만 올리면 게임은 실행되지 않습니다. 기존 저장소의 다른 게임 파일과 섞이지 않도록 전체 파일 업로드가 끝났는지 확인합니다.
3. 기존 저장소에 아래 대문자 파일이 있다면 삭제한 뒤 커밋합니다. 이들은 소문자 파일과 Windows에서 같은 이름으로 취급될 수 있습니다.
   - `assets/digimon/monzaemon/Monzaemon_left.png`, `Monzaemon_right.png`
   - `assets/digimon/chuumon/Chuumon_left.png`, `Chuumon_right.png`
   - `assets/digimon/numemon/Numemon_left.png`, `Numemon_right.png`
   - `assets/digimon/sukamon/Sukamon_left.png`, `Sukamon_right.png`
4. Pages 배포가 끝나면 게임을 강력 새로고침(Ctrl+F5)하고, 아구몬을 선택해 최소 10초 이동하며 첫 잡몹, 평타, E 스킬이 나오는지 확인합니다. 다른 시작 디지몬 하나도 시작해 보세요.

**이번 오류:** 배포 페이지에서 `drawEnemy`가 로딩 실패한 이미지에 `drawImage`를 호출하여 `InvalidStateError`가 발생했습니다. 그 예외가 다음 프레임 예약을 막았습니다. 이번 수정은 이미지가 실제로 로드됐는지 확인하고, 누락 시 기본 표시를 사용하며, 프레임 예약을 `finally`에서 수행합니다. 상단에 오류 알림이 남으면 해당 문구와 브라우저 개발자 도구의 콘솔 로그를 전달해 주세요.
