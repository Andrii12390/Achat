import { Spinner } from '@/components/ui/spinner';

function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}

export default Loading;
