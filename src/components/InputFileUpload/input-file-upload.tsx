import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface InputFileUploadInterface {
  files: FileList | null,
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export default function InputFileUpload({files, onChange}: InputFileUploadInterface) {
  return (
    <Box>
      <Button
        sx={{ background: "var(--button-color)" }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Загрузить файл
        <VisuallyHiddenInput
          type="file"
          onChange={onChange}
          multiple
        />
      </Button>
      {files && <Typography>{`Файлов: ${files.length}`}</Typography>}
    </Box>
  );
}
