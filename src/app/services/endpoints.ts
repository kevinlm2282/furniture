export const Endpoints: any = {
  items: 'items',
  updateItem: (id: string) => `items/${id}`,
  deleteItem: (id: string) => `items/${id}`,
  login: 'auth/login',
  userInfo: 'auth',
};
