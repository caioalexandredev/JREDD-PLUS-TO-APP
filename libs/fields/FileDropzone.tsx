"use client";

import { useRef, useState, DragEvent } from "react";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  accept?: string;
  label?: string;
}

export function FileDropzone({
  onFilesSelected,
  disabled = false,
  accept,
  label = "Arraste e solte ficheiros ou"
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:bg-secondary/50 hover:border-primary/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "bg-card"}`}
      onClick={() => !disabled && fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept={accept}
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onFilesSelected(Array.from(e.target.files));
            e.target.value = ""; // Limpa para permitir re-selecionar o mesmo arquivo
          }
        }}
        disabled={disabled}
      />
      <svg className="w-8 h-8 text-muted-foreground/60 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p className="text-foreground font-medium text-sm text-center mb-1">
        {disabled ? "Processando..." : label}
      </p>
      {!disabled && (
        <span className="text-xs text-primary font-medium hover:underline">
          Procurar Ficheiros...
        </span>
      )}
    </div>
  );
}