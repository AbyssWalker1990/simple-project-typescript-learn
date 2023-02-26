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

// Project list class
class ProjectList {
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLElement

  constructor (private readonly type: 'active' | 'finished') {
    const templateEl = document.getElementById('project-list')
    const hostElement = document.getElementById('app')
    if (templateEl != null) {
      this.templateElement = templateEl as HTMLTemplateElement
    } else {
      throw new Error('There is no element with this identifier')
    }
    if (hostElement != null) {
      this.hostElement = hostElement as HTMLDivElement
    } else {
      throw new Error('There is no element with this identifier')
    }

    const importNode = document.importNode(this.templateElement.content, true)
    this.element = importNode.firstElementChild as HTMLElement
    this.element.id = `${this.type}-projects`

    this.attach()
    this.renderContent()
  }

  private renderContent (): void {
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

  private attach (): void {
    this.hostElement.insertAdjacentElement('beforeend', this.element)
  }
}

// Project input class
class ProjectInput {
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLFormElement
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor () {
    const templateEl = document.getElementById('project-input')
    const hostElement = document.getElementById('app')
    if (templateEl != null) {
      this.templateElement = templateEl as HTMLTemplateElement
    } else {
      throw new Error('There is no element with this identifier')
    }
    if (hostElement !== null) {
      this.hostElement = hostElement as HTMLDivElement
    } else {
      throw new Error('There is no element with this identifier')
    }
    const importNode = document.importNode(this.templateElement.content, true)
    this.element = importNode.firstElementChild as HTMLFormElement
    this.element.id = 'user-input'

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
    this.attach()
  }

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
      console.log(title, desc, people)
      this.clearInputs()
    }
  }

  private configure (): void {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach (): void {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const prjInput = new ProjectInput()
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
