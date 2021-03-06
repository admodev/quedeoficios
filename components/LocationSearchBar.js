import React from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import { Input } from 'react-native-elements';
import Drawer from 'react-native-drawer';

const LocationSearch = (props) => {
  const closeControlPanel = () => {
    _drawer.close();
  };
  const openControlPanel = () => {
    _drawer.open();
  };

  return (
    <TouchableOpacity
      onPress={closeControlPanel}
      style={{
        ...Platform.select({
          android: {
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            width: '80%',
            alignSelf: 'center',
            marginTop: '15%',
          },
          ios: {
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            width: '80%',
            alignSelf: 'center',
            marginTop: '12%',
          },
        }),
      }}
    >
      <Image
        source={require('../assets/icon.png')}
        style={{
          width: 35,
          height: 35,
          marginTop: -15,
          marginLeft: 10,
        }}
      />
      <Input
        placeholder="Buscar en Qworks!"
        inputStyle={{
          justifyContent: 'center',
          marginLeft: 50,
          marginTop: -10,
        }}
        containerStyle={{ marginLeft: 10, marginTop: -10 }}
        placeholderTextColor="#000000"
        onChangeText={(search) => this.setState({ search })}
      />
    </TouchableOpacity>
  );
};

export default LocationSearch;
