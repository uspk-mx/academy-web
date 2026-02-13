export type FolderType = {
  id: string;
  name: string;
  path: string;
  icon?: string;
  parentId?: string | null;
};

export type FileType = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadDate: Date;
  thumbnail?: string;
  folderId: string;
};

export type FilterOptions = {
  type: string;
  dateRange: string;
  searchQuery: string;
  folderId: string;
};
