// lay 1 vai du lieu cua user ma minh can
import { pick } from 'lodash';
export const pickUser = (user) => {
  if (!user) return {};
  return pick(user, [
    '_id',
    'username',
    'email',
    'avatar',
    'gender',
    'birthday',
    'createdAt',
    'updatedAt',
  ]);
};
