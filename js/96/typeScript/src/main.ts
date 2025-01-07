
// Function

function displayToConsole(text: string) {
  console.log(text);
}

let myText: string = 'This is my Text';
let myNum: number = 100;

displayToConsole(myText);
displayToConsole(myNum);

myText = 'This is my changed Text';
myNum = 500;

displayToConsole(myText);
displayToConsole(myNum);

myText = 30;
myNum = 'This number is now Text';

displayToConsole(myText);
displayToConsole(myNum);

//Interface

interface Book {
  title: string,
  auther: string,
  otherBooksInSeries?: Book[],
  youngestAgeLevel?: number
}

function printBookInfo(book: Book) {
  const { title, auther, otherBooksInSeries, youngestAgeLevel } = book;
  const otherBooksInSeriesTitles: string =    //Concants all the titles into a string
    (
      otherBooksInSeries ?
        otherBooksInSeries.map(book => book.title).join(", ")
        : 'N/A'
    )
  console.log(`Title: ${title}, Auther: ${auther}, Series: ${otherBooksInSeriesTitles}, Age Level: ${youngestAgeLevel ? youngestAgeLevel : 'N/A'}`);
}

let myStory = {       // Duck Type
  title: 'My Story Title',
  auther: 'Story Authers Name'
}

let myBook: Book = {
  title: 'My Book Title',
  auther: 'Book Authers Name'
}

let myStory2 = {    // Missing Auther
  title: 'My Story Title',
  youngestAgeLevel: 10
}

let myBook2: Book = {
  title: 'My Book Title',
  auther: 'Book Authers Name',
  otherBooksInSeries: [
    myStory,
    myBook,
    /*myStory2 This failed like it should */
  ]
}

printBookInfo(myStory);
printBookInfo(myBook);
printBookInfo(myStory2);
printBookInfo(myBook2);

// Class/Interface

interface Person {
  first: string,
  last: string;
  age: number
}

class Student implements Person {
  constructor(public first: string, public last: string, public age: number, public averageGrade: number) { }

  Print() {
    console.log(`First: ${this.first}, Last: ${this.last}, Age: ${this.age}, Average Grade: ${this.averageGrade}`);
  }
}

class ClassRoom {
  averageClassGrade: number;
  constructor(public subject: string, public teacher: string, public roomNumber: number, public students: Student[]) {
    this.averageClassGrade = students.reduce((sum, student) => sum + student.averageGrade, 0) / students.length;
  }

  PrintClass() {
    const studentString = this.students.map(student => `${student.first} ${student.last}`).join(", ");
    console.log(`Subject: ${this.subject}, Teacher: ${this.teacher}, Room Number: ${this.roomNumber}, Average Class Grade: ${this.averageClassGrade}, Students: ${studentString}`);
  }
  PrintStudents() {
    this.students.forEach(student => student.Print());
  }
}
const mike: Student = new Student('Mike', 'White', 20, 85);
const tim: Student = new Student('Tim', 'Black', 22, 90);
const jake: Student = new Student('Jake', 'Silver', 23, 100);
const matt: Student = new Student('Matt', 'Gold', 22, 72);

const mathClass: ClassRoom = new ClassRoom('Math', 'Mr. Teacherson', 210, [mike, tim, jake, matt]);

mathClass.PrintClass();
mathClass.PrintStudents();
