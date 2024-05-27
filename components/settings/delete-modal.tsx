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
        title: "Success!",
        description: "The category was successfully deleted",
        variant: "success",
      });
      onCategoryDeleted();
    } catch {
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{t("delete")}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete-title")}</AlertDialogTitle>
          <AlertDialogDescription className="py-2">
            {t("delete-description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>{t("delete")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
