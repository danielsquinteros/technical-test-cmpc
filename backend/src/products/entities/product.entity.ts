export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public cost_price: number,
    public stock: number,
    public status: boolean,
    public tag: string,
    public updated_at: Date,
    public created_at: Date,
    public min_stock?: number,
    public max_stock?: number,
  ) {}
}
