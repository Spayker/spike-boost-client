# SpikeBoost Client Part

Project stays in the active phaze of development. Currently, Android platform is chosed as a main test stand.
If it works like expected IoS support will be included.

## Description
Client side of SpikeBoost includes several screens to provide end user with next features:
1) stay authorized in system
2) gps navigation 
3) run/stop trainings
4) select music from tracks
5) Manage quality of neural network by its periodical update

## Technical Stack
1) Java 8 (since min Android SDK is 21)
2) React-Native v0.61.2

## How To Run
In Project root folder:
1) npm start
2) check if test Android device is attached: adb devices
3) refresh cache in adb: adb shell am clear-debug-app
4) run application: react-native run-android