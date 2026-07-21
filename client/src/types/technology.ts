export interface Technology {
  result: any;
  id: number;
  name: string;
  icon_url: string | null;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "design"
    | "cms"
    | "management"
    | "devops";
  is_featured: boolean;
}