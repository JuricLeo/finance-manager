import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "../ui/use-toast";
import axios from "axios";
import useLanguageStore from "@/store/useLanguageStore";
import { Button } from "../ui/button";

interface DeleteModalProps {
  categoryId: string;
  onCategoryDeleted: () => void;
}

export default function DeleteModal({
  categoryId,
  onCategoryDeleted,
}: DeleteModalProps) {
  const { t } = useLanguageStore();

  const onDelete = async () => {
    await axios.delete("/api/category", { data: { categoryId } });
    try {
      toast({
        title: t("delete-category-toast-success-title"),
        description: t("delete-category-toast-success-description"),
        variant: "success",
      });
      onCategoryDeleted();
    } catch {
      toast({
        title: t("delete-category-toast-error-title"),
        description: t("delete-category-toast-error-description"),
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" className="w-20">
          {t("delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete-title")}</AlertDialogTitle>
          <AlertDialogDescription className="py-2">
            {t("delete-description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            {t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
