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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={song.imageUrl}
                alt={song.title}
                className="size-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{song.title}</TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {song.createdAt.split("T")[0]}
              </span>
            </TableCell>

            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your song.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteSong(song._id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongsTable;
