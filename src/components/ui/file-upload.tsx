import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/api/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FileUploadProps {
  endpoint: string;
  fieldName: string;
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  className?: string;
}

export function FileUpload({
  endpoint,
  fieldName,
  value,
  onChange,
  label,
  accept = "image/*",
  className,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const deleteFileFromMinio = async (fileUrl: string) => {
    try {
      const urlObj = new URL(fileUrl);
      const pathParts = urlObj.pathname.split('/').filter(p => p);
      // pathParts[0] is bucket, rest is key
      if (pathParts.length < 2) return;
      const key = pathParts.slice(1).join('/');
      
      await apiClient.delete(`/upload/${encodeURIComponent(key)}`);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      const response = await apiClient.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Based on API response structure: { success: true, data: { url: "..." } }
      // The API definitions show 201 response with data.url
      const url = response.data.data.url;
      const oldFile = value;

      onChange(url);
      toast.success("File uploaded successfully");

      // Delete old file if exists
      if (oldFile) {
        deleteFileFromMinio(oldFile);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    const fileToDelete = value;
    onChange("");
    if (fileToDelete) {
      deleteFileFromMinio(fileToDelete);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative aspect-video w-40 overflow-hidden rounded-lg border bg-muted">
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-1 top-1 h-6 w-6 rounded-full"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex h-40 w-40 items-center justify-center rounded-lg border border-dashed bg-muted/50">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
            id={`file-upload-${fieldName}`}
            disabled={isUploading}
          />
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {value ? "Change File" : "Upload File"}
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Max file size: 5MB. Supported formats: JPEG, PNG, GIF, WebP.
          </p>
        </div>
      </div>
    </div>
  );
}
