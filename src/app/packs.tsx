import { useRef, useState } from "react";
import {
    Animated,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useCollection } from "../context/CollectionContext";
import { supabase } from "../lib/supabase";

type Card = {
  id: number;
  name: string;
  value: number;
  weight: number;
};

type Pack = {
  id: number;
  name: string;
  price: number;
  description: string;
  cards: Card[];
};

const packs: Pack[] = [
  {
    id: 1,
    name: "Starter Pack",
    price: 5,
    description:
      "Affordable pulls with a small chance at something big.",
    cards: [
      {
        id: 1,
        name: "Charmander",
        value: 4.25,
        weight: 55,
      },
      {
        id: 2,
        name: "Pikachu IR",
        value: 12.5,
        weight: 30,
      },
      {
        id: 3,
        name: "Charizard ex",
        value: 42.17,
        weight: 12,
      },
      {
        id: 4,
        name: "Umbreon VMAX",
        value: 284.11,
        weight: 3,
      },
    ],
  },

  {
    id: 2,
    name: "Trainer Pack",
    price: 10,
    description:
      "Better chances at stronger and more valuable pulls.",
    cards: [
      {
        id: 5,
        name: "Pikachu IR",
        value: 12.5,
        weight: 40,
      },
      {
        id: 6,
        name: "Charizard ex",
        value: 42.17,
        weight: 35,
      },
      {
        id: 7,
        name: "Mew ex",
        value: 68.25,
        weight: 20,
      },
      {
        id: 8,
        name: "Umbreon VMAX",
        value: 284.11,
        weight: 5,
      },
    ],
  },

  {
    id: 3,
    name: "Elite Pack",
    price: 25,
    description:
      "Higher risk with much stronger chase cards.",
    cards: [
      {
        id: 9,
        name: "Charizard ex",
        value: 42.17,
        weight: 40,
      },
      {
        id: 10,
        name: "Mew ex",
        value: 68.25,
        weight: 30,
      },
      {
        id: 11,
        name: "Gengar VMAX",
        value: 175.5,
        weight: 20,
      },
      {
        id: 12,
        name: "Umbreon VMAX",
        value: 284.11,
        weight: 10,
      },
    ],
  },
];

export default function PacksScreen() {
  const { addCard } = useCollection();

  const [openingPackId, setOpeningPackId] =
    useState<number | null>(null);

  const [selectedPack, setSelectedPack] =
    useState<Pack | null>(null);

  const [pulledCard, setPulledCard] =
    useState<Card | null>(null);

  const [showReveal, setShowReveal] =
    useState(false);

  const [savingCard, setSavingCard] =
    useState(false);

  const packScale = useRef(
    new Animated.Value(1)
  ).current;

  const packRotate = useRef(
    new Animated.Value(0)
  ).current;

  const packOpacity = useRef(
    new Animated.Value(1)
  ).current;

  const revealScale = useRef(
    new Animated.Value(0.7)
  ).current;

  const revealOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const rotation = packRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-8deg", "0deg", "8deg"],
  });

  function chooseRandomCard(cards: Card[]) {
    const totalWeight = cards.reduce(
      (total, card) => total + card.weight,
      0
    );

    const randomNumber =
      Math.random() * totalWeight;

    let currentWeight = 0;

    for (const card of cards) {
      currentWeight += card.weight;

      if (randomNumber <= currentWeight) {
        return card;
      }
    }

    return cards[0];
  }

  function openPack(pack: Pack) {
    if (openingPackId !== null) {
      return;
    }

    setOpeningPackId(pack.id);
    setSelectedPack(pack);
    setPulledCard(null);

    packScale.setValue(1);
    packRotate.setValue(0);
    packOpacity.setValue(1);

    Animated.sequence([
      Animated.timing(packScale, {
        toValue: 0.92,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(packRotate, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }),

      Animated.timing(packRotate, {
        toValue: -1,
        duration: 90,
        useNativeDriver: true,
      }),

      Animated.timing(packRotate, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }),

      Animated.timing(packRotate, {
        toValue: 0,
        duration: 90,
        useNativeDriver: true,
      }),

      Animated.timing(packScale, {
        toValue: 1.08,
        duration: 180,
        useNativeDriver: true,
      }),

      Animated.timing(packOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const card =
        chooseRandomCard(pack.cards);

      setPulledCard(card);
      setOpeningPackId(null);

      packScale.setValue(1);
      packRotate.setValue(0);
      packOpacity.setValue(1);

      showCardReveal();
    });
  }

  function showCardReveal() {
    revealScale.setValue(0.7);
    revealOpacity.setValue(0);

    setShowReveal(true);

    setTimeout(() => {
      Animated.parallel([
        Animated.spring(revealScale, {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),

        Animated.timing(revealOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    }, 100);
  }

  async function addToCollection() {
    if (!pulledCard || savingCard) {
      return;
    }

    setSavingCard(true);

    const { data, error } = await supabase
      .from("collection_cards")
      .insert({
        user_id: "demo-user",
        name: pulledCard.name,
        value: pulledCard.value,
      })
      .select()
      .single();

    if (error) {
      console.log(
        "Error saving card:",
        error.message
      );

      setSavingCard(false);
      return;
    }

    addCard({
      id: data.id,
      name: data.name,
      value: Number(data.value),
    });

    setSavingCard(false);
    closeReveal();
  }

  function closeReveal() {
    setShowReveal(false);
    setPulledCard(null);
    setSelectedPack(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Packs
      </Text>

      <Text style={styles.subtitle}>
        Open packs and build your collection.
      </Text>

      <ScrollView
        style={styles.packList}
        showsVerticalScrollIndicator={false}
      >
        {packs.map((pack) => {
          const isOpening =
            openingPackId === pack.id;

          return (
            <Animated.View
              key={pack.id}
              style={[
                styles.packCard,
                isOpening && {
                  opacity: packOpacity,
                  transform: [
                    {
                      scale: packScale,
                    },
                    {
                      rotate: rotation,
                    },
                  ],
                },
              ]}
            >
              <View>
                <Text style={styles.packName}>
                  {pack.name}
                </Text>

                <Text
                  style={styles.packDescription}
                >
                  {pack.description}
                </Text>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.packPrice}>
                  ${pack.price.toFixed(2)}
                </Text>

                <Pressable
                  style={[
                    styles.openButton,
                    openingPackId !== null &&
                      styles.disabledButton,
                  ]}
                  onPress={() =>
                    openPack(pack)
                  }
                  disabled={
                    openingPackId !== null
                  }
                >
                  <Text
                    style={
                      styles.openButtonText
                    }
                  >
                    {isOpening
                      ? "Opening..."
                      : "Open Pack"}
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>

      <Modal
        visible={showReveal}
        transparent
        animationType="fade"
        onRequestClose={closeReveal}
      >
        <View style={styles.modalBackground}>
          {pulledCard && (
            <Animated.View
              style={[
                styles.revealContainer,
                {
                  opacity: revealOpacity,
                  transform: [
                    {
                      scale: revealScale,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.revealLabel}>
                YOU PULLED
              </Text>

              <View style={styles.fakeCard}>
                <Text style={styles.fakeCardName}>
                  {pulledCard.name}
                </Text>

                <Text style={styles.fakeCardText}>
                  Pokémon Card
                </Text>
              </View>

              <Text style={styles.revealName}>
                {pulledCard.name}
              </Text>

              <Text style={styles.revealValue}>
                ${pulledCard.value.toFixed(2)}
              </Text>

              {selectedPack && (
                <Text
                  style={
                    styles.revealPackName
                  }
                >
                  Pulled from{" "}
                  {selectedPack.name}
                </Text>
              )}

              <Pressable
                style={[
                  styles.keepButton,
                  savingCard &&
                    styles.disabledButton,
                ]}
                onPress={addToCollection}
                disabled={savingCard}
              >
                <Text
                  style={
                    styles.keepButtonText
                  }
                >
                  {savingCard
                    ? "Saving..."
                    : "Add to Collection"}
                </Text>
              </Pressable>

              <Pressable
                style={styles.anotherButton}
                onPress={closeReveal}
                disabled={savingCard}
              >
                <Text
                  style={
                    styles.anotherButtonText
                  }
                >
                  Open Another
                </Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
      </Modal>
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

  packList: {
    marginTop: 25,
  },

  packCard: {
    backgroundColor: "#111111",
    padding: 22,
    borderRadius: 20,
    marginBottom: 16,
    minHeight: 165,
    justifyContent: "space-between",
  },

  packName: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },

  packDescription: {
    color: "#bbbbbb",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: "90%",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },

  packPrice: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "800",
  },

  openButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  disabledButton: {
    opacity: 0.5,
  },

  openButtonText: {
    color: "#111111",
    fontWeight: "800",
    fontSize: 14,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  revealContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },

  revealLabel: {
    color: "#aaaaaa",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 25,
  },

  fakeCard: {
    width: 220,
    height: 305,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  fakeCardName: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111111",
    textAlign: "center",
  },

  fakeCardText: {
    marginTop: 10,
    color: "#888888",
    fontSize: 14,
  },

  revealName: {
    color: "#ffffff",
    fontSize: 29,
    fontWeight: "800",
    marginTop: 25,
    textAlign: "center",
  },

  revealValue: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 7,
  },

  revealPackName: {
    color: "#999999",
    fontSize: 14,
    marginTop: 8,
  },

  keepButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
  },

  keepButtonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "800",
  },

  anotherButton: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 5,
  },

  anotherButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});