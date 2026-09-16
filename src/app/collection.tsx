import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useCollection } from "../context/CollectionContext";

export default function CollectionScreen() {
  const { collection } = useCollection();

  const totalValue = collection.reduce(
    (total, card) => total + card.value,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Collection
      </Text>

      <Text style={styles.subtitle}>
        Track and manage your cards.
      </Text>

      <View style={styles.valueCard}>
        <Text style={styles.valueLabel}>
          Collection Value
        </Text>

        <Text style={styles.totalValue}>
          ${totalValue.toFixed(2)}
        </Text>

        <Text style={styles.cardCount}>
          {collection.length} cards
        </Text>
      </View>

      {collection.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No cards yet
          </Text>

          <Text style={styles.emptyText}>
            Open a pack and add your first card.
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.cardList}
          showsVerticalScrollIndicator={false}
        >
          {collection.map((card) => (
            <View
              style={styles.card}
              key={card.id}
            >
              <View>
                <Text style={styles.cardName}>
                  {card.name}
                </Text>

                <Text style={styles.cardStatus}>
                  Owned
                </Text>
              </View>

              <Text style={styles.cardPrice}>
                ${card.value.toFixed(2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
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

  valueCard: {
    backgroundColor: "#111111",
    borderRadius: 20,
    padding: 22,
    marginTop: 25,
  },

  valueLabel: {
    color: "#aaaaaa",
    fontSize: 14,
  },

  totalValue: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 5,
  },

  cardCount: {
    color: "#bbbbbb",
    fontSize: 14,
    marginTop: 7,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
  },

  emptyText: {
    fontSize: 15,
    color: "#777777",
    marginTop: 7,
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

  cardStatus: {
    marginTop: 5,
    color: "#777777",
    fontSize: 14,
  },

  cardPrice: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },
});