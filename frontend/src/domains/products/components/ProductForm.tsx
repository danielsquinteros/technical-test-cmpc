import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductForm, DialogState } from "../types";

interface ProductFormDialogProps {
  form: ProductForm;
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>;
  dialog: DialogState;
  setDialog: React.Dispatch<React.SetStateAction<DialogState>>;
  action: () => void;
}

export const ProductFormDialog = ({
  form,
  setForm,
  dialog,
  setDialog,
  action,
}: ProductFormDialogProps) => {
  return (
    <Dialog open={dialog.open} onOpenChange={() => setDialog((prev: DialogState) => ({ ...prev, open: !prev.open }))}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialog.textButton}</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              type="text"
              id="name"
              value={form.name || ''}
              disabled={dialog.action === "delete"}
              onChange={(e) => setForm({ ...form, name: e.target.value || "" })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input
              type="text"
              id="price"
              value={form.price || ''}
              disabled={dialog.action === "delete"}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) || null })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost_price" className="text-right">Cost Price</Label>
            <Input
              type="text"
              id="cost_price"
              value={form.cost_price || ''}
              disabled={dialog.action === "delete"}
              onChange={(e) => setForm({ ...form, cost_price: Number(e.target.value) || null })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">Stock</Label>
            <Input
              type="text"
              id="stock"
              value={form.stock || ''}
              disabled={dialog.action === "delete"}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) || null })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tag" className="text-right">Tag</Label>
            <Select
              name="tag"
              value={form.tag || ''}
              disabled={dialog.action === "delete"}
              onValueChange={(value) => setForm({ ...form, tag: value })}
            >
              <SelectTrigger className="w-max">
                <SelectValue placeholder="Select Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="notebook">Notebook</SelectItem>
                <SelectItem value="notebook_accessory">Notebook Accessory</SelectItem>
                <SelectItem value="computer_accessory">Computer Accessory</SelectItem>
                <SelectItem value="graphic_card">Graphic Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={action}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
