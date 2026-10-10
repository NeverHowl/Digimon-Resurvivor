# v.0.13.a GitHub Pages 적 도트 경로 수정

현재 GitHub 저장소의 네 폴더에 있는 파일명과 코드 경로를 동일하게 맞췄습니다.

| 폴더 | 코드가 읽는 파일 |
| --- | --- |
| chuumon | Chuumon_right.png |
| numemon | Numemon_right.png |
| sukamon | Sukamon_right.png |
| monzaemon | Monzaemon_right.png |

압축을 풀고 `index.html`과 `patch.js`를 저장소 최상위의 동명 파일에 덮어쓰고 커밋한 뒤 push하세요. 다른 파일도 함께 올려도 됩니다. PNG는 이미 GitHub에 해당 이름으로 있으므로 코드 두 파일만 업데이트해도 됩니다. ZIP 파일 자체를 게임 폴더에 올리면 실행되지 않습니다.

배포 후 게임을 Ctrl+F5로 새로고침하고 첫 레이어 적이 도트로 나오는지 확인하세요. `python3 check_github_build.py`로 압축 해제 폴더의 경로를 검사할 수도 있습니다.
