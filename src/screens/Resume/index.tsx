import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// import { VictoryPie } from "victory-native";
import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HistoryCard } from "../../components/HistoryCard";
import { TransactionCardProps } from "../../components/TransactionCard";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSectIcon,
  Month,
} from "./styles";
import { subMonths } from "date-fns/esm";
import { useAuth } from "../../hooks/Auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface TotalCategoryProps {
  category: string;
  totalFormatted: string;
  total: number;
  color: string;
  id: string;
  // percent: string;
}
export function Resume() {
  const theme = useTheme();
  const { user } = useAuth();
  const [totalByCategories, setTotalByCategories] = useState<
    TotalCategoryProps[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeDate(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate((stt) => addMonths(stt, 1));
    } else {
      setSelectedDate((stt) => subMonths(stt, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    try {
      const dataKey = `@gofinances:transactions:${user.email}`;
      const asyncData = await AsyncStorage.getItem(dataKey);
      const currentData = asyncData ? JSON.parse(asyncData) : [];
      const expensives = currentData.filter(
        (expensive: DataListProps) =>
          expensive.type === "down" &&
          new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
          new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );

      // let expensiveTotal = 0;
      // if (expensives && expensives.length) {
      //   expensiveTotal = expensives.reducer(
      //     (acumullator: number, expensive: TransactionCardProps) => {
      //       return acumullator + Number(expensive.amount);
      //     },
      //     0
      //   );
      // }

      let totalByCategory: TotalCategoryProps[] = [];

      categories.forEach((category) => {
        let categorySum = 0;
        expensives.forEach((expensive: DataListProps) => {
          if (expensive.category === category.key) {
            categorySum += Number(expensive.amount);
          }
        });
        if (categorySum > 0) {
          // const percent = `${((categorySum / expensiveTotal) * 100).toFixed(
          //   0
          // )}%`;
          totalByCategory.push({
            category: category.name,
            totalFormatted: Number(categorySum).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
            total: categorySum,
            color: category.color,
            id: category.key,
            // percent,
          });
        }
      });
      setTotalByCategories(totalByCategory);
      setIsLoading(false);
    } catch (er) {
      console.log(er);
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content
        contentContainerStyle={{
          flex: 1,
          padding: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
        showsVerticalScrollIndicator={false}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleChangeDate("prev")}>
            <MonthSectIcon name="chevron-left" />
          </MonthSelectButton>
          <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>
          <MonthSelectButton onPress={() => handleChangeDate("next")}>
            <MonthSectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>
        {/* <VictoryPie 
        data={totalByCategories} 
        x="percent" 
        y="total" 
        style={{
          labels: { 
            fontSize: RFValue(18), 
            fontWeight: 'bold',
            fill: theme.colors.shape
          }
        }}
        labelRadius={50}
        colorScale={totalByCategories.map(category => category.color)}
        /> 
        */}

        {isLoading ? (
          <ActivityIndicator color={theme.colors.primary} size="large" />
        ) : (
          totalByCategories.map((item: TotalCategoryProps) => (
            <HistoryCard
              key={item.id}
              color={item.color}
              title={item.category}
              amount={item.totalFormatted}
            />
          ))
        )}
      </Content>
    </Container>
  );
}
