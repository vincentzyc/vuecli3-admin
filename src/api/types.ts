export interface ApiModule {
  name: string,
  url: string,
  getError?: boolean,
  getAllData?: boolean
}