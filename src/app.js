// Project State Management
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        console.log('triggered getInstance');
        if (this.instance !== null) {
            console.log('Old instance');
            return this.instance;
        }
        this.instance = new ProjectState();
        console.log('New instance');
        return this.instance;
    };
    ProjectState.prototype.addListener = function (listenerFn) {
        console.log('Try to push');
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProject = function (title, description, numOfPeople) {
        var newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople
        };
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn.apply(void 0, this.projects);
        }
    };
    return ProjectState;
}());
// Creating global constant for state
var projectState = ProjectState.getInstance();
function validate(validatableInput) {
    var isValid = true;
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
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
// Project list class
var ProjectList = /** @class */ (function () {
    function ProjectList(type) {
        var _this = this;
        this.type = type;
        var templateEl = document.getElementById('project-list');
        var hostElement = document.getElementById('app');
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
        this.assignedProjects = [];
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = "".concat(this.type, "-projects");
        projectState.addListener(function (projects) {
            _this.assignedProjects = projects;
            _this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    ProjectList.prototype.renderProjects = function () {
        console.log('RENDER PROJECTS');
        var listEl = document.getElementById("".concat(this.type, "-projects-list"));
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            var listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    };
    ProjectList.prototype.renderContent = function () {
        var listId = "".concat(this.type, "-projects-list");
        var listUlEl = this.element.querySelector('ul');
        if (listUlEl != null) {
            listUlEl.id = listId;
        }
        else {
            throw new Error('There is no element with this identifier');
        }
        var listUlH2El = this.element.querySelector('h2');
        if (listUlH2El != null) {
            listUlH2El.textContent = this.type.toUpperCase() + ' PROJECTS';
        }
        else {
            throw new Error('There is no element with this identifier');
        }
    };
    ProjectList.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    };
    return ProjectList;
}());
// Project input class
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        var templateEl = document.getElementById('project-input');
        var hostElement = document.getElementById('app');
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
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = 'user-input';
        var titleInputEl = this.element.querySelector('#title');
        var descriptionInputEl = this.element.querySelector('#description');
        var peopleInputEl = this.element.querySelector('#people');
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
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleInputElement.value;
        var enteredDescription = this.descriptionInputElement.value;
        var enteredPeople = this.peopleInputElement.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true
        };
        var descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        var peopleValidatable = {
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
    };
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    };
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            if (projectState !== null) {
                console.log('not null');
                projectState.addProject(title, desc, people);
            }
            console.log(title, desc, people);
            this.clearInputs();
        }
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler);
    };
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    __decorate([
        Autobind
    ], ProjectInput.prototype, "submitHandler");
    return ProjectInput;
}());
var prjInput = new ProjectInput();
var activePrjList = new ProjectList('active');
var finishedPrjList = new ProjectList('finished');
