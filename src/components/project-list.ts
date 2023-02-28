import { Component } from './base-component.js'
import { type Project } from '../models/project-model.js'
import { Autobind } from '../decorators/autobind-decorator.js'
import { projectState } from '../state/project-state.js'
import { ProjectStatus } from '../models/project-model.js'
import { ProjectItem } from './project-item.js'
import { type DragTarget } from '../models/drag-drop-interfaces.js'

// Project list class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
