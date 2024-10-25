import { User } from '@shared/types/user';
import { formatDistance } from 'date-fns';

const returnLastSeen = (user: User) => {
   if (user?.lastSeen) return `last seen ${formatDistance(user.lastSeen, new Date())} ago`;
};

export default returnLastSeen;
