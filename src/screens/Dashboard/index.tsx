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
import { useAuth } from "../../hooks/Auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

export interface HighLightData {
  entries: HighLightProps;
  expensive: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const theme = useTheme();
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({
    entries: { amount: "R$ 0,00", lastTransaction: "" },
    expensive: { amount: "R$ 0,00", lastTransaction: "" },
    total: { amount: "R$ 0,00", lastTransaction: "" },
  });

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "up" | "down"
  ) {
    const lastTransactions = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );
    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleDateString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  async function handleSignOut() {
    await signOut();
  }

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

    const lastTransactionEntries = getLastTransactionDate(transactions, "up");
    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      "down"
    );
    const totalInterval = `01 à ${lastTransactionExpensive}`;
    setHighLightData({
      entries: {
        amount: Number(entriesTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: Number(expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: Number(entriesTotal - expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setData(transactionsFormatted);
    setIsLoading(false);
  }

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
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={handleSignOut}>
                <IconFeather name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighLigthCard
              title="Entradas"
              amount={highLightData.entries.amount}
              lastTransaction={highLightData.entries.lastTransaction}
              type="up"
            />
            <HighLigthCard
              title="Saídas"
              amount={highLightData.expensive.amount}
              lastTransaction={highLightData.expensive.lastTransaction}
              type="down"
            />
            <HighLigthCard
              title="Total"
              amount={highLightData.total.amount}
              lastTransaction={highLightData.total.lastTransaction}
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
