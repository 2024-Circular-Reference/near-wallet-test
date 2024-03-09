# near-wallet-test

## Get Start

```
git clone https://github.com/2024-Circular-Reference/near-wallet-test.git
cd near-wallet-test
pnpm install
pnpm run dev
```

- Chrome에서 `chrome://extensions/`으로 접속한다.
- 개발자 모드를 켠다.
- "압축해제된 확장 프로그램을 로드합니다."를 클릭한다.
- near-wallet-test 루트 폴더의 dist를 선택한다.
- 확장 프로그램에 추가되면 이제 Wallet extensions을 사용할 수 있다!

## Architecture

- src/pages/popup/app/test/index.tsx: 프로토콜 MVP가 구현되는 테스트 페이지
- src/pages/lib/near/wallet.ts: wallet class 구현체
