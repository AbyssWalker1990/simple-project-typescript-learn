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

    if (enteredTitle.trim().length === 0 ||
        enteredDescription.trim().length === 0 ||
        enteredPeople.trim().length === 0) {
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
