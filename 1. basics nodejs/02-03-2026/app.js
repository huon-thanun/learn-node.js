let i = 5 + 5
let name = 'ant'

// let display = () => {
//     console.log('hello ant');

// }

// Define the Student class
class Student {
    constructor(name, age) {
        // Validate inputs
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error("Name must be a non-empty string");
        }
        if (typeof age !== 'number' || age <= 0) {
            throw new Error("Age must be a positive number");
        }

        this.name = name;
        this.age = age;
    }

    // Example method
    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }

}

// Create instances of Student
try {
    const student1 = new Student("Alice", 20);
    const student2 = new Student("Bob", 22);

    // Call a method
    student1.displayInfo(); // Output: Name: Alice, Age: 20
    student2.displayInfo(); // Output: Name: Bob, Age: 22

} catch (error) {
    console.error("Error creating student:", error.message);
}

let testModle = () => {
    console.log('module testing');

}
let arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]

module.exports = {
    i,
    name, 
    testModle,
    arr
};




// let a = 10;
// console.log(a);

// setTimeout(() => {
//     console.log('Hello node.js');
// }, 3000);

// setInterval(() => {
//     console.log('setInterval');
// }, 1000);

// let count = 0

// let interval1 = setInterval(() => {
//     console.log('setInterval');
//     count++;

//     if (count == 5) clearInterval(interval1);

// }, 1000);


// console.log(i);
// console.log(name);
// display();

console.log(__dirname);
console.log(__filename);

