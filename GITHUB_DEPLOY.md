# v.0.13.a GitHub Pages 적 도트 교체

이 ZIP을 풀어 기존 GitHub 저장소의 같은 위치에 전체 파일을 업로드합니다. ZIP 자체를 업로드하면 게임이 실행되지 않습니다.

**업로드 전에 저장소의 네 폴더 안에 있는 예전 PNG를 모두 삭제하세요.**

- `assets/digimon/chuumon/`
- `assets/digimon/numemon/`
- `assets/digimon/sukamon/`
- `assets/digimon/monzaemon/`

각 폴더에는 이 ZIP에 포함된 소문자 `{이름}_right.png` **한 개만** 남아야 합니다. GitHub 웹에서 파일을 삭제하고 커밋한 뒤 새 파일을 업로드하면 Windows의 대소문자 변경 문제를 피할 수 있습니다. 이 네 폴더의 예전 `_left.png` 및 대문자 `Chuumon_right.png` 같은 파일도 삭제 대상입니다.

같은 폴더에 있는 `index.html`, `patch.js`, `assets/`를 모두 새 빌드로 업데이트하세요. 코드가 오른쪽 도트를 왼쪽을 향할 때 좌우 반전하므로 왼쪽 PNG는 필요하지 않습니다.

가능하면 압축을 푼 폴더에서 `python3 check_github_build.py`를 실행해 `PASS`를 확인하세요. 배포 후 Ctrl+F5로 새로고침하고, 첫 레이어의 츄몬·누메몬·스카몬과 보스 몬자에몬의 표시 및 좌우 방향을 확인하세요. 이전 브라우저 캐시를 피하도록 `patch.js`의 버전 쿼리도 갱신했습니다.
