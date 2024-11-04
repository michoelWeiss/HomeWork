(function () {
    'use strict';

    function Vehicle(color) {
        this.color = color;
        this.speed = 0;
    }

    Vehicle.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`Vehicle is now going at speed ${this.speed}`);
    };

    Vehicle.prototype.print = function () {
        console.log(`Vehicle color: ${this.color}, current speed: ${this.speed}`);
    };

    function Plane(color) {
        Vehicle.call(this, color);
    }

    Plane.prototype = Object.create(Vehicle.prototype);
    Plane.prototype.constructor = Plane;

    Plane.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`Plane is now FLYING at speed ${this.speed}`);
    };



    const myCar = new Vehicle('red');
    const myPlane = new Plane('white');
    myCar.go(60);
    myPlane.go(500);
    myCar.print();
    myPlane.print();




}());

