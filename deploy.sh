if [ -z "$1" ]; then
  echo "No ip supplied, usage: ./deploy.sh [IP]"
else
  npx @babel/node deploy.js --ip "$1"
fi
