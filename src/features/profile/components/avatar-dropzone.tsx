import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { ICON_SIZES, ICON_STROKE_WIDTH } from '@/constants';
import { cn } from '@/lib/utils';

interface Props {
  handleSelectFile: (f: File) => void;
}

export const AvatarDropzone = ({ handleSelectFile }: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) handleSelectFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'text-icon cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all',
        isDragActive
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50',
      )}
    >
      <input {...getInputProps()} />

      <Upload
        className="text-muted-foreground mx-auto mb-4"
        size={ICON_SIZES['2XL']}
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <h3 className="mb-2 font-medium">Drop your audio file here</h3>
      <p className="text-muted-foreground text-sm">or click to browse</p>
    </div>
  );
};
