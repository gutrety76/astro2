#!/bin/bash

# wait-for-it.sh script to wait for a service to be available
HOST=$1
PORT=$2
shift 2

timeout=${WAITFORIT_TIMEOUT:-15}
interval=${WAITFORIT_INTERVAL:-1}

for i in $(seq $timeout); do
  nc -z $HOST $PORT && break
  echo "Waiting for $HOST:$PORT... ($i/$timeout)"
  sleep $interval
done

if [ $i -eq $timeout ]; then
  echo "Timeout reached: $HOST:$PORT is not available"
  exit 1
fi

exec "$@"
