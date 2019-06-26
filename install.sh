echo "Installing npm"
sudo apt install npm -y
echo "Installing node lts"
sudo npm install -g n
sudo n lts
echo "Installing Js dependencies"
npm install
echo "Everything is OK you can build with \`npm run build\`"