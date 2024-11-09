export interface MenuItem {
  id: number;
  documentId: string;
  name: string;
  description: {
    type: string;
    children: {
      type: string;
      text: string;
    }[];
  }[];
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image:{
    url:string;
  }
}

export interface MenuItemsResponse {
  data: MenuItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
