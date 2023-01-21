import { InitialStateType, MovePayloadType, TaskType } from "@store/tasks";

class TasksActions {
  private state: InitialStateType = { tasks: [], Done: [], Todo: [] };

  constructor(state: InitialStateType) {
    this.state = state;
  }

  add(payload: TaskType) {
    this.addTask(payload);
    this.addId("Todo", payload.id, 0);
  }

  move(payload: MovePayloadType) {
    const index = this.findTaskIndex(payload.id);
    const currentCategory = this.state.tasks[index].category;

    this.state.tasks[index].category = payload.targetCategory;

    if (currentCategory === payload.targetCategory) {
      this.removeId(payload.targetCategory, payload.id);
    } else {
      this.removeId(currentCategory, payload.id);
    }

    this.addId(payload.targetCategory, payload.id, payload.targetId);
  }

  remove(id: number) {
    const index = this.findTaskIndex(id);
    const category = this.state.tasks[index].category;

    this.state[category] = this.state[category].filter((i) => i !== id);
    this.state.tasks = this.state.tasks.filter((i) => i.id !== id);
  }

  private findTaskIndex(id: number): number {
    return this.state.tasks.findIndex((i) => i.id === id);
  }

  private addTask(task: TaskType) {
    this.state.tasks.push(task);
  }

  private removeId(category: "Todo" | "Done", id: number) {
    this.state[category] = this.state[category].filter((i) => id !== i);
  }

  private addId(category: "Todo" | "Done", id: number, targetId: number) {
    this.state[category].splice(targetId, 0, id);
  }
}

export default TasksActions;
