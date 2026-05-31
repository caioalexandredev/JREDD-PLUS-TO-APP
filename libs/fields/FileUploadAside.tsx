"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface FileUploadAsideProps {
  uploading: boolean;
  onUpload: (files: File[]) => Promise<void>;
}

export function FileUploadAside({ uploading, onUpload }: FileUploadAsideProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleUploadClick = async () => {
    if (files.length === 0) return;

    try {
      // Chama a função da página principal passando os arquivos
      await onUpload(files);

      // Se der sucesso, limpa a lista e o input
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      // O erro já é tratado pelo toast na página principal
      console.error(error);
    }
  };

  return (
    <aside className="bg-card border border-border rounded-3xl p-6 h-fit shadow-soft">
      <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-1">
        Adicionar documentos
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Envie novos arquivos com contexto de edital e vincule-os imediatamente a esta chamada.
      </p>

      <div
        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:bg-secondary/30 hover:border-primary/50"
          } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFilesChange}
          disabled={uploading}
        />

        <svg
          className="w-8 h-8 text-muted-foreground/60 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p className="text-foreground font-medium text-sm text-center mb-2">
          Arraste e solte ficheiros ou
        </p>

        <span className="text-xs text-primary font-medium hover:underline">
          Procurar Ficheiros...
        </span>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={`${file.name}-${file.size}`}
              className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2 border border-border"
            >
              <span className="text-xs text-muted-foreground truncate mr-2">
                {file.name}
              </span>
              <button
                onClick={() => removeFile(file)}
                disabled={uploading}
                className="text-muted-foreground hover:text-destructive shrink-0 disabled:opacity-50"
                title="Remover arquivo"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleUploadClick}
        disabled={uploading || files.length === 0}
        className="mt-6 w-full rounded-xl bg-gradient-hero text-primary-foreground shadow-elevated px-4 py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {uploading ? "Enviando..." : "Enviar e vincular"}
      </button>
    </aside>
  );
}