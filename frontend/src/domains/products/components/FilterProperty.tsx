import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button" ;
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { FilterPropertyProps } from "../types";

  
  export const FilterProperty: React.FC<FilterPropertyProps> = ({
    type,
    valueFilter,
    setValueFilter,
    applySetValueFilter,
  }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Filter {`${type}`} </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filter {`${type}`}</h4>
              <p className="text-sm text-muted-foreground">
                Select a conditional
              </p>
            </div>
            <div className="grid gap-2">
              <Select
                value={valueFilter.conditional}
                onValueChange={(value) =>
                    setValueFilter((prevFilter) => ({
                    ...prevFilter,
                    conditional: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select conditional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>conditional</SelectLabel>
                    <SelectItem value=">">Greater than {`(>)`}</SelectItem>
                    <SelectItem value="<">Less than {`(<)`}</SelectItem>
                    <SelectItem value="=">Same {`(=)`}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="price">Value</Label>
                <Input
                  type="number"
                  value={valueFilter.value}
                  onChange={(e) =>
                    setValueFilter((prevFilter) => ({
                      ...prevFilter,
                      value: e.target.value,
                    }))
                  }
                  id="price"
                  className="col-span-2 h-8"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Button onClick={applySetValueFilter}>Filter {`${type}`}</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };
  