# robocup_pepper-HRI_JS

## Dependencies
You need node version 10 or above to build and deploy

You can install it with `sudo install.sh`

To check node version use `node -v`

## Build

To build the application:`npm run build`

## Deploy

To deploy the application: `./deploy.sh [IP of Pepper]`

### Exit code:
- 0: Ok
- 2: Unsupported node version

## Uses
- Start the local manager `before` the tablet
- Scroll is disabled by default on the tablet.
    - To enable: spam on scenario title until it gets red