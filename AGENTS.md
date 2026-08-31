# bookpicnic.kr 작업 규칙

- 인물 및 공개자료 정본은 `../Human-Information/people/kim-yoonjung/`을 참조한다.
- 영문 슬러그는 `kim-yoonjung`이며 `yun`, `yunjung` 표기를 사용하지 않는다.
- CI와 배포 빌드는 상위 비공개 폴더에 의존하지 않는다. 검토가 끝난 공개용 텍스트와 파생 이미지만 이 저장소에 둔다.
- `../Human-Information/people/kim-yoonjung/images/originals/`의 원본 사진을 복사하거나 커밋하지 않는다.
- 사이트에는 가격, 시간표, 현재 모집 상태, 팔로워 수, 개인 생활 계정, 미검증 후기나 성과를 노출하지 않는다.
- 공식 문의 우선순위는 Instagram DM, 전화 순서다.
- 폼, 쿠키, 분석 SDK, 외부 Instagram embed, 로그인, API, 로컬 스토리지를 추가하지 않는다.
- 모든 모션은 `prefers-reduced-motion`에서 제거하고, 모바일 320px부터 가로 스크롤이 없어야 한다.
- 공개 코드 변경 후 `npm run verify`와 브라우저 반응형 QA를 수행한다.

