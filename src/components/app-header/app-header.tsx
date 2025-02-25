import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData, isAuthenticated } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserData);

  useEffect(() => {}, [user]);

  return <AppHeaderUI userName={user?.name} />;
};
