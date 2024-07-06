class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
  }

  paginate(){
    const page= Number(this.query.page)||1;
    const limit=Number(this.query.limit)||10;
    const skip=(page-1)*limit;
    this.modelQuery=this.modelQuery.skip(skip).limit(limit)




  }
}


export default QueryBuilder ;