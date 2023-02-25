'use strict'
class ProjectInput {
  constructor () {
    const templateEl = document.getElementById('project-input')
    const hostElement = document.getElementById('app')
    if (templateEl != null) {
      this.templateElement = document.getElementById('project-input')
    } else {
      throw new Error('There is no element with this identifier')
    }
    if (hostElement !== null) {
      this.hostElement = document.getElementById('app')
    } else {
      throw new Error('There is no element with this identifier')
    }
    const importNode = document.importNode(this.templateElement.content, true)
    this.element = importNode.firstElementChild
    this.attach()
  }

  attach () {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}
const prjInput = new ProjectInput()
