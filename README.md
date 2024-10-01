# 패션앱 - 온라인쇼핑몰
> ```패션앱```은 판매자에게 상품을 판매하는 서비스를 제공하고,<br> 소비자는 판매자의 상품을 구매할 수 있습니다. <br>
<br>
<br>

- 배포 URL : https://commerce-project-oq89.vercel.app/


- 구매자 계정

    ID : testBuy@test.com <br>
    PW : test123

- 판매자 계정

    ID : testSale@test.com <br>
    PW : test123

## 제작 기간 & 참여 인원
- 2024/08/19~2024/09/30
- 개인프로젝트
<br>

## 사용 기술

<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
</div>

### 2.2 기술적 의사결정

| 사용 기술 | 설명 |
| --- | --- |
| TypeScript | 코드 작성 단계에서 타입 체크로 오류 방지, 컴파일 과정 중 에러 검출 및 강력한 autocomplete 기능을 제공 |
| TailwindCSS | CSS 클래스명을 고민하지 않아도 되며 유틸리티 클래스 사용으로 일관적인 디자인 시스템을 제공, 파일 전환의 필요없이 JSX 내부에서 스타일링 가능  |
| Firebase | 손쉬운 사용자 인증, 파이어스토어 데이터베이스, 파일 스토리지 등 다양한 기능의 제공으로 서버구축 시 발생하는 시간적 비용 절감  |
| Vite | 기타 번들러 대비 개발 서버 구동시간 개선, 의존성 설치 시 pre-bundling을 통한 빌드 속도 개선, Native ESM을 활용한 빠른 소스 코드 갱신 속도 |
| Shadcn/ui | 재사용 가능한 컴포넌트의 모음으로 Compound component 패턴으로 구성되어 있어 유연하게 사용 가능, 손쉬운 스타일 커스텀, 일관된 디자인 시스템 제공, 별도의 패키지를 요구하지 않아 번들사이즈 개선|
| Zustand | redux보다 난이도가 쉽고 가벼움, 앱을 프로바이더르 감싸지 않아 렌더링 트리 단순화,불필요한 렌더링 방지 |

</br>

## 기능 시연 
### 소비자
| 홈 (Main) | 검색기능 |
| ------ | ------ |
|![스크린샷 2024-10-01 194428](https://github.com/user-attachments/assets/20c9fff2-568d-4305-afa1-577331f79710) |![스크린샷 2024-10-01 194547](https://github.com/user-attachments/assets/dccacec6-8657-47ae-b1fa-fe8bb680ee3f)

| 상품상세정보 | 찜하기 |
| ------ | ------ |
|![스크린샷 2024-10-01 195725](https://github.com/user-attachments/assets/449c742d-2eed-4388-b0b1-445a0655f9f5) |![스크린샷 2024-10-01 200012](https://github.com/user-attachments/assets/6a07cec5-8f09-4ce6-b560-7b3f874cb34d)

<br>

### 판매자
| 홈 (Main) | 상품등록하기 |
| ------ | ------ |
|![스크린샷 2024-10-01 195355](https://github.com/user-attachments/assets/bec660f3-d1a1-4209-a7c5-1af58cf89354) |![스크린샷 2024-10-01 195128](https://github.com/user-attachments/assets/c81b8a32-13d1-4af1-aa44-92c9642603cf)

| 상품상세정보 | 찜하기 |
| ------ | ------ |
|![스크린샷 2024-10-01 195543](https://github.com/user-attachments/assets/35cecc8e-d6a7-4857-b1f2-731659df1607) |![스크린샷 2024-10-01 195612](https://github.com/user-attachments/assets/d33accad-e797-4096-9117-45aade42901b)

<br>

### 로그인 및 회원가입
| 로그인 | 회원가입 |
| ------ | ------ |
|![스크린샷 2024-10-01 194825](https://github.com/user-attachments/assets/51e6fd59-467e-461e-8b12-2656ee1d75e9) |![스크린샷 2024-10-01 194804](https://github.com/user-attachments/assets/289c6a80-0439-4bbc-8650-b488036eb072)

<br>

### 장바구니담기
| 장바구니담기(상세페이지) | 장바구니담기(메인) |
| ------ | ------ |
|![스크린샷 2024-10-01 195647](https://github.com/user-attachments/assets/54053ee5-1735-475a-bb91-8e6f5a8037ae) |![스크린샷 2024-10-01 200455](https://github.com/user-attachments/assets/6f36c14f-4f7e-44d4-b002-d17b9c6033a5)

<br>

### 마이페이지
| 내 정보(수정가능) | 비밀번호 변경 |
| ------ | ------ |
|![스크린샷 2024-10-01 200728](https://github.com/user-attachments/assets/0bb1b2e5-b52a-4316-ae12-b4f5d3c66e32) |![스크린샷 2024-10-01 200744](https://github.com/user-attachments/assets/f91f0225-44dd-4412-bb21-ed0d8fea90cc)

| 찜한목록(하트한번더누를시취소) | 장바구니 |
| ------ | ------ |
|![스크린샷 2024-10-01 200841](https://github.com/user-attachments/assets/b39390c4-14ad-4872-90d9-c9209ebe66d8) |![스크린샷 2024-10-01 200915](https://github.com/user-attachments/assets/4ebc825d-1602-4fbd-abbc-25c443ce5f86)

<br>

### 주문/결제페이지
| 주문/결제(주소추가가능) | 
| ------ |
|![스크린샷 2024-10-01 201108](https://github.com/user-attachments/assets/ad5a7f2f-9892-471d-981e-a551a33aa3b7)

<br>
<br>

## 트러블슈팅

<details>
<summary><b>1. addDoc의 랜덤ID생성</b></summary>
<div markdown="1">
  
#### 문제

- 파이어베이스에 user를 가입시 auth에서 받은 uid와 user의 uid가 달라 데이터를 못 받아옴

#### 원인

- user를 가입할때 addDoc를 사용하였는데 addDoc는 랜덤한 ID를 생성하여 만들기 때문에 auth의 uid와 다르다.
  
### 해결

- user를 가입할때 addDoc를 setDoc로 바꾸어 ID를 auth의 user.uid로 지정하여 가입하였다.

</div>
</details>


<details>
<summary><b>2. 상품을 등록할때 이미지 중복오류</b></summary>
<div markdown="1">
  
#### 문제

- URL이 같은 사진을 이용하면 이미지가 중복되어 하나만 보여지는 문제 발생 ex)같은 상품을 2개 올렸는데 하나의 상품만 이미지가 보임

#### 원인

- storage에 저장할때 파일이름으로 이미지를 저장하여 동일한 파일이름을 가진 이미지가 중복되어 하나만 보임
  
### 해결

- uuid를 이용하여 고유한 값으로 이미지 저장

</div>
</details>


<details>
<summary><b>3. 파이어베이스에서 데이터를 받아올때 생기는 타입오류 </b></summary>
<div markdown="1">
  
#### 문제

- 파이어베이스에서 데이터를 받아올때 doc.data()가 타입오류가 계속 발생

#### 원인

- doc.data()는 기본적으로 DocumenData타입을 반환하기때문에 따로 타입을 지정해주지 않아서 오류가 발생
  
### 해결

- 타입단언 기능을 사용하여 doc.data()의 타입을 지정해줬다. ex) ```querySnapshot.forEach((doc) => {
 const data = doc.data() as GoodsItem;
 goodsArr.push(data);
}```

</div>
</details>


<details>
<summary><b>4. 새로고침시 로그인 정보 사라지는 오류 </b></summary>
<div markdown="1">
  
#### 문제

- 로그인을 한 후 새로고침을 하면 로그인 정보가 사라지는 오류 발생

#### 원인

- zustand로 로그인 정보를 관리했는데 zustand는 메모리에 정보를 저장하기 때문
  
### 해결

- zustand의 persist middleware를 사용해 로컬스토리지에 저장하여 새로고침시에도 로컬스토리지에 로그인 정보 저장되게 하였음

</div>
</details>
