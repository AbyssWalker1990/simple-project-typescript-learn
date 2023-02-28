import { type Draggable } from '../models/drag-drop-interfaces.js'
import { Component } from '../components/base-component.js'
import { type Project } from '../models/project-model.js'
import { Autobind } from '../decorators/autobind-decorator.js'

// Project Item Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private readonly project: Project

  get persons (): string {
    const strPeople = this.project.people.toString()
    if (this.project.people === 1) {
      return '1 person'
    } else {
      return `${strPeople} persons`
    }
  }

  constructor (hostId: string, project: Project) {
    super('single-project', hostId, false, project.id)
    this.project = project

    this.configure()
    this.renderContent()
  }

  @Autobind
  dragStartHandler (event: DragEvent): void {
    const eventObj = event.dataTransfer
    if (eventObj !== null) {
      eventObj.setData('text/plain', this.project.id)
      eventObj.effectAllowed = 'move'
    }
  }

  dragEndHandler (_: DragEvent): void {
    console.log('DragEnd')
  }

  configure (): void {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent (): void {
    const h2El = this.element.querySelector('h2')
    const h3El = this.element.querySelector('h3')
    const pEl = this.element.querySelector('p')
    if (h2El !== null) {
      h2El.textContent = this.project.title
    }
    if (h3El !== null) {
      h3El.textContent = this.project.description.toString()
    }
    if (pEl !== null) {
      pEl.textContent = this.persons + ' assigned.'
    }
  }
}
