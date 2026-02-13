import { useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import { UploadFiles } from "./upload-files";
import { MediaLibrary } from "./media-library";
import { FileDetails } from "./file-details";
import type { FileType } from "ui/lib/types";
import { X } from "lucide-react";
import { FolderNavigation, defaultFolders } from "./folder-navigation";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "ui/components/drawer";
import { Button } from "ui/components/button";

export function FileManager({
  isOpen = false,
  setIsOpen,
  trigger,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  trigger?: ReactNode;
}) {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState("root");
  const [localOpen, setLocalOpen] = useState(isOpen);

  const handleFileSelect = (file: FileType) => {
    setSelectedFile(file);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleFolderSelect = (folderId: string) => {
    setCurrentFolderId(folderId);
    setIsDetailsOpen(false);
    setSelectedFile(null);
  };

  return (
    <Drawer
      onOpenChange={(value) => {
        setLocalOpen(value);
        setIsOpen(value);
      }}
      open={localOpen}
    >
      <DrawerTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button type="button" variant="neutral">
            Edit Content
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="w-11/12 gap-y-0 sm:pb-0 sm:px-0 sm:pt-0 sm:max-w-full h-full max-h-216 left-0 top-14! bottom-14!">
        <DrawerHeader
          className="px-6! pr-4!"
          containerClassName="bg-background pt-4 items-center"
          closeButtonClassName="mr-4"
        >
          <DrawerTitle>Administrador de archivos</DrawerTitle>
        </DrawerHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-[200px] ml-4 mt-2">
            <TabsTrigger value="upload">Upload files</TabsTrigger>
            <TabsTrigger value="library">Media Library</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="p-4">
            <UploadFiles currentFolderId={currentFolderId} />
          </TabsContent>

          <TabsContent value="library" className="p-0">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-64 border-r">
                <FolderNavigation
                  folders={defaultFolders}
                  currentFolderId={currentFolderId}
                  onFolderSelect={handleFolderSelect}
                />
              </div>

              <div
                className={`flex-1 transition-all ${
                  isDetailsOpen ? "lg:w-3/4" : "w-full"
                }`}
              >
                <MediaLibrary
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  currentFolderId={currentFolderId}
                />
              </div>

              {isDetailsOpen && (
                <div className="lg:w-1/4 border-l">
                  <FileDetails file={selectedFile} onClose={closeDetails} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DrawerFooter className="mt-auto pb-4 pr-4">
          <Button type="button">Set featured image</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
