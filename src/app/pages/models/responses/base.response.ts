
export interface BaseEntityResponse<TEntity>{
  data: TEntity;
  msg: string;
  codeResult: number;
  total: number;
}
