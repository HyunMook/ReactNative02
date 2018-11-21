# ReactNative02

## ReactNative를 공부해보자!

Ref: <https://facebook.github.io/react-native/docs/getting-started>

-------------------------

### 기본환경 설치

Node는 설치되어있다는 전제이며, MacOS에서는 homebrew 짱짱맨;

```bash
$ brew install watchman
$ npm install -g react-native-cli
```

> ##### Note
> brew install 단계에서 mkdir관련 권한 오류가 발생했다.
> ```text
> Error: An unexpected error occurred during the `brew link` step
> The formula built, but is not symlinked into /usr/local
> Permission denied @ dir_s_mkdir - /usr/local/Frameworks
> Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
> ```
> Single Directory라서 그냥 직접 생성해줬다.
> ```bash
> $ sudo mkdir /usr/local/Frameworks
> $ sudo chown $(whoami) /usr/local/Frameworks
> ```

### iOS 환경을 위한 설정

기본적으로 Xcode 9.4 version 이상이 설치되어 있으면 웬만한 기본설정은 다 되어있다.
CLI 확인은 Xcode에서 "Preferences..." 메뉴에 들어가 Locations 탭을 확인해보면 된다.

### Android 환경을 위한 설정

* [JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Android Studio](https://developer.android.com/studio/index.html)
  - 아래 항목들 포함해서 설치
    + Android SDK
    + Android SDK Platform >>> Latest & Android 8.1 (Oreo)
    + Performance (Intel ® HAXM)
    + Android Virtual Device
  - Android Studio는 기본적으로 최신버전의 Android SDK를 설치한다. 그러나 React Native App을 native code로 Build하기 위해 Android 8.1 (Oreo)이 특별히 요구된다.

    > #### Android SDK Platform 탭에서 확인할 내용
    > 1. 하단의 "Show Package Details" 체크
    > 2. "Android 8.1 (Oreo)" 항목 확장하고 아래 항목 설치
    >     + Android SDK Platform 27
    >     + Intel x86 Atom_64 System Image 또는 Google APIs Intel x86 Atom System Image

    > #### Android SDK Tools 탭에서 확인할 내용
    > 1. 하단의 "Show Package Details" 체크
    > 2. "Android SDK Build-Tools" 항목 확장하고 아래 항목 설치
    >     + 27.0.3
* ANDROID_HOME 환경 변수 설정
  - $HOME/.bash_profile 에 아래 항목 기입
    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
    > ##### Note
    > MacOS에서는 기본적으로 `.bash_profile`을 제공하지 않으며, MacOS의 PATH 초기화는 `/etc/paths`에 기입되어있다. 그런데 `echo $PATH` 명령어를 사용하면 `/etc/paths`의 내용과 다른 부분이 있다. /etc 디렉토리를 살펴보니 `/etc/paths.d/`라는 디렉토리가 있고 그 안의 파일에서 추가된 PATH가 아까 PATH 출력문에서 발견한 다른 부분이었다. 아마 특정 소프트웨어는 설치시 paths.d 디렉토리에 자동으로 파일이 생성되는것같다. 
    >
    > 일단은 /etc 파일들은 수정하지 않고, UNIX 계열 공통으로 사용되는 .bash_profile을 사용했다. 현재 사용자 폴더에 `.bash_profile`을 생성하고, `source ~/.bash_profile` command를 실행하여 PATH에 등록했다.
  - 위의 정확한 경로는 Android Studio의 설정창에서 `Appearance & Behavior > System Settings > Android SDK` 에서 확인할 수 있다.

### React-native 프로젝트 생성

```bash
$ react-native init AwesomeProject
```

> ##### Note
> 프로젝트 생성 command를 실행하고 아래 2가지 주의사항이 발생했다.
> ```text
> npm WARN react-native@0.57.5 requires a peer of react@16.6.1 but none is installed. You must install peer dependencies yourself.
> npm WARN deprecated kleur@2.0.2: Please upgrade to kleur@3 or migrate to 'ansi-colors' if you prefer the old syntax. Visit <https://github.com/lukeed/kleur/releases/tag/v3.0.0\> for migration path(s).
> ```
> 아래와 같이 처리했다.
> 1. 프로젝트 폴더 안에서 npm으로 react를 설치했다.
>     ```bash
>     $ cd AwesomeProject
>     $ npm install --save react
>     + react@16.6.1
>     updated 1 package in 4.541s
>     ```
> 2. `kleur`라는 Node.js Library가 3버전부터 포맷이 바뀌었기 때문에 업그레이트 하라는 이야긴데... 아직 내가 `kleur`을 쓸지 안쓸지도 모르니 일단은 그대로 두겠다.

### React-native App 실행

#### iOS Simulator

위 절차에 문제가 없었다면, 터미널에서 아래 Command를 실행하면 별다른 추가 설정없이 Simulator가 실행된다.
```bash
$ cd AwesomeProject
$ react-native run-ios
```
> ##### Note
> 처음에 가상 기기만 켜지고 아무것도 없길래 당황했는데, 내 프로젝트의 앱을 빌드중이었던 것 같다. 빌드가 완료되면 앱이 설치되며 자동실행된다. 
> _VD의 UI가 아이폰X라서 홈버튼을 못찾아 당황했다. Device는 Simulator의 Hardware Menu에서 변경 가능하다._

#### Android Emulator

1. Android Studio 실행
2. .../AwesomeProject/android 열기
3. 상단 툴바에서 "AVD Manager" 클릭
4. "+Create Virtual Device..." 클릭
5. 기기를 선택하고 Next 버튼 클릭
6. Oreo API Level 27 선택하고 Next 버튼 클릭
7. 나머지 항목 확인 후 Finish 버튼 클릭(기본값으로 둬도 무방)

위의 Emulator 등록 절차가 완료되면, 터미널에서 아래 Command를 실행한다.
```bash
$ cd AwesomeProject
$ react-native run-android
```

> ##### Note
> Android Studio에서 AVD를 실행시키지 않고 run-android 명령을 실행하면 아래와같은 에러가 발생한다. 
> (ios는 알아서 VD가 실행되던데...)
> ```bash
> FAILURE: Build failed with an exception.
> 
> * What went wrong:
> Execution failed for task ':app:installDebug'.
> com.android.builder.testing.api.DeviceException: No connected devices!
> 
> * Try:
> Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.
> 
> * Get more help at https://help.gradle.org
> 
> BUILD FAILED in 1s
> 27 actionable tasks: 1 executed, 26 up-to-date
> Could not install the app on the device, read the error above for details.
> Make sure you have an Android emulator running or a device connected and have
> set up your Android development environment:
> https://facebook.github.io/react-native/docs/getting-started.html
> ```
> AVD를 먼저 실행하고 run-android 명령을 실행하면 켜져있는 AVD에서 내 프로젝트 앱이 실행된다.
