#!/bin/bash

REPO_PATH="/home/trip-planner/personalized-trip-planner-with-ai/trip-planner-backend"
OUTPUT_PATH="/home/trip-planner/personalized-trip-planner-with-ai/trip-planner-backend/goOutputBuilds"
BUILD_NAME="tripPlannerBackend"
LOG_PATH="/home/trip-planner/personalized-trip-planner-with-ai/trip-planner-backend/centralLogging" 
LOG_FILE_NAME="trip-planner-backend-application-logs.log"

cd "$REPO_PATH" || exit 1

echo ">>> Pulling latest code..."
git pull

echo ">>> Building Go project..."
go build -o "$OUTPUT_PATH/$BUILD_NAME"


PID=$(pgrep -f "$OUTPUT_PATH/$BUILD_NAME")
if [ -n "$PID" ]; then
    echo ">>> Killing old process (PID: $PID)..."
    kill -9 "$PID"
fi

echo ">>> Deploying new build..."
nohup "$OUTPUT_PATH/$BUILD_NAME" > "$LOG_PATH/$LOG_FILE_NAME" 2>&1 &

NEW_PID=$!
echo ">>> New process started with PID: $NEW_PID"
