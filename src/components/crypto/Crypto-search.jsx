import React from "react";
import { Input, Card, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";

export const CryptoSearch = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  isLoading,
  onSelectPair
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchRef = React.useRef(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (value) => {
    setSearchQuery(value);
    setIsSearchOpen(value.trim().length > 0);
  };
  
  const handleSelectPair = (pair) => {
    onSelectPair(pair);
    setSearchQuery(pair.symbol);
    setIsSearchOpen(false);
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <Input
        placeholder="Search for cryptocurrency pairs (e.g., BTC/USDT, ETH/USDT)"
        value={searchQuery}
        onValueChange={handleInputChange}
        onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
        startContent={<Icon icon="lucide:search" className="text-muted" />}
        className="w-full bg-surface-alt text-base placeholder:text-muted"
      />
      
      {isSearchOpen && (
        <Card className="absolute z-10 w-full mt-1 bg-surface-alt rounded-xl border border-brand shadow-lg">
          <div className="max-h-64 overflow-y-auto p-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <Spinner size="sm" className="text-info" />
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((pair) => (
                <Button
                  key={pair.symbol}
                  className="w-full justify-start mb-1 bg-surface-alt hover:bg-surface text-base"
                  variant="flat"
                  onPress={() => handleSelectPair(pair)}
                >
                  <div className="flex items-center">
                    <span className="font-medium text-[0.9375rem] leading-6 text-base">{pair.symbol}</span>
                    <span className="ml-2 text-muted text-xs leading-4">{pair.name}</span>
                  </div>
                </Button>
              ))
            ) : (
              <div className="text-center py-4 text-muted text-sm leading-5">
                No results found
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CryptoSearch;