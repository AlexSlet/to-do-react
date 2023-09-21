import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "#000",
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export default function ItemsModal({onSave}: {onSave: Function}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleSave () {
    onSave(title, description)
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleOpen}>
        <Add />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} noValidate autoComplete="off">
          <h2>Create To-Do</h2>
          <TextField
            label="Title"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value);
            }}
          />
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Button
              onClick={handleSave}
            >
              Save
            </Button>
            <Button color="error" onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
