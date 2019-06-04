// import globalConfig from 'src/config/global'

const os = require("os");
const exec = require('child_process').exec;

const user = "nao";
const ip = "192.168.42.19";
const appName = "R2019";
const naoqiIsPresent = true;

const cwd = process.cwd();


console.log("Deploying");

if (naoqiIsPresent) {
	
	switch (os.platform()) {
		case "linux":
			exec(`echo  "put -r ${cwd}/build/* /home/nao/.local/share/PackageManager/apps/${appName}/html" | sftp ${user}@${ip} `, (err, stdout, strerr) => {
				if (err) throw err;
				console.log("Data pushed");
			});
			break;
		case "win32":
			exec(`echo  put -r ${cwd}/build/ /home/nao/.local/share/PackageManager/apps/${appName}/html | sftp ${user}@${ip} `, (err, stdout, strerr) => {
				if (err) throw err;
				console.error(strerr);
				console.log("Data pushed");
			});
			break;
		
		
		default:
			break;
	}
}
