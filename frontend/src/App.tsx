import './App.css'
import { useFindAllProductsQuery } from './domains/products/api/products';
import useProducts from './store/hooks/useProducts';
import { DataTable } from './components/data-table/data-table';
import { getColumns } from './components/data-table/columns';
import { Toaster } from "@/components/ui/toaster"


function App() {
  const { isLoading, error } = useFindAllProductsQuery({});
  const products = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <DataTable columns={getColumns} data={products.total} />
      <Toaster />
    </>
  )
}

export default App
