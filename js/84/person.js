(function () {
    'use strict';

    class Person {
        constructor(firstName, lastName, age) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
        }
        toString() {
            return `Hi! My Name Is ${this.firstName} ${this.lastName} And I Am ${this.age} Years Old.`
        }
    }

    const p1 = new Person('Michoel', 'Weiss', 23);
    console.log('p1: ' + p1);

    class Student extends Person {
        constructor(firstName, lastName, age, grade) {
            super(firstName, lastName, age);
            this.grade = grade;
        }
        toString() {
            return `${super.toString()} My School Grade Is ${this.grade}.`
        }
    }

    const s1 = new Student('Yakov', 'Smith', 20, 83);
    console.log('s1: ' + s1);
}());

