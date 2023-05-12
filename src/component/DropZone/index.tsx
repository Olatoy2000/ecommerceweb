import { useState } from "react";
import { useMutation } from "react-query";
import { Button, Container, Group, Input } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import React from "react";



function DropPictureZone() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const { mutate, isLoading } = useMutation((formData) =>
  fetch("/api/upload", {
    method: "POST",
    body: formData,
  })
);

const handleSubmit = (event: { preventDefault: () => void }) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  mutate(formData);
};


  const handleDrop = (files: React.SetStateAction<null>[]) => {
    setFile(files[0]);
  };

  return (
    <Container size={500}>
      <form onSubmit={handleSubmit}>
        
          <Input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <Dropzone
            onDrop={handleDrop}
            accept={IMAGE_MIME_TYPE}
            classNames={{
              root: "rounded-lg border border-dashed",
              inner: "flex flex-col gap-2 justify-center items-center",
            }}
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="w-48 h-48 object-cover rounded-lg"
              />
            ) : (
              <div>
                <p>Drag and drop an image here</p>
                <p>or</p>
                <Button>Choose a file</Button>
              </div>
            )}
          </Dropzone>
          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
      
      </form>
    </Container>
  );
}
export default DropPictureZone;
