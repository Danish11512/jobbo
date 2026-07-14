#!/bin/bash
# Start the Mermaid diagram server
# Usage: ./server.sh start | stop

PID_FILE="/tmp/jobbo-diagrams-server.pid"
PORT=8421
DIR="$(cd "$(dirname "$0")" && pwd)"

case "${1:-start}" in
  start)
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
      echo "Server already running on port $PORT (PID $(cat $PID_FILE))"
      exit 0
    fi
    cd "$DIR" && python3 -m http.server $PORT &
    echo $! > "$PID_FILE"
    echo "Server started on http://localhost:$PORT (PID $!)"
    ;;
  stop)
    if [ -f "$PID_FILE" ]; then
      PID=$(cat "$PID_FILE")
      if kill -0 "$PID" 2>/dev/null; then
        kill "$PID"
        echo "Server stopped (PID $PID)"
      else
        echo "Server not running (stale PID file)"
      fi
      rm -f "$PID_FILE"
    else
      echo "No PID file found. Try: lsof -i :$PORT"
    fi
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
