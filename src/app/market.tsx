import { View, Text, StyleSheet, ScrollView } from "react-native";

const marketCards = [
  {
    id: 1,
    name: "Charizard ex",
    set: "151",
    price: 42.17,
    change: 8.2,
  },
  {
    id: 2,
    name: "Umbreon VMAX",
    set: "Evolving Skies",
    price: 284.11,
    change: 5.7,
  },
  {
    id: 3,
    name: "Pikachu IR",
    set: "151",
    price: 31.52,
    change: -2.4,
  },
];

export default function MarketScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market</Text>

      <Text style={styles.subtitle}>
        Track card prices and trends.
      </Text>

      <ScrollView style={styles.cardList}>
        {marketCards.map((card) => (
          <View style={styles.card} key={card.id}>
            <View>
              <Text style={styles.cardName}>{card.name}</Text>
              <Text style={styles.cardSet}>{card.set}</Text>
            </View>

            <View style={styles.priceSection}>
              <Text style={styles.cardPrice}>
                ${card.price.toFixed(2)}
              </Text>

              <Text
                style={
                  card.change >= 0
                    ? styles.positiveChange
                    : styles.negativeChange
                }
              >
                {card.change >= 0 ? "+" : ""}
                {card.change}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 24,
    paddingTop: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#777777",
  },

  cardList: {
    marginTop: 25,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },

  cardSet: {
    marginTop: 5,
    color: "#777777",
    fontSize: 14,
  },

  priceSection: {
    alignItems: "flex-end",
  },

  cardPrice: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },

  positiveChange: {
    marginTop: 5,
    fontSize: 14,
    color: "green",
  },

  negativeChange: {
    marginTop: 5,
    fontSize: 14,
    color: "red",
  },
});