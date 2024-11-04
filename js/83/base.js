(function () {
    'use strict';

    class Element {

        constructor(innertext) {
            this.innertext = innertext;
        }
        #children = [];

        addChild(element) {
            this.#children.push(element);
        }
        getChildren() {
            return this.#children;
        }
        removeChild(element) {
            this.#children.splice(this.#children.indexOf(element), 1);
        }
        setInnertext(innertext) {
            this.innertext = innertext;
        }
        getInnertext() {
            return this.innertext;
        }
        render() {
            console.log(this.innertext);
            this.#children.forEach(element => element.render());
        }
    }
    class Div extends Element {
        constructor(innertext) {
            super(innertext);
        }
        render() {
            console.log('Im a Div');
            super.render();
        }
    }
    class H1 extends Element {
        constructor(innertext) {
            super(innertext);
        }
        render() {
            console.log('Im a H1');
            super.render();
        }
    }

    const div = new Div('a');
    const h11 = new H1('b');
    const h12 = new H1('c');
    div.addChild(h11);
    div.addChild(h12);
    div.render();

    console.log('PART 2!!!!');

    div.setInnertext('new div inner text');
    div.removeChild(h11);
    div.render();

}());