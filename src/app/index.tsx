
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { Link } from "expo-router";

const pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=20";

interface Pokemon {
  name: string;
  image: string | null;
  imageBack: string | null;
  type: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch(pokeAPI);
        const data = await response.json();

        const detailPokemons = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return {
              name: pokemon.name,
              image: details.sprites.front_default,
              imageBack: details.sprites.back_default,
              type: details.types,
            };
          })
        );

        setPokemons(detailPokemons);

        console.log(JSON.stringify(detailPokemons, null, 2));
      } catch (e) {
        console.log("Error:", e);
      }
    }

    fetchPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 26,
        }}
      >
        {pokemons.map((pokemon: Pokemon) => (
          <Link
            key={pokemon.name}
            href={{
              pathname: "/details",
              params: {
                name: pokemon.name,
                type: pokemon.type[0].type.name,
                image: pokemon.image || "",
                imageBack: pokemon.imageBack || "",
              },
            }}
            style={[
              styles.pokemonCard,
              {
                backgroundColor:
                  colorsByType[pokemon.type[0]?.type.name] +50 || "#FFFFFF",
              },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.pokemonName}>
                {pokemon.name}
              </Text>

              <Text style={styles.tag}>
                {pokemon.type.map((t) => t.type.name).join(", ")}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {pokemon.image && (
                  <Image
                    source={{ uri: pokemon.image }}
                    style={{ width: 120, height: 120 }}
                    resizeMode="contain"
                  />
                )}

                {pokemon.imageBack && (
                  <Image
                    source={{ uri: pokemon.imageBack }}
                    style={{ width: 120, height: 120 }}
                    resizeMode="contain"
                  />
                )}
              </View>
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  pokemonCard: {
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    color: "#FFFFFF",
  },
  tag: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "capitalize",
  },
});
