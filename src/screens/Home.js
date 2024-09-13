import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const [data, setData] = useState([]);
    const urlBase = 'https://rickandmortyapi.com/api';
    const navigation = useNavigation();

    fetch(`${urlBase}/character`)
      .then(response => response.json())
      .then(dataApi => setData(dataApi.results))
      .catch(err => console.error(err));

    const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Stack', { id: item.id })}
            >
              <Text style={styles.buttonText}>Ver Detalles</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    return (
        <View style={styles.container}>
            <View style={styles.containerDataApi}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  containerDataApi: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
