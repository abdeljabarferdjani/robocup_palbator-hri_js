# robocup_pepper-HRI_JS

## Dependencies
You need at least the version 10 of **node** to build and deploy

You can install **node** with `sudo ./install.sh`

To check **node** version use `node -v`

## Build

To build the application:`npm run build`

## Deploy

To deploy the application: `./deploy.sh [IP of Pepper]`

### Exit code:
- 0: Ok
- 1: No build folder
- 2: Unsupported node version

## Uses
- Start the local manager `before` the tablet
- Scroll is disabled by default on the tablet.
    - To enable: spam on scenario title until it gets red