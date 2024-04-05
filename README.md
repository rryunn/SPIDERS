# SPIDERS


## 밴드 합주 예약 페이지


제작 기간 : 23.02-03 (2개월)


개발 인원 : 1명 (개인 프로젝트)




플랫폼 : WEB


언어 : javascript, html, css 


DB : Mysql


서버 : Node.js
<img src="https://github.com/rryunn/SPIDERS/assets/122458948/8d849e88-0d90-467c-9305-e3690a85db52" alt="스크린샷" width="400" height="300">




### 서비스 기획


중앙 동아리 소속 밴드부 SPIDERS의 합주 예약 시스템 페이지이다.


우리 밴드부는 한정된 공간 때문에 한 시간대에는 하나의 팀만이 합주할 수 있다.
이로 인해 일정 중복을 피하기 위해 매번 카카오톡으로 확인해야하는 번거로움이 있었다.


이러한 불편함을 해소하기 위해 공유 구글 시트를 활용하여 일정을 작성하였지만, 여러 문제들이 발생하였다.


![스크린샷 2024-04-05 111804](https://github.com/rryunn/SPIDERS/assets/122458948/92d218d4-01ba-4aa2-9639-8a5141c4869c)


오류로 인해 작성한 일정이 사라지거나, 정기적으로 시트를 정리해야 했으며, 일정 파악이 어렵고 시간대 작성이 번거로웠다.


이러한 고민을 해결하기 위해 전용 웹 페이지를 개발하였다. 이 페이지를 통해 간편하게 일정을 확인하고 예약할 수 있으며, 시각적으로 일정을 파악할 수 있는 편의성을 제공한다. 


### 사용자 페이지 주요 기능




* 시작 페이지
![스크린샷 2024-04-05 110228](https://github.com/rryunn/SPIDERS/assets/122458948/107e86b3-f892-4510-b72d-2aba91086707)


페이지에 접속 시, spiders의 로고가 보인다. 해당 화면은 어느 페이지를 들어가든, 상단에 위치해있다.


사진 속 '지금 예약하기' 버튼을 누를 시 일정 등록하기 페이지로 이동한다.




* 전체 일정 확인 (달력)
![스크린샷 2024-04-05 110106](https://github.com/rryunn/SPIDERS/assets/122458948/9105118f-ab4a-458b-9e58-ad63a20102c8)


달력을 통해 전체 일정을 한 눈에 확인 가능하다. 


달력의 특정 날짜를 선택하면, 해당 날짜에 등록된 합주 시간들을 더 자세히 확인할 수 있다.




* 일정 등록하기
![스크린샷 2024-04-05 110131](https://github.com/rryunn/SPIDERS/assets/122458948/c8d5ad70-3d9f-4d52-86ae-9102c757dedc)


원하는 날짜와 시간대를 선택하면, 자동으로 작성된다. 이어서 사용자명을 입력하고 확인 시, 해당 일정이 등록된다. 


만약 같은 시간대에 이미 예약된 일정이 있다면, 일정을 재선택한다.


날짜 혹은 시간대를 잘못 선택 시, 재선택 버튼을 눌러 빠르게 리셋시킬 수 있다.




* 일정 리스트 확인
![스크린샷 2024-04-05 110156](https://github.com/rryunn/SPIDERS/assets/122458948/656828c0-b453-4af5-995b-59a027be8684)


사용자들이 등록한 모든 일정을 확인할 수 있다. 


날짜별로 배열되어 있으며, 예약한 날짜가 지나면 배경색이 회색으로 바뀌며 맨 뒤로 순서가 변경된다.



* react 프레임워크를 배운 후 새롭게 다시 제작해볼 예정. ( 웹뷰 기능을 이용하여 앱으로 다시 제작 )





