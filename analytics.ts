class Name {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
}

class Department {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	newName(newName: string) {
		return new Department(newName);
	}
	logName(this: Department) {
		console.log('name', this.name);
	}
}

let firstDepartment = new Department('Accounting');
// console.log(firstDepartment.newName('helo'));
let obj1 = {
	name: 's ',
	describe: firstDepartment.logName
};
console.log(obj1.describe());
