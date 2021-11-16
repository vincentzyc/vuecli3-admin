export interface ApiModule {
  name: string,
  url: string,
  type?: string,
  getError?: boolean,
  getAllData?: boolean
}