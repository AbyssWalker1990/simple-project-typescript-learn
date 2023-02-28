/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
// Component Base class
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        const templateEl = document.getElementById(templateId);
        const hostElement = document.getElementById(hostElementId);
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
        if (newElementId != null) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _components_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/base-component */ "./src/components/base-component.ts");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _components_base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
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
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
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
        if (!(0,_utils_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(titleValidatable) ||
            !(0,_utils_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(descriptionValidatable) ||
            !(0,_utils_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(peopleValidatable)) {
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
            if (_state_project_state__WEBPACK_IMPORTED_MODULE_2__.projectState !== null) {
                _state_project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.addProject(title, desc, people);
            }
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_3__.Autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _components_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// Project Item Class
class ProjectItem extends _components_base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
    get persons() {
        const strPeople = this.project.people.toString();
        if (this.project.people === 1) {
            return '1 person';
        }
        else {
            return `${strPeople} persons`;
        }
    }
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        const eventObj = event.dataTransfer;
        if (eventObj !== null) {
            eventObj.setData('text/plain', this.project.id);
            eventObj.effectAllowed = 'move';
        }
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        const h2El = this.element.querySelector('h2');
        const h3El = this.element.querySelector('h3');
        const pEl = this.element.querySelector('p');
        if (h2El !== null) {
            h2El.textContent = this.project.title;
        }
        if (h3El !== null) {
            h3El.textContent = this.project.description.toString();
        }
        if (pEl !== null) {
            pEl.textContent = this.persons + ' assigned.';
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.Autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Project list class
class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if ((event.dataTransfer != null) && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer?.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.moveProject(prjId, this.type === 'active' ? _models_project_model__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Active : _models_project_model__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Active;
                }
                return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
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
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        const ulEl = this.element.querySelector('ul');
        for (const prjItem of this.assignedProjects) {
            if (ulEl !== null) {
                const proj = new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(ulEl.id, prjItem);
            }
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.Autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.Autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind-decorator.ts":
/*!**********************************************!*\
  !*** ./src/decorators/autobind-decorator.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Autobind": () => (/* binding */ Autobind)
/* harmony export */ });
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


/***/ }),

/***/ "./src/models/project-model.ts":
/*!*************************************!*\
  !*** ./src/models/project-model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus)
/* harmony export */ });
// Project type
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance != null) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project_model__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project != null && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
// Creating global constant for state
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');
console.log('Hi');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHO0tBQ3BFO0lBQ0QsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQy9FLE9BQU8sR0FBRyxPQUFPLElBQUksZ0JBQWdCLENBQUMsS0FBSyxJQUFJLGdCQUFnQixDQUFDLEdBQUc7S0FDcEU7SUFFRCxPQUFPLE9BQU87QUFDaEIsQ0FBQzs7Ozs7OztVQ2pDRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ055RDtBQUNGO0FBRXZELElBQUksbUVBQVksRUFBRTtBQUNsQixJQUFJLGlFQUFXLENBQUMsUUFBUSxDQUFDO0FBQ3pCLElBQUksaUVBQVcsQ0FBQyxVQUFVLENBQUM7QUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGUtcHJvamVjdC10eXBlc2NyaXB0LWxlYXJuLy4vc3JjL2NvbXBvbmVudHMvYmFzZS1jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXByb2plY3QtdHlwZXNjcmlwdC1sZWFybi8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXByb2plY3QtdHlwZXNjcmlwdC1sZWFybi8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly9zaW1wbGUtcHJvamVjdC10eXBlc2NyaXB0LWxlYXJuLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1saXN0LnRzIiwid2VicGFjazovL3NpbXBsZS1wcm9qZWN0LXR5cGVzY3JpcHQtbGVhcm4vLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXByb2plY3QtdHlwZXNjcmlwdC1sZWFybi8uL3NyYy9tb2RlbHMvcHJvamVjdC1tb2RlbC50cyIsIndlYnBhY2s6Ly9zaW1wbGUtcHJvamVjdC10eXBlc2NyaXB0LWxlYXJuLy4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXByb2plY3QtdHlwZXNjcmlwdC1sZWFybi8uL3NyYy91dGlscy92YWxpZGF0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZS1wcm9qZWN0LXR5cGVzY3JpcHQtbGVhcm4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlLXByb2plY3QtdHlwZXNjcmlwdC1sZWFybi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXByb2plY3QtdHlwZXNjcmlwdC1sZWFybi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZS1wcm9qZWN0LXR5cGVzY3JpcHQtbGVhcm4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGUtcHJvamVjdC10eXBlc2NyaXB0LWxlYXJuLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb21wb25lbnQgQmFzZSBjbGFzc1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PiB7XHJcbiAgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50XHJcbiAgaG9zdEVsZW1lbnQ6IFRcclxuICBlbGVtZW50OiBVXHJcblxyXG4gIGNvbnN0cnVjdG9yIChcclxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcclxuICAgIGhvc3RFbGVtZW50SWQ6IHN0cmluZyxcclxuICAgIGluc2VydEF0U3RhcnQ6IGJvb2xlYW4sXHJcbiAgICBuZXdFbGVtZW50SWQ/OiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IHRlbXBsYXRlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKVxyXG4gICAgY29uc3QgaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKVxyXG4gICAgaWYgKHRlbXBsYXRlRWwgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9IHRlbXBsYXRlRWwgYXMgSFRNTFRlbXBsYXRlRWxlbWVudFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyBlbGVtZW50IHdpdGggdGhpcyBpZGVudGlmaWVyJylcclxuICAgIH1cclxuICAgIGlmIChob3N0RWxlbWVudCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBob3N0RWxlbWVudCBhcyBUXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIGVsZW1lbnQgd2l0aCB0aGlzIGlkZW50aWZpZXInKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGltcG9ydE5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsIHRydWUpXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFVcclxuICAgIGlmIChuZXdFbGVtZW50SWQgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuaWQgPSBuZXdFbGVtZW50SWRcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF0dGFjaChpbnNlcnRBdFN0YXJ0KVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2ggKGluc2VydEF0QmVnaW5uaW5nOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgaW5zZXJ0QXRCZWdpbm5pbmcgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJywgdGhpcy5lbGVtZW50XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBhYnN0cmFjdCBjb25maWd1cmUgKCk6IHZvaWRcclxuICBhYnN0cmFjdCByZW5kZXJDb250ZW50ICgpOiB2b2lkXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudCdcclxuaW1wb3J0IHsgdHlwZSBWYWxpZGF0YWJsZSwgdmFsaWRhdGUgfSBmcm9tICcuLi91dGlscy92YWxpZGF0aW9uJ1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlJ1xyXG5pbXBvcnQgeyBBdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQtZGVjb3JhdG9yJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XHJcbiAgdGl0bGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnRcclxuICBkZXNjcmlwdGlvbklucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudFxyXG4gIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudFxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigncHJvamVjdC1pbnB1dCcsICdhcHAnLCB0cnVlLCAndXNlci1pbnB1dCcpXHJcbiAgICBjb25zdCB0aXRsZUlucHV0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJylcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXRFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxyXG4gICAgY29uc3QgcGVvcGxlSW5wdXRFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjcGVvcGxlJylcclxuICAgIGlmICh0aXRsZUlucHV0RWwgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy50aXRsZUlucHV0RWxlbWVudCA9IHRpdGxlSW5wdXRFbCBhcyBIVE1MSW5wdXRFbGVtZW50XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIGVsZW1lbnQgd2l0aCB0aGlzIGlkZW50aWZpZXInKVxyXG4gICAgfVxyXG4gICAgaWYgKGRlc2NyaXB0aW9uSW5wdXRFbCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gZGVzY3JpcHRpb25JbnB1dEVsIGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gZWxlbWVudCB3aXRoIHRoaXMgaWRlbnRpZmllcicpXHJcbiAgICB9XHJcbiAgICBpZiAocGVvcGxlSW5wdXRFbCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudCA9IHBlb3BsZUlucHV0RWwgYXMgSFRNTElucHV0RWxlbWVudFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyBlbGVtZW50IHdpdGggdGhpcyBpZGVudGlmaWVyJylcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpXHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUgKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlcilcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbnRlbnQgKCk6IHZvaWQge31cclxuXHJcbiAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQgKCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB7XHJcbiAgICBjb25zdCBlbnRlcmVkVGl0bGUgPSB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlXHJcbiAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlXHJcbiAgICBjb25zdCBlbnRlcmVkUGVvcGxlID0gdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWVcclxuXHJcbiAgICBjb25zdCB0aXRsZVZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcclxuICAgICAgdmFsdWU6IGVudGVyZWRUaXRsZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcclxuICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbixcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1pbkxlbmd0aDogNVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcclxuICAgICAgdmFsdWU6IGVudGVyZWRQZW9wbGUsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW46IDEsXHJcbiAgICAgIG1heDogNVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdmFsaWRhdGUodGl0bGVWYWxpZGF0YWJsZSkgfHxcclxuICAgICAgICAhdmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0YWJsZSkgfHxcclxuICAgICAgICAhdmFsaWRhdGUocGVvcGxlVmFsaWRhdGFibGUpKSB7XHJcbiAgICAgIGFsZXJ0KCdJbnZhbGlkIGlucHV0LCBwbGVhc2UgdHJ5IGFnYWluJylcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbZW50ZXJlZFRpdGxlLCBlbnRlcmVkRGVzY3JpcHRpb24sICtlbnRlcmVkUGVvcGxlXVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhcklucHV0cyAoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlID0gJydcclxuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUgPSAnJ1xyXG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJ1xyXG4gIH1cclxuXHJcbiAgQEF1dG9iaW5kXHJcbiAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyIChldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KClcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dCkpIHtcclxuICAgICAgY29uc3QgW3RpdGxlLCBkZXNjLCBwZW9wbGVdID0gdXNlcklucHV0XHJcbiAgICAgIGlmIChwcm9qZWN0U3RhdGUgIT09IG51bGwpIHtcclxuICAgICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgcGVvcGxlKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2xlYXJJbnB1dHMoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB0eXBlIERyYWdnYWJsZSB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AtaW50ZXJmYWNlcydcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudCdcclxuaW1wb3J0IHsgdHlwZSBQcm9qZWN0IH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QtbW9kZWwnXHJcbmltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3InXHJcblxyXG4vLyBQcm9qZWN0IEl0ZW0gQ2xhc3NcclxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ2dhYmxlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHByb2plY3Q6IFByb2plY3RcclxuXHJcbiAgZ2V0IHBlcnNvbnMgKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBzdHJQZW9wbGUgPSB0aGlzLnByb2plY3QucGVvcGxlLnRvU3RyaW5nKClcclxuICAgIGlmICh0aGlzLnByb2plY3QucGVvcGxlID09PSAxKSB7XHJcbiAgICAgIHJldHVybiAnMSBwZXJzb24nXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYCR7c3RyUGVvcGxlfSBwZXJzb25zYFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XHJcbiAgICBzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKVxyXG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdFxyXG5cclxuICAgIHRoaXMuY29uZmlndXJlKClcclxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpXHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnU3RhcnRIYW5kbGVyIChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBldmVudE9iaiA9IGV2ZW50LmRhdGFUcmFuc2ZlclxyXG4gICAgaWYgKGV2ZW50T2JqICE9PSBudWxsKSB7XHJcbiAgICAgIGV2ZW50T2JqLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnByb2plY3QuaWQpXHJcbiAgICAgIGV2ZW50T2JqLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRyYWdFbmRIYW5kbGVyIChfOiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdEcmFnRW5kJylcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSAoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKVxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCAoKTogdm9pZCB7XHJcbiAgICBjb25zdCBoMkVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJylcclxuICAgIGNvbnN0IGgzRWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKVxyXG4gICAgY29uc3QgcEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKVxyXG4gICAgaWYgKGgyRWwgIT09IG51bGwpIHtcclxuICAgICAgaDJFbC50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZVxyXG4gICAgfVxyXG4gICAgaWYgKGgzRWwgIT09IG51bGwpIHtcclxuICAgICAgaDNFbC50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbi50b1N0cmluZygpXHJcbiAgICB9XHJcbiAgICBpZiAocEVsICE9PSBudWxsKSB7XHJcbiAgICAgIHBFbC50ZXh0Q29udGVudCA9IHRoaXMucGVyc29ucyArICcgYXNzaWduZWQuJ1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50J1xyXG5pbXBvcnQgeyB0eXBlIFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdC1tb2RlbCdcclxuaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kLWRlY29yYXRvcidcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSdcclxuaW1wb3J0IHsgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0LW1vZGVsJ1xyXG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gJy4vcHJvamVjdC1pdGVtJ1xyXG5pbXBvcnQgeyB0eXBlIERyYWdUYXJnZXQgfSBmcm9tICcuLi9tb2RlbHMvZHJhZy1kcm9wLWludGVyZmFjZXMnXHJcblxyXG4vLyBQcm9qZWN0IGxpc3QgY2xhc3NcclxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0IHtcclxuICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W11cclxuXHJcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgcmVhZG9ubHkgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XHJcbiAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApXHJcbiAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXVxyXG4gICAgdGhpcy5jb25maWd1cmUoKVxyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KClcclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIGRyYWdPdmVySGFuZGxlciAoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKChldmVudC5kYXRhVHJhbnNmZXIgIT0gbnVsbCkgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSBhcyBIVE1MVUxpc3RFbGVtZW50XHJcbiAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJvcEhhbmRsZXIgKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByaklkID0gZXZlbnQuZGF0YVRyYW5zZmVyPy5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChcclxuICAgICAgcHJqSWQsXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWRcclxuICAgIClcclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIGRyYWdMZWF2ZUhhbmRsZXIgKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIGFzIEhUTUxVTGlzdEVsZW1lbnRcclxuICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKVxyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlICgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKVxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcilcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcilcclxuICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcigocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xyXG4gICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKHByaiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpIHtcclxuICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJqLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GaW5pc2hlZFxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzXHJcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbnRlbnQgKCk6IHZvaWQge1xyXG4gICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YFxyXG4gICAgY29uc3QgbGlzdFVsRWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKVxyXG4gICAgaWYgKGxpc3RVbEVsICE9IG51bGwpIHtcclxuICAgICAgbGlzdFVsRWwuaWQgPSBsaXN0SWRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gZWxlbWVudCB3aXRoIHRoaXMgaWRlbnRpZmllcicpXHJcbiAgICB9XHJcbiAgICBjb25zdCBsaXN0VWxIMkVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJylcclxuICAgIGlmIChsaXN0VWxIMkVsICE9IG51bGwpIHtcclxuICAgICAgbGlzdFVsSDJFbC50ZXh0Q29udGVudCA9IHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgJyBQUk9KRUNUUydcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gZWxlbWVudCB3aXRoIHRoaXMgaWRlbnRpZmllcicpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlclByb2plY3RzICgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGApIGFzIEhUTUxVTGlzdEVsZW1lbnRcclxuICAgIGxpc3RFbC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgY29uc3QgdWxFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpXHJcbiAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XHJcbiAgICAgIGlmICh1bEVsICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgcHJvaiA9IG5ldyBQcm9qZWN0SXRlbSh1bEVsLmlkLCBwcmpJdGVtKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8vIEF1dG9iaW5kIGRlY29yYXRvclxyXG5leHBvcnQgZnVuY3Rpb24gQXV0b2JpbmQgKF86IGFueSwgXzI6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcclxuICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWVcclxuICBjb25zdCBhZGpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpXHJcbiAgICAgIHJldHVybiBib3VuZEZuXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBhZGpEZXNjcmlwdG9yXHJcbn1cclxuIiwiLy8gUHJvamVjdCB0eXBlXHJcbmV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xyXG4gIEFjdGl2ZSxcclxuICBGaW5pc2hlZFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IgKFxyXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxyXG4gICAgcHVibGljIHN0YXR1czogUHJvamVjdFN0YXR1c1xyXG4gICkge31cclxufVxyXG4iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QtbW9kZWwnXHJcblxyXG50eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBUW10pID0+IHZvaWRcclxuXHJcbmNsYXNzIFN0YXRlPFQ+IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBBcnJheTxMaXN0ZW5lcjxUPj4gPSBbXVxyXG5cclxuICBhZGRMaXN0ZW5lciAobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pOiB2b2lkIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBwcm9qZWN0czogUHJvamVjdFtdID0gW11cclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlXHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluc3RhbmNlICgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgfVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKVxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QgKHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG51bU9mUGVvcGxlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChcclxuICAgICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIG51bU9mUGVvcGxlLFxyXG4gICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxyXG4gICAgKVxyXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXHJcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpXHJcbiAgfVxyXG5cclxuICBtb3ZlUHJvamVjdCAocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cyk6IHZvaWQge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcmogPT4gcHJqLmlkID09PSBwcm9qZWN0SWQpXHJcbiAgICBpZiAocHJvamVjdCAhPSBudWxsICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcclxuICAgICAgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXNcclxuICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMgKCk6IHZvaWQge1xyXG4gICAgZm9yIChjb25zdCBsaXN0ZW5lckZuIG9mIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgIGxpc3RlbmVyRm4odGhpcy5wcm9qZWN0cy5zbGljZSgpKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gQ3JlYXRpbmcgZ2xvYmFsIGNvbnN0YW50IGZvciBzdGF0ZVxyXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKClcclxuIiwiLy8gVmFsaWRhdGlvblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcclxuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyXHJcbiAgcmVxdWlyZWQ/OiBib29sZWFuXHJcbiAgbWluTGVuZ3RoPzogbnVtYmVyXHJcbiAgbWF4TGVuZ3RoPzogbnVtYmVyXHJcbiAgbWluPzogbnVtYmVyXHJcbiAgbWF4PzogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSAodmFsaWRhdGFibGVJbnB1dDogVmFsaWRhdGFibGUpOiBib29sZWFuIHtcclxuICBsZXQgaXNWYWxpZCA9IHRydWVcclxuICBpZiAodmFsaWRhdGFibGVJbnB1dC5yZXF1aXJlZCAhPT0gbnVsbCkge1xyXG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDBcclxuICB9XHJcbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoICE9PSBudWxsICYmXHJcbiAgICAgIHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aFxyXG4gIH1cclxuICBpZiAodmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGggIT09IG51bGwgJiZcclxuICAgICAgdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoXHJcbiAgfVxyXG4gIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1pbiAhPSBudWxsICYmIHR5cGVvZiArdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPj0gdmFsaWRhdGFibGVJbnB1dC5taW5cclxuICB9XHJcbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWF4ICE9IG51bGwgJiYgdHlwZW9mICt2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGlzVmFsaWRcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0J1xyXG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QnXHJcblxyXG5uZXcgUHJvamVjdElucHV0KClcclxubmV3IFByb2plY3RMaXN0KCdhY3RpdmUnKVxyXG5uZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJylcclxuY29uc29sZS5sb2coJ0hpJylcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9