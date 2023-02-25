'use strict'
class projectInput {
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
  }
}
