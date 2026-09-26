export interface CategoryItem {
  id: number;
  parent_id: number | null;
  cluster: 'TECH_CORE' | 'SKILLS_GROWTH' | 'RESOURCES_SERVICES';
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order: number;
  children?: CategoryItem[];
}

export interface ClusterMenu {
  cluster: 'TECH_CORE' | 'SKILLS_GROWTH' | 'RESOURCES_SERVICES';
  cluster_name: string;
  categories: CategoryItem[];
}
