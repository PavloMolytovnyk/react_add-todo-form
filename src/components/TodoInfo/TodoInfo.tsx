import classNames from 'classnames';

import { Todo } from '../TodoList';
import { getUserById } from '../../App';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const { id, completed, title, userId } = todo;
  const user = getUserById(userId);

  return (
    <article
      data-id={`${id}`}
      key={id}
      className={classNames(
        `TodoInfo ${completed ? 'TodoInfo--completed' : ''}`,
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
