import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/domains/products/types";

interface ColumnProps {
  openDialogUpdateProduct?: (product: Product) => void;
  openDialogDeleteProduct?: (product: Product) => void;
}

export const getColumns = ({
  openDialogUpdateProduct,
  openDialogDeleteProduct,
}: ColumnProps): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    filterFn: (row, columnId, value) => {
      if (!value.conditional || Number(value.value) === 0) return true;
      const price = row.getValue<number>(columnId);
      switch (value.conditional) {
        case ">":
          return price > Number(value.value);
        case "<":
          return price < Number(value.value);
        case "=":
          return price === Number(value.value);
        default:
          return true;
      }
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "cost_price",
    header: () => <div className="text-right">Cost Price</div>,
    cell: ({ row }) => {
      const cost_price = parseFloat(row.getValue("cost_price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(cost_price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">Stock</div>,
    filterFn: (row, columnId, value) => {
      if (!value.conditional || Number(value.value) === 0) return true;
      const stock = row.getValue<number>(columnId);
      switch (value.conditional) {
        case ">":
          return stock > Number(value.value);
        case "<":
          return stock < Number(value.value);
        case "=":
          return stock === Number(value.value);
        default:
          return true;
      }
    },
  },
  {
    accessorKey: "tag",
    header: () => <div className="text-center">Tag</div>,
    cell: ({ row }) => {
      const tag = row.getValue("tag") as
        | "default"
        | "secondary"
        | "destructive"
        | "outline";

      const variant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        notebook_accessory: "secondary",
        computer_accesory: "outline",
        graphic_card: "destructive",
        notebook: "default",
      };

      return <Badge variant={variant[tag] ?? "default"}>{tag}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsHorizontalIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
              openDialogUpdateProduct && (
              <DropdownMenuItem onClick={() => openDialogUpdateProduct(product)}>
                Editar
              </DropdownMenuItem>
              )
            }
            {
              openDialogDeleteProduct && (
                <DropdownMenuItem onClick={() => openDialogDeleteProduct(product)}>
                  Borrar
                </DropdownMenuItem>
              )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
