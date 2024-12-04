import { Component } from "react";
import './Calculator.css'

export class Calculator extends Component {

    operators = [
        (a, b) => a + b, // Addition
        (a, b) => a - b, // Subtraction
        (a, b) => a * b, // Multiplication
        (a, b) => a / b  // Division
    ];

    constructor(props) {
        super(props);
        this.state = { display: '' };
        this.components;

        this.calculate = this.calculate.bind(this)
    }

    displayToUser(num) {
        this.setState({
            display: this.state.display + num
        });
    }

    isNumber(value) {
        return !isNaN(value) && !isNaN(parseFloat(value));
    }

    calculate = () => {

        if (this.state.display) {

            this.components = this.state.display.match(/\d+(\.\d+)?|(?:\.\d+)|[^\d.]/g);
            console.log(this.components);
            if (this.components.length > 0) {  // remove empty strings
                for (let i = this.components.length - 1; i >= 0; i--) {
                    let component = this.components[i];
                    if (component === ' ')
                        this.components.splice(i, 1);
                }

                for (let i = 0; i < this.components.length; i++) {  // takes double - and turns it into -num
                    let component = this.components[i];
                    if (component === '-' && i - 1 < 0 || !this.isNumber(this.components[i - 1]) && this.isNumber(this.components[i + 1])) {
                        this.components.splice(i, 2, this.components[i] + this.components[i + 1]);
                        i -= 1;
                    }
                    if (this.isNumber(component)) {  // string to num
                        component = Number(component);
                        this.components.splice(i, 1, component)
                    }
                }

                console.log(this.components);
                for (let i = 0; i < this.components.length; i++) {  // do math
                    let component = this.components[i];
                    if (!this.isNumber(component)) {   // order of operation
                        switch (component) {
                            case '*':
                                if (this.isNumber(this.components[i - 1]) && this.isNumber(this.components[i + 1])) {
                                    this.components.splice(i - 1, 3, this.operators[2](this.components[i - 1], this.components[i + 1]));
                                    i -= 1;
                                }
                                break;
                            case '/':
                                if (this.isNumber(this.components[i - 1]) &&
                                    this.isNumber(this.components[i + 1])) {
                                    this.components.splice(i - 1, 3, this.operators[3](this.components[i - 1], this.components[i + 1]));
                                    i -= 1;
                                }
                                break;
                        }
                    }
                }

                for (let i = 0; i < this.components.length; i++) {
                    let component = this.components[i];
                    if (!this.isNumber(component)) {
                        switch (component) {
                            case '+':
                                if (this.isNumber(this.components[i - 1]) && this.isNumber(this.components[i + 1])) {
                                    this.components.splice(i - 1, 3, this.operators[0](this.components[i - 1], this.components[i + 1]));
                                    i -= 1;
                                }
                                break;
                            case '-':
                                if (this.isNumber(this.components[i - 1]) && this.isNumber(this.components[i + 1])) {
                                    this.components.splice(i - 1, 3, this.operators[1](this.components[i - 1], this.components[i + 1]));
                                    i -= 1;
                                }
                                break;
                        }
                    }
                }
                if (this.components.length > 1 || !this.isNumber(this.components[0])) {
                    this.error();
                    return;
                }
                this.displayToUser(`= ${this.components[0]}`);
            }
        }
    }

    error() {
        this.displayToUser(`= Invalid Equation`);
    }
    render() {
        return (
            <>
                <div className="calculatorBody">
                    <div className="displayEquation"> <h3>{this.state.display}</h3></div>
                    <br />
                    <button onClick={() => this.displayToUser('1')}>1</button>
                    <button onClick={() => this.displayToUser('2')}>2</button>
                    <button onClick={() => this.displayToUser('3')}>3</button>
                    <br />
                    <button onClick={() => this.displayToUser('4')}>4</button>
                    <button onClick={() => this.displayToUser('5')}>5</button>
                    <button onClick={() => this.displayToUser('6')}>6</button>
                    <br />
                    <button onClick={() => this.displayToUser('7')}>7</button>
                    <button onClick={() => this.displayToUser('8')}>8</button>
                    <button onClick={() => this.displayToUser('9')}>9</button>
                    <br />
                    <button onClick={() => this.displayToUser('0')}>0</button>
                    <br /> <br />
                    <button onClick={() => this.displayToUser(' + ')}>+</button>
                    <button onClick={() => this.displayToUser(' - ')}>-</button>
                    <button onClick={() => this.displayToUser(' * ')}>*</button>
                    <button onClick={() => this.displayToUser(' / ')}>/</button>
                    <button onClick={() => this.displayToUser('.')}>.</button>
                    <button onClick={this.calculate}>=</button>
                </div>

            </>
        );
    }
}