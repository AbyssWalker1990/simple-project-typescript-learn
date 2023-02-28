var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '../components/base-component.js';
import { Autobind } from '../decorators/autobind-decorator.js';
// Project Item Class
export class ProjectItem extends Component {
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
    Autobind
], ProjectItem.prototype, "dragStartHandler", null);
