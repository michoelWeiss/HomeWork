import Computer from './base.js';

const gamingPC = new Computer("Alienware", "Aurora R15", "Intel Core i9-13900KF", 32, "2TB SSD", "Windows 11 Pro");
const businessLaptop = new Computer("Lenovo", "ThinkPad X1 Carbon", "Intel Core i7-1260P", 16, "512GB SSD", "Windows 10 Pro");

console.log(`gamingPC: ${gamingPC}`);
console.log(`businessLaptop: ${businessLaptop}`);
gamingPC.powerOn();
console.log(`gamingPC: ${gamingPC}`);
console.log(`businessLaptop: ${businessLaptop}`);