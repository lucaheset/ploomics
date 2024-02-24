export interface Comic {
    id: number;
    title: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    characters: {
      items: Array<{
        name: string;
      }>;
    };
  }
  