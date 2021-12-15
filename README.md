[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Spayker/spike-boost-client/blob/master/LICENSE)
[![Build Status](https://app.travis-ci.com/Spayker/spike-boost-client.svg?branch=master)](https://travis-ci.com/Spayker/spike-boost-client.svg)

# SpikeBoost Client Part

Project stays in the active phaze of development. Android platform was chosen as a main test stand.

## Description
Client concept approximately looks:

![alt text](resources/ux/spikeboost_client.jpg)
![alt text](resources/ux/spikeboost_main.jpg)
![alt text](resources/ux/spikeboost_main_2.jpg)
![alt text](resources/ux/spikeboost_main_3.jpg)
![alt text](resources/ux/spikeboost_main_4.jpg)
![alt text](resources/ux/spikeboost_tracklist.jpg)

Client side of SpikeBoost includes several screens to provide end user with next features:
1) stay authorized in system
2) gps navigation 
3) run/stop trainings
4) select music from tracks
5) Manage quality of neural network by its periodical update

## Technical Stack
1) Java 11 (since min Android SDK is 28)

## How To Run
WIP

## Testing
All tests are rotating around working with rest-end points. Last ones can be divided on couple groups:
1) user auth
2) music list setup
3) start of training activity (gps must be enabled)
4) sending of training data on server
5) receiving of updated neural-network and further its applying

## License
MIT
