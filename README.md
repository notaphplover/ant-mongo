[![Build status](https://github.com/notaphplover/ant-mongo/workflows/ci/badge.svg)](https://github.com/notaphplover/ant-mongo/workflows/ci/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/notaphplover/ant-mongo/badge.svg?branch=refs/heads/develop)](https://coveralls.io/github/notaphplover/ant-mongo?branch=refs/heads/develop)

## Description

MongoDB extension for [AntJS](https://github.com/notaphplover/ant-js).

## How to build the library

Just run the build script:

```
npm run build
```

## How to run tests

Tests are dockerized in order to start a redis server and a PostgreSQL server in a virtual environment.

You can run all the tests with the test script:

```
npm test
```

A coverage report will be generated at the coverage directory.

## Aknowledgements

Special thanks to [Adrián Martínez Jiménez](https://github.com/Adrianmjim) for encouraging me to start this project and for all the contributions to this project.
