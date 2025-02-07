import { useState, useRef, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel
} from "@tanstack/react-table"

//UI

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button" ;
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

//Product
import { FilterProperty } from "@/domains/products/components/FilterProperty";
import { ProductFormDialog } from "@/domains/products/components/ProductForm";
import { useCreateProductMutation, useFindAllProductsQuery, useRemoveProductMutation, useUpdateProductMutation } from "@/domains/products/api/products";
import { PropertyFilter, Product, ProductForm, DialogState } from "@/domains/products/types";

//Metrics
import { PieChart, BarChart } from "@/domains/metrics/components";
import { profitMargin, criticalStock, groupByTag } from "@/domains/metrics/utils/calculate.products";
import { getColumns } from "./columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast()
  const {refetch: refetchGetAllProducts } = useFindAllProductsQuery({})
  const [ createProduct, { isError: isErrorCreateProduct, error: errorCreateProduct, isSuccess: isSuccessCreateProduct,  reset: resetCreateProduct }] = useCreateProductMutation();
  const [ updateProduct, { isError: isErrorUpdateProduct, error: errorUpdateProduct, isSuccess: isSuccessUpdateProduct,  reset: resetUpdateProduct }] = useUpdateProductMutation();
  const [ removeProduct ] = useRemoveProductMutation();
  
  
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [priceFilters, setPriceFilters] = useState<PropertyFilter>({ conditional: '', value: '' })
  const [stockFilters, setStockFilters] = useState<PropertyFilter>({ conditional: '', value: '' })
  const [form, setForm] = useState<ProductForm>({
    name: null,
    price: null,
    cost_price: null,
    stock: null,
    tag: null,
  })
  const [dialogProduct, setDialogProduct] = useState<DialogState>({
    textButton: '',
    open: false,
    action:''
  })
  
  const resetCreateProductRef = useRef(resetCreateProduct);
  resetCreateProductRef.current = resetCreateProduct;
  
  const resetUpdateProductRef = useRef(resetUpdateProduct);
  resetUpdateProductRef.current = resetUpdateProduct;

  const openDialogCreateProduct = (): void => {
    setForm({
      name: null,
      price: null,
      cost_price: null,
      stock: null,
      tag: null,
    })
    setDialogProduct({
      open: true,
      textButton: 'Create product',
      action: 'create',
    })
  }

  const openDialogUpdateProduct = (product: ProductForm): void => {
    setForm({...product})
    setDialogProduct({
      open: true,
      textButton: 'Update product',
      action: 'update',
    })
  }

  const openDialogDeleteProduct = (product: ProductForm): void => {
    setForm({...product})
    setDialogProduct({
      open: true,
      textButton: 'Delete product',
      action: 'delete',
    })
  }

  const applySetPriceFilter = () => {
    if (!priceFilters.conditional || !priceFilters.value) return;
    table.getColumn("price")?.setFilterValue(priceFilters);
  }
 
  const applySetStockFilter = () => {
    if (!stockFilters.conditional || !stockFilters.value) return;
    table.getColumn("stock")?.setFilterValue(stockFilters);
  }
 
  const table = useReactTable<Product>({
    data: data as Product[],
    columns: getColumns({ openDialogUpdateProduct, openDialogDeleteProduct }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    }
  })

  const productsFiltered: Product[] = table.getFilteredRowModel().rows.map((row) => row.original as Product);

  const actionProduct = () => {
    if(dialogProduct.action === 'create'){
      createProduct(form).then(() => {
        setTimeout(() => {
          resetCreateProductRef.current();
        }, 2000);
        refetchGetAllProducts();
      })
    }
    if(dialogProduct.action === 'update'){
        updateProduct(form).then(()=> {
          setTimeout(() => {
            resetUpdateProductRef.current();
          }, 2000);
          refetchGetAllProducts();
        });
    }
    if(dialogProduct.action === 'delete'){
        removeProduct(form).then(() => {
          refetchGetAllProducts();
        });
      }
    }
    useEffect(() => {
        if(isErrorCreateProduct || isErrorUpdateProduct){
          toast({
            title: 'Error',
            description: `${JSON.stringify(errorCreateProduct) || JSON.stringify(errorUpdateProduct)}`,
            variant: 'error'
          })
        }
        if(isSuccessCreateProduct || isSuccessUpdateProduct){
          const descriptionCreate = isSuccessCreateProduct && 'Creado correctamente'; 
          const descriptionUpdate = isSuccessUpdateProduct && 'Actualizado correctamente'; 
          toast({
            title: 'Satisfactorio',
            description: descriptionCreate || descriptionUpdate,
            variant: 'success'
          })
        }
    }, [errorCreateProduct, errorUpdateProduct, isErrorCreateProduct, isErrorUpdateProduct, isSuccessCreateProduct, isSuccessUpdateProduct, toast])

  return (
    <div className="d-flex">
        <BarChart 
          data={profitMargin(productsFiltered)}
          layout={{width: 400, height: 500, title: {text: 'Profit Margin (0%-100%)'}}}
        />
        <BarChart 
          data={criticalStock(productsFiltered)}
          layout={{width: 400, height: 500, title: {text: 'Stock (available vs minimum)'}}}
        />
        <PieChart
          data={groupByTag(productsFiltered)}
          layout={{width: 400, height: 500, title: {text: 'Product Grouping'}}}
        />
      <div className="flex py-2 gap-3">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
        <FilterProperty
          type="price"
          valueFilter={priceFilters}
          setValueFilter={setPriceFilters}
          applySetValueFilter={applySetPriceFilter}
        />
        <FilterProperty
          type="stock"
          valueFilter={stockFilters}
          setValueFilter={setStockFilters}
          applySetValueFilter={applySetStockFilter}
        />
        <Button onClick={() => openDialogCreateProduct()}>Create Product</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 mx-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <ProductFormDialog
          form={form}
          setForm={setForm}
          dialog={dialogProduct}
          setDialog={setDialogProduct}
          action={actionProduct} 
         />
    </div>
  )
}
