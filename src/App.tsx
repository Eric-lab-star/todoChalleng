import React, { useState } from "react";
import styled from "styled-components";
import "reset-css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
const Container = styled.div`
  width: 50vw;
  margin: 100px auto;
  padding: 20px;
  border-radius: 10px;
  font-family: brevia, sans-serif;
  background-color: gray;
`;

const Title = styled.h1`
  font-weight: 800;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

type FormValues = {
  item: IItem[];
  category: string;
};

interface IItem {
  name: string;
  category: string;
}
function App() {
  const { register, handleSubmit, resetField, control } = useForm<FormValues>({
    defaultValues: {
      item: [{ name: "test", category: "todo" }],
      category: "todo",
    },
  });

  const [categories, setCategories] = useState<string[]>();
  const [items, setItems] = useState<IItem[]>();

  const { fields, append } = useFieldArray({ control, name: "item" });

  const onSubmit = (data: FormValues) => {
    const { category } = data;
    setCategories((prev) => {
      if (prev) {
        return [...prev, category];
      }

      return [category];
    });
    append({
      name: "",
      category,
    });
  };

  const onTask = (data: FormValues) => {
    console.log(data);
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <link rel="stylesheet" href="https://use.typekit.net/xxw0iyk.css" />
          <title>Just Do It</title>
        </Helmet>
        <div>
          <Title>1, 2, 3</Title>
          <Title>Just Do It</Title>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label>Category</label>
          <input type={"type"} {...register("category")} />
          <input type={"submit"} value="Create" />
        </Form>
        <div>
          <Form onSubmit={handleSubmit(onTask)}>
            {fields.map((field, index) => (
              <div key={field.id}>
                <label>{field.category}</label>
                <input {...register(`item.${index}.name`)} />
                <input type={"submit"} value="Add" />
              </div>
            ))}
          </Form>
        </div>
      </Container>
    </HelmetProvider>
  );
}

export default App;
