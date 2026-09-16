import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CHARLECTOR</Text>

      <Text style={styles.subtitle}>
        Collect. Track. Rip.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Collection Value</Text>

        <Text style={styles.value}>
          $0.00
        </Text>

        <Text style={styles.change}>
          Start building your collection
        </Text>
      </View>
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

  logo: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#111111",
  },

  subtitle: {
    fontSize: 16,
    color: "#777777",
    marginTop: 5,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#111111",
    padding: 24,
    borderRadius: 20,
  },

  label: {
    color: "#aaaaaa",
    fontSize: 15,
  },

  value: {
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "700",
    marginTop: 6,
  },

  change: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 10,
  },
});