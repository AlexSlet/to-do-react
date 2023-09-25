import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { ToDoItem } from "../interfaces";

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

interface ItemsModal {
  onSave: Function;
  onEdit: Function;
  onCancel: Function;
  todoToEdit: ToDoItem | null;
}

export default function ItemsModal({
  onSave,
  onEdit,
  onCancel,
  todoToEdit = null,
}: ItemsModal) {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState<ToDoItem>({
    title: "",
    description: "",
    id: 0,
  });

  useEffect(() => {
    if (todoToEdit) {
      setTodo(todoToEdit);
      setOpen(true);
    }
  }, [todoToEdit]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    onCancel()
  };
  const setTodoProp = (props: Object) => {
    setTodo({
      ...todo,
      ...props,
    });
  };

  function handleSave() {
    if (todo.id) {
      onEdit(todo);
    } else {
      onSave(todo);
    }
    setTodoProp({
      title: "",
      description: "",
      id: 0
    });
    setOpen(false);
  }
  const isDisabled = (): boolean => {
    return !(todo.title && todo.description);
  };

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
            value={todo.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTodoProp({
                title: event.target.value,
              });
            }}
          />
          <TextField
            label="Description"
            value={todo.description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTodoProp({
                description: event.target.value,
              });
            }}
          />
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Button onClick={handleSave} disabled={isDisabled()}>
              {todoToEdit ? "Edit" : "Save"}
            </Button>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
