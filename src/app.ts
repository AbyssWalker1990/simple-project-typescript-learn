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

  @Autobind
  private submitHandler (event: Event): void {
    event.preventDefault()
    console.log(this.titleInputElement.value)
  }

  private configure (): void {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach (): void {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const prjInput = new ProjectInput()
