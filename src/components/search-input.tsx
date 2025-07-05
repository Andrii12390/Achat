import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface Props {
  placeholder: string;
  query: string;
  setQuery: (val: string) => void;
}

export const SearchInput = ({ placeholder, query, setQuery }: Props) => {
  return (
    <div className="relative">
      <Search
        className="absolute top-3 left-3 text-icon"
        size={18}
        strokeWidth={1.7}
      />
      <Input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-10 py-5 border-none bg-secondary/70"
      />
    </div>
  );
};
