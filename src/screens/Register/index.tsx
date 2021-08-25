import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import { RootBottomTabParamList } from "../../routes/app.routes";

import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { InputForm } from "../../components/Form/InputForm";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import { useAuth } from "../../hooks/Auth";

interface FormData {
  name: string;
  amount: string;
}

type listScreenProp = BottomTabNavigationProp<
  RootBottomTabParamList,
  "Listagem"
>;

const schema = yup.object().shape({
  name: yup.string().required("Informe a descrição da transação"),
  amount: yup
    .number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("Informe o valor da transação"),
});

export function Register() {
  const navigation = useNavigation<listScreenProp>();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister({ name, amount }: FormData) {
    if (!transactionType) {
      Alert.alert("Atenção", "Selecione o tipo da transação");
      return;
    }
    if (category.key === "category") {
      Alert.alert("Atenção", "Selecione a categoria transação");
      return;
    }
    const newTransaction = {
      id: String(uuid.v4()),
      date: new Date(),
      title: name,
      amount,
      type: transactionType,
      category: category.key,
    };
    try {
      const dataKey = `@gofinances:transactions:${user.email}`;
      const asyncData = await AsyncStorage.getItem(dataKey);
      const currentData = asyncData ? JSON.parse(asyncData) : [];

      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      reset();
      navigation.navigate("Listagem");
    } catch (er) {
      console.log(er);
      Alert.alert("Erro", "Não foi possível salvar sua transação.");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect("up")}
                isActive={transactionType === "up"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("down")}
                isActive={transactionType === "down"}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            setCategory={setCategory}
            category={category}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
