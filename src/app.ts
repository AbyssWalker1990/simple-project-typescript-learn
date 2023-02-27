/* eslint-disable @typescript-eslint/no-namespace */
/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />

namespace App {
// Project State Management
type Listener<T> = (items: T[]) => void

class State<T> {
  protected listeners: Array<Listener<T>> = []

  addListener (listenerFn: Listener<T>): void {
    this.listeners.push(listenerFn)
  }
}

class ProjectState extends State<Project> {
  private readonly projects: Project[] = []
  private static instance: ProjectState

  private constructor () {
    super()
  }

  static getInstance (): any {
    if (this.instance != null) {
      return this.instance
    }
    this.instance = new ProjectState()
    return this.instance
  }

  addProject (title: string, description: string, numOfPeople: number): void {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    )
    this.projects.push(newProject)
    this.updateListeners()
  }

  moveProject (projectId: string, newStatus: ProjectStatus): void {
    const project = this.projects.find(prj => prj.id === projectId)
    if (project != null && project.status !== newStatus) {
      project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners (): void {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice())
    }
  }
}

// Creating global constant for state
const projectState = ProjectState.getInstance()

// Validation
interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validate (validatableInput: Validatable): boolean {
  let isValid = true
  if (validatableInput.required !== null) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }
  if (validatableInput.minLength !== null &&
      validatableInput.minLength !== undefined &&
      typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength
  }
  if (validatableInput.maxLength !== null &&
      validatableInput.maxLength !== undefined &&
      typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
  }
  if (validatableInput.min != null && typeof +validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  if (validatableInput.max != null && typeof +validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }

  return isValid
}

// Autobind decorator
function Autobind (_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get () {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjDescriptor
}

// Component Base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  hostElement: T
  element: U

  constructor (
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    const templateEl = document.getElementById(templateId)
    const hostElement = document.getElementById(hostElementId)
    if (templateEl != null) {
      this.templateElement = templateEl as HTMLTemplateElement
    } else {
      throw new Error('There is no element with this identifier')
    }
    if (hostElement != null) {
      this.hostElement = hostElement as T
    } else {
      throw new Error('There is no element with this identifier')
    }

    const importNode = document.importNode(this.templateElement.content, true)
    this.element = importNode.firstElementChild as U
    if (newElementId != null) {
      this.element.id = newElementId
    }

    this.attach(insertAtStart)
  }

  private attach (insertAtBeginning: boolean): void {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend', this.element
    )
  }

  abstract configure (): void
  abstract renderContent (): void
}

// Project Item Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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

// Project list class
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[]

  constructor (private readonly type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`)
    this.assignedProjects = []
    this.configure()
    this.renderContent()
  }

  @Autobind
  dragOverHandler (event: DragEvent): void {
    if ((event.dataTransfer != null) && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault()
      const listEl = this.element.querySelector('ul') as HTMLUListElement
      listEl.classList.add('droppable')
    }
  }

  @Autobind
  dropHandler (event: DragEvent): void {
    const prjId = event.dataTransfer?.getData('text/plain')
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    )
  }

  @Autobind
  dragLeaveHandler (event: DragEvent): void {
    const listEl = this.element.querySelector('ul') as HTMLUListElement
    listEl.classList.remove('droppable')
  }

  configure (): void {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished
      })
      this.assignedProjects = relevantProjects
      this.renderProjects()
    })
  }

  renderContent (): void {
    const listId = `${this.type}-projects-list`
    const listUlEl = this.element.querySelector('ul')
    if (listUlEl != null) {
      listUlEl.id = listId
    } else {
      throw new Error('There is no element with this identifier')
    }
    const listUlH2El = this.element.querySelector('h2')
    if (listUlH2El != null) {
      listUlH2El.textContent = this.type.toUpperCase() + ' PROJECTS'
    } else {
      throw new Error('There is no element with this identifier')
    }
  }

  private renderProjects (): void {
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement
    listEl.innerHTML = ''
    const ulEl = this.element.querySelector('ul')
    for (const prjItem of this.assignedProjects) {
      if (ulEl !== null) {
        const proj = new ProjectItem(ulEl.id, prjItem)
      }
    }
  }
}

// Project input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor () {
    super('project-input', 'app', true, 'user-input')
    const titleInputEl = this.element.querySelector('#title')
    const descriptionInputEl = this.element.querySelector('#description')
    const peopleInputEl = this.element.querySelector('#people')
    if (titleInputEl !== null) {
      this.titleInputElement = titleInputEl as HTMLInputElement
    } else {
      throw new Error('There is no element with this identifier')
    }
    if (descriptionInputEl !== null) {
      this.descriptionInputElement = descriptionInputEl as HTMLInputElement
    } else {
      throw new Error('There is no element with this identifier')
    }
    if (peopleInputEl !== null) {
      this.peopleInputElement = peopleInputEl as HTMLInputElement
    } else {
      throw new Error('There is no element with this identifier')
    }

    this.configure()
  }

  configure (): void {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent (): void {}

  private gatherUserInput (): [string, string, number] {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5
    }

    if (!validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)) {
      alert('Invalid input, please try again')
      throw new Error('Invalid input')
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  private clearInputs (): void {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  @Autobind
  private submitHandler (event: Event): void {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      if (projectState !== null) {
        projectState.addProject(title, desc, people)
      }
      this.clearInputs()
    }
  }
}

new ProjectInput()
new ProjectList('active')
new ProjectList('finished')

}
