
export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
  icon?: string;
  color?: string;
}

export interface AppEntry {
  id: string;
  name: string;
  url: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
  createdAt: number;
}

export interface AIAppDetails {
  description: string;
}
