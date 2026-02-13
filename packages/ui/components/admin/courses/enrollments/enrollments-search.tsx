import { ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Label } from 'ui/components/label';
import { Input } from 'ui/components/input';

export function EnrollmentsSearch() {
  const navigate = useNavigate();
  const params = useParams();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/courses/${params.cid}/builder/?search=${encodeURIComponent(search)}`);
  };

  return (
    <form className='col-span-2' onSubmit={handleSearch}>
      <div className="space-y-2">
        <Label htmlFor="input-26">Search input with icon and button</Label>
        <div className="relative">
          <Input
            className="pe-9 peer ps-9"
            id="input-26"
            onChange={e => { setSearch(e.target.value); }}
            placeholder="Search..."
            type="text"
            value={search}
          />
          <div className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 text-muted-foreground/80 pointer-events-none ps-3 start-0">
            <Search size={16} strokeWidth={2} />
          </div>
          <button
            aria-label="Submit search"
            className="absolute inset-y-0 flex justify-center items-center disabled:opacity-50 focus-visible:border focus-visible:border-ring rounded-e-lg focus-visible:ring-2 focus-visible:ring-ring/30 ring-offset-background focus-visible:ring-offset-2 w-9 h-full text-muted-foreground/80 hover:text-foreground focus-visible:text-foreground transition-shadow disabled:cursor-not-allowed disabled:pointer-events-none end-0 focus-visible:outline-none"
            type="submit"
          >
            <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </form>
  );
}
