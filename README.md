# Shared Agendas

## What should be installed on your machine

• [NodeJS and NPM](https://nodejs.org/en/)

• [macOS and Linux setup](https://facebook.github.io/react-native/docs/getting-started.html): make sure to click on "Building Projects with Native Code" and follow the instructions

• [windows setup](https://shift.infinite.red/getting-started-with-react-native-development-on-windows-90d85a72ae65)

If you didn't install react-native-cli, you can do it this way

```sh
42sh> npm install -g react-native-cli
```

### preparing your project


```sh
42sh> git clone git@github.com:kgosse/sharedagendas.git
42sh> cd sharedagendas
42sh> npm i
```

### Running your project

From project dir, run:

#### iOS
1. Build and run (this will start a simulator if not already started)

	```sh
	react-native run-ios
	```
	This would also start a packager if not already started

2. Set your Simulator to live reload changes `⌘`+`d`  (`cmd`+`d`) => `Enable Live Reload`



#### Android
1. Start an emulator or just connect an android phone with a usb cable
2. Build and run

	```sh
	react-native run-android
	```
	This would also start a packager if not already started


3. Set your Emulator to live reload changes `⌘`+`m`  (`cmd`+`m`) => `Enable Hot Reloading`

To open packager manually, from project dir run:

```sh
react-native start
```

