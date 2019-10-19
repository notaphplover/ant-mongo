#!/bin/bash
if [ -z "$COVERALLS_REPO_TOKEN" ]; then
    echo '$COVERALLS_REPO_TOKEN is not provided.'
else
    echo "\nCOVERALLS_REPO_TOKEN=$COVERALLS_REPO_TOKEN\n" >> .env
    echo '$COVERALLS_REPO_TOKEN added to .env file'
fi