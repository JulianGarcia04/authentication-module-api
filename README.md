<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Requirements

#### - Google Cloud CLI

**Installing the Google Cloud CLI**

The Google Cloud CLI is a command-line tool that allows you to interact with Google Cloud Platform
services from your local machine. Here's a step-by-step guide on how to install it:

**1. Prerequisites:**

- **Operating System:** Ensure you're running one of the supported operating systems: Linux, macOS,
  or Windows.
- **Python:** The CLI requires Python 3.7 or later to be installed. You can check your Python
  version using the `python --version` command in your terminal. If you don't have it installed,
  download and install it from [https://www.python.org/](https://www.python.org/).

**2. Installation Methods:**

**Method 1: Using the Google Cloud SDK Installer**

- **Download:** Visit the official Google Cloud SDK installation page:
  [https://cloud.google.com/sdk](https://cloud.google.com/sdk)
- **Select Platform:** Choose the installer for your operating system (Linux, macOS, or Windows).
- **Run Installer:** Double-click the downloaded installer file and follow the on-screen
  instructions.

**Method 2: Using the `gcloud` Command (Linux/macOS)**

- **Install with `curl`:** Open a terminal and execute the following command:

  ```bash
  curl https://sdk.cloud.google.com | bash
  ```

- **Install with `wget`:** Alternatively, you can use `wget`:

  ```bash
  wget https://sdk.cloud.google.com -O gcloud-installer.sh && bash gcloud-installer.sh
  ```

**3. Configuration:**

- **Initialization:** After installation, run the following command to initialize the CLI and create
  a configuration file:

  ```bash
  gcloud init
  ```

- **Account Selection:** Choose the Google account you want to use with the CLI. If you're not
  logged in, you'll be prompted to authenticate using your browser.

- **Project Selection:** Select the Google Cloud project you want to work with. You can create new
  projects or choose existing ones.

**4. Verification:**

- **Check Installation:** Run the following command to verify the installation and check the CLI
  version:

  ```bash
  gcloud --version
  ```

**5. Additional Notes:**

- **Component Installation:** The CLI comes with a set of components that can be installed or
  uninstalled using the `gcloud components` command.
- **Usage:** Refer to the official Google Cloud CLI documentation for detailed usage information and
  commands: [https://cloud.google.com/sdk/docs](https://cloud.google.com/sdk/docs)

By following these steps, you'll have the Google Cloud CLI successfully installed and ready to use
for managing your Google Cloud resources.

## Running firestore local database

```bash
# start firestore database
$ pnpm run start:db
or
$ gcloud emulators firestore start --host-port=localhost:8080
```

## Enviroment variables

This enviroment variables is necessary for you can access to all features and endpoints

```typescript
  {
    TWILIO_ACCOUNT_SID: string
    TWILIO_AUTH_TOKEN: string
    TWILIO_VERIFY_SERVICE: string
    JWT_SECRET: string
    PORT?: number
  }
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the
amazing backers. If you'd like to join them, please
[read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

