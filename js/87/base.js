export default class Computer {
    constructor(brand, model, cpu, ram, storage, os) {
      this.brand = brand;
      this.model = model;
      this.cpu = cpu;
      this.ram = ram;
      this.storage = storage;
      this.os = os;
      this.powerState = "Off";
    }
  
    powerOn() {
      this.powerState = "On";
      console.log(`${this.brand} ${this.model} is now On.`);
    }
  
    powerOff() {
      this.powerState = "Off";
      console.log(`${this.brand} ${this.model} is now Off.`);
    }
    toString(){
        return `\nComputer:_\nBrand: ${this.brand},\nModel: ${this.model},\nCPU: ${this.cpu},\nRam: ${this.ram},\nStorage: ${this.storage},\nOS: ${this.os},\nPowerState: ${this.powerState}`;
    }
  }