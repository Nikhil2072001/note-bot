'use client';

import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createNoteAction } from "@/actions/notes";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
type Props = {
    user: User | null; 
}
function NewNoteButton({user}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClickNewNoteButton = async () => {
        if(!user) {
            router.push("/login")
            return;
        }else{
            setLoading(true);
            const uuid = uuidv4();
            await createNoteAction(uuid);
            router.push(`/?noteId=${uuid}&toastType=newNote`);
            toast.success("New note created!");
            setLoading(false);
        }
    }
  return (
    <Button
    onClick={handleClickNewNoteButton}
        disabled={loading}
        className="w-24"
        variant="secondary">
        {loading ? <Loader2 className="animate-spin"/> : "New Note"}
    </Button>
  )
}

export default NewNoteButton