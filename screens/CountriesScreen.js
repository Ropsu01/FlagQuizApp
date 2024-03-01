import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; 


const CountriesScreen = () => {
  const [countries, setCountries] = useState([]);
  const { mode } = useTheme(); 



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const dynamicStyles = styles(mode);


  return (
    <View style={dynamicStyles.container}>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <View style={dynamicStyles.countryContainer}>
            <Image source={{ uri: item.flags.png }} style={dynamicStyles.flag} />
            <Text style={dynamicStyles.countryName}>{item.name.common}</Text>
          </View>
        )}
        numColumns={3}
      />
    </View>
  );
};

const styles = (mode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mode === 'dark' ? '#333' : '#fff', 
  },
  countryContainer: {
    flex: 1/3, 
    flexDirection: 'column', 
    alignItems: 'center', 
    margin: 10, 
  },
  flag: {
    width: 100, 
    height: 60, 
    marginBottom: 5, 
  },
  countryName: {
    fontSize: 14, 
    color: mode === 'dark' ? '#fff' : '#000', 
    textAlign: 'center', 
  },
});


export default CountriesScreen;
