import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

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
        'border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer text-icon',
        isDragActive
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50',
      )}
    >
      <input {...getInputProps()} />

      <Upload className="size-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="font-medium mb-2">Drop your audio file here</h3>
      <p className="text-muted-foreground text-sm">or click to browse</p>
    </div>
  );
};
