import { TodoInfo } from '../TodoInfo';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface TodoProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
