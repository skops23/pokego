
import { Text, View, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Details() {
  const params = useLocalSearchParams<{
    name: string;
    type: string;
    image: string;
    imageBack: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{params.name}</Text>

      <Text style={styles.tag}>{params.type}</Text>

      <View style={styles.images}>
        {params.image ? (
          <Image
            source={{ uri: params.image }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text>No hay imagen frontal</Text>
        )}

        {params.imageBack ? (
          <Image
            source={{ uri: params.imageBack }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text>No hay imagen trasera</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    color: "#333333",
  },
  tag: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    textTransform: "capitalize",
  },
  images: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 180,
  },
});