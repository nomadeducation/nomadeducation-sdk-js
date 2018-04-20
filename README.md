# Kane Web SDK

## Installation

*As we're currently only using macs, we won't describe prerequisites and processes for the other OSes*

If you don't have [Homebrew](http://brew.sh/), we're urgently asking you to install it!

### Prerequisites

Execute the following in your favorite terminal:
```bash
brew install caskroom/cask/docker
```

## Usage

Launch the following command to test the SDK:
```bash
# remove "-d" if you want to see the logs 
docker-compose up -d
# you can also invoke the debugger
# it'll wait on the first line while you're not attached
docker-compose exec web yarn test:debug
```

You can **upgrade** the docker images with the following commands:
```bash
# - remove existing containers
docker-compose down
# - retrieve (and build) new image for the node stack
docker-compose build --pull
# - retrieve new images from dependencies (redis, postgres)
docker-compose pull
# - recreate the stack
docker-compose up -d
```

### Linting

Made using `eslint`. To enforce rules to be applied, use `docker-compose exec web yarn lint:fix`.

### Packaging

To add a new package, you **must** use docker using `docker-compose run web yarn add ...`
because it's using the right version of both `node` and `yarn`.
Don't forget to rebuild the "web" image once you've added new packages using `docker-compose build`.

### Debugging

You can have access to the debugger attached to the executed `node` process through the port exposed in `docker-compose.yml`.
For instance on **Webstorm**, go to "Run > Edit Configurations..." and on the opened panel, click on the "+" button and select
the "Attach to Node.js/Chrome" config.
