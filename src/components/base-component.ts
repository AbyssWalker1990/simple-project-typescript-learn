/* eslint-disable @typescript-eslint/no-namespace */
namespace App {
  // Component Base class
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}
