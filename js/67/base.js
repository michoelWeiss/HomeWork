
const dayOfWeek = (function () {

    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'shabbas'];

    return {
        getDayName: index => {
            return days[index - 1];
        },
        getDayNumber: day => {
            let index = days.findIndex(d => d === day.toLowerCase());
            return index + 1;
        }
    };
}());

console.log(dayOfWeek.getDayName(3));
console.log(dayOfWeek.getDayNumber('Tuesday'));

/////// INTEREST CALCULATOR /////////

const interest_calc = (function () {

    let years;
    let interest_rate;

    function setYears(y) {
        years = y;
    }

    return {
        setRate: r => {
            interest_rate = r / 100 + 1;
        },
        calculateInterest: principal => {
            for (let i = 0; i < years; i++) {
                principal = principal * interest_rate  // compounding interest 
            }
            return principal;
        },
        setYears: y => {
            years = y;
        }
    }
}());

interest_calc.setRate(3.5);
interest_calc.setYears(25);
console.log(interest_calc.calculateInterest(1057));