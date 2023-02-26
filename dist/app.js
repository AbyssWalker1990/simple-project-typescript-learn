"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required !== null) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength !== null &&
        validatableInput.minLength !== undefined &&
        typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength !== null &&
        validatableInput.maxLength !== undefined &&
        typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof +validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof +validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// Autobind decorator
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
// Project list class
class ProjectList {
    constructor(type) {
        this.type = type;
        const templateEl = document.getElementById('project-list');
        const hostElement = document.getElementById('app');
        if (templateEl != null) {
            this.templateElement = templateEl;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        if (hostElement != null) {
            this.hostElement = hostElement;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        const listUlEl = this.element.querySelector('ul');
        if (listUlEl != null) {
            listUlEl.id = listId;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        const listUlH2El = this.element.querySelector('h2');
        if (listUlH2El != null) {
            listUlH2El.textContent = this.type.toUpperCase() + ' PROJECTS';
        }
        else {
            throw new Error('There is no element with this identifier');
        }
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
// Project input class
class ProjectInput {
    constructor() {
        const templateEl = document.getElementById('project-input');
        const hostElement = document.getElementById('app');
        if (templateEl != null) {
            this.templateElement = templateEl;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        if (hostElement !== null) {
            this.hostElement = hostElement;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = 'user-input';
        const titleInputEl = this.element.querySelector('#title');
        const descriptionInputEl = this.element.querySelector('#description');
        const peopleInputEl = this.element.querySelector('#people');
        if (titleInputEl !== null) {
            this.titleInputElement = titleInputEl;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        if (descriptionInputEl !== null) {
            this.descriptionInputElement = descriptionInputEl;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        if (peopleInputEl !== null) {
            this.peopleInputElement = peopleInputEl;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('Invalid input, please try again');
            throw new Error('Invalid input');
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
