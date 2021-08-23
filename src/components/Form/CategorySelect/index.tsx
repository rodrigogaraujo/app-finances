import React from "react";

import { Container } from "./styles";

interface Props {
  title: string;
}

export function CategorySelect({ title }: Props) {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon />
    </Container>
  );
}
