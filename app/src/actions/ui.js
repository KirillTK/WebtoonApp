export const START_LOADING = '@@UI/START_LOADING';
export const STOP_LOADING = '@@UI/STOP_LOADING';

export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});
