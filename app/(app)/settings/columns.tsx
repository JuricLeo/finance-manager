"use client";

import DeleteModal from "@/components/settings/delete-modal";
import UpdateModal from "@/components/settings/update-modal";
import { Button } from "@/components/ui/button";
import useLanguageStore from "@/store/useLanguageStore";
import { ColumnDef } from "@tanstack/react-table";

type Category = {
  id: string;
  name: string;
  emoji: string;
};

type ColumnsProps = {
  onCategoryUpdated: () => void;
  onCategoryDeleted: () => void;
};

const t = useLanguageStore.getState().t;

export const columns = ({ onCategoryUpdated, onCategoryDeleted }: ColumnsProps): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: t("table-name"),
    cell: (info) => (
      <div className="min-w-48 text-xl">{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "emoji",
    header: "Emoji",
    cell: (info) => (
      <div className="min-w-48 text-4xl">{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="space-x-2 flex justify-end">
          <Button variant="update" className="w-20">
            <UpdateModal
              categoryId={category.id}
              initialData={{ name: category.name, emoji: category.emoji }}
              onCategoryUpdated={onCategoryUpdated}
            />
          </Button>
          <Button variant="destructive" className="w-20">
            <DeleteModal categoryId={category.id} onCategoryDeleted={onCategoryDeleted} />
          </Button>
        </div>
      );
    },
  },
];
