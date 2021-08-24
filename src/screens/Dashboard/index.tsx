import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { useTheme } from "styled-components";

import { HighLigthCard } from "../../components/HighLigthCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  IconFeather,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
}

export interface HighLightData {
  entries: HighLightProps;
  expensive: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({
    entries: { amount: "R$ 0,00" },
    expensive: { amount: "R$ 0,00" },
    total: { amount: "R$ 0,00" },
  });

  async function loadTransaction() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "up") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          title: item.title,
          amount,
          date,
          type: item.type,
          category: item.category,
        };
      }
    );
    setHighLightData({
      entries: {
        amount: Number(entriesTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensive: {
        amount: Number(expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: Number(entriesTotal - expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
    setData(transactionsFormatted);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  return (
    <Container>
      {!isLoading ? (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/3254949?v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Rodrigo</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <IconFeather name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighLigthCard
              title="Entradas"
              amount={highLightData.entries.amount}
              lastTransaction="Última entrada dia 13 de abril"
              type="up"
            />
            <HighLigthCard
              title="Saídas"
              amount={highLightData.expensive.amount}
              lastTransaction="Última saída dia 03 de abril"
              type="down"
            />
            <HighLigthCard
              title="Total"
              amount={highLightData.total.amount}
              lastTransaction="01 à 16 de abril"
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      ) : (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      )}
    </Container>
  );
}
