// import globalConfig from 'src/config/global'

const os = require("os");
const exec = require('child_process').exec;
const process = require("process");
const ArgumentParser = require("argparse").ArgumentParser;

const parser = ArgumentParser({
	version: 1,
	addHelp: true,
	description: "Tool to automaticaly deploy js to Pepper"
});

parser.addArgument(['--ip'], {help: "Ip of Pepper"});
parser.addArgument(['--app'], {
	help: "The Naoqi app's name",
	defaultValue: "R2019"
});
parser.addArgument(['--user'], {help: "User for Pepper", defaultValue: "nao"});

const args = parser.parseArgs();

const {user, ip, app : appName} = args;

const cwd = process.cwd();



if(ip) {
	console.log("Deploying from", os.platform());
	let command = "";
	switch (os.platform()) {
		case "linux":
			command = `echo  "put -r ${cwd}/build/* /home/nao/.local/share/PackageManager/apps/${appName}/html" | sftp ${user}@${ip}`
			break;
		case "win32":
			command = `echo  put -r ${cwd}/build/ /home/nao/.local/share/PackageManager/apps/${appName}/html | sftp ${user}@${ip} `
			break;
		default:
			break;
	}
	
	exec(command, (err) => {
		if (err) throw err;
		console.log("Data pushed");
	});
}
else {
	console.error("No ip provided please use flag --ip or see --help")
}

