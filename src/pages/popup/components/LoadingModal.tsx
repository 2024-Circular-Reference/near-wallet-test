import { useLoading } from '@root/src/stores/useLoading';
import Portal from './Portal';
import { DotLoader } from 'react-spinners';

const LoadingModal = () => {
  const isLoading = useLoading(state => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <Portal>
      <DotLoader color="#0281dc" loading={isLoading} size={50} aria-label="Loading Spinner" data-testid="loader" />
    </Portal>
  );
};

export default LoadingModal;
