import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@redux';
import {
  startLoading as startLoadingAction,
  stopLoading as stopLoadingAction,
  clearLoadingTasks as clearLoadingTasksAction,
} from '@redux/slices/_config';

export const useLoading = () => {
  const dispatch = useDispatch();
  const { loadingTasks } = useSelector((state: IRootState) => state._config);

  const isTaskLoading = useCallback(
    (task: string) => {
      return loadingTasks.indexOf(task) !== -1;
    },
    [loadingTasks]
  );

  const startLoading = useCallback((task: string) => {
    dispatch(startLoadingAction(task));
  }, []);

  const stopLoading = useCallback((task: string) => {
    dispatch(stopLoadingAction(task));
  }, []);

  const clearLoadingTasks = useCallback(() => {
    dispatch(clearLoadingTasksAction());
  }, []);

  return {
    isLoading: loadingTasks.length > 0,
    isTaskLoading,
    startLoading,
    stopLoading,
    clearLoadingTasks,
  };
};
