import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Card = {
  id: number;
  name: string;
  value: number;
};

type CollectionContextType = {
  collection: Card[];
  addCard: (card: Card) => void;
};

const CollectionContext =
  createContext<CollectionContextType | undefined>(
    undefined
  );

export function CollectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collection, setCollection] = useState<Card[]>([]);

  function addCard(card: Card) {
    setCollection((currentCollection) => [
      ...currentCollection,
      card,
    ]);
  }

  return (
    <CollectionContext.Provider
      value={{
        collection,
        addCard,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);

  if (context === undefined) {
    throw new Error(
      "useCollection must be used inside CollectionProvider"
    );
  }

  return context;
}