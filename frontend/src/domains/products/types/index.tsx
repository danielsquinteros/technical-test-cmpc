export interface Product {
    id: string
    name: string
    price: number
    cost_price: number
    stock: number,
    status: boolean
    tag: string
    updated_at: Date
    created_at: Date
    min_stock?: number
    max_stock?: number
 }
export interface ProductForm {
    name: string | null
    price: number | null
    cost_price: number | null
    stock: number | null
    tag: string | null
 }

export type PropertyFilter = {
    conditional: string;
    value: string | number;
};


export type FilterPropertyProps = {
    type: string;
    valueFilter: PropertyFilter;
    setValueFilter: React.Dispatch<React.SetStateAction<PropertyFilter>>;
    applySetValueFilter: () => void;
};

export interface DialogState {
    open: boolean;
    textButton: string;
    action: "create" | "update" | "delete" | '';
  }
  