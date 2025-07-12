import { Search } from 'lucide-react';

import { ICON_SIZES, ICON_STROKE_WIDTH } from '@/constants';

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
        className="text-icon absolute top-3 left-3"
        size={ICON_SIZES.MD}
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <Input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="bg-secondary/70 border-none py-5 pl-10"
      />
    </div>
  );
};
