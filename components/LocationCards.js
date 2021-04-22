import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Platform,
} from 'react-native';
import {
  AirbnbRating,
  Avatar,
  Button,
  Card,
  Icon,
  Input,
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import { useFonts } from 'expo-font';
import * as RootNavigation from '../RootNavigation';

const naranjaQueDeOficios = '#fd5d13';

const LocationComponent = (props) => {
  const [loaded] = useFonts({
    // Nombres, apellidos, títulos y subtítulos
    DmSans: require('../assets/fonts/DM_Sans/DMSans-Regular.ttf'),
    DmSansBold: require('../assets/fonts/DM_Sans/DMSans-Bold.ttf'),

    // Comunicación interna y externa
    QuickSandLight: require('../assets/fonts/Quicksand/static/Quicksand-Light.ttf'),
    QuickSandRegular: require('../assets/fonts/Quicksand/static/Quicksand-Regular.ttf'),

    // Para lo demás
    ComfortaaLight: require('../assets/fonts/Comfortaa/static/Comfortaa-Light.ttf'),
    ComfortaaRegular: require('../assets/fonts/Comfortaa/static/Comfortaa-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#ffffff',
        width: '100%',
        height: '65%',
        alignSelf: 'center',
        borderRadius: 10,
        bottom: 5,
      }}>
      <Image
        source={require('../assets/gradients/10X10.png')}
        style={{
          width: '100%',
          height: 50,
          position: 'absolute',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View>
        <Image
          source={require('../assets/icon.png')}
          style={{
            width: 60,
            height: 60,
            top: 15,
            left: 30,
            position: 'absolute',
            borderRadius: 12,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 18,
            left: 90,
          }}>
          <AirbnbRating
            size={14}
            showRating={true}
            reviews={['']}
            type='star'
            // onFinishRating={this.setState({ rating: rating })}
          />
          <MaterialCommunityIcons
            name='account-group'
            color={naranjaQueDeOficios}
            size={20}
            style={{ position: 'absolute', top: 32, right: -30 }}
          />
          <Text
            style={{
              color: '#8DB600',
              textAlign: 'center',
              fontSize: 14,
              position: 'absolute',
              top: 35,
              right: -65,
            }}>
            {props.recomendacionesTotales}
          </Text>
        </View>
        <View
          style={{
            marginTop: '25%',
            marginLeft: '2%',
            maxWidth: '85%',
          }}>
          <Text
            style={{
              fontFamily: 'DmSans',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            <MaterialCommunityIcons name='account' color={'gray'} size={16} />{' '}
            {props.nombre.split(' ').shift()} {props.apellido}
          </Text>
          <Text
            style={{
              fontFamily: 'DmSans',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: '-2%',
            }}>
            <MaterialCommunityIcons name='cog' color={'gray'} size={16} />{' '}
            {props.actividad.trim()}
          </Text>
          <Text
            style={{
              fontFamily: 'ComfortaaLight',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            <MaterialCommunityIcons
              name='storefront'
              color={'gray'}
              size={16}
            />{' '}
            {props.local.trim()}
          </Text>
          <Text
            style={{
              fontFamily: 'ComfortaaLight',
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: '2%',
            }}>
            <MaterialCommunityIcons
              name='map-marker'
              color={'gray'}
              size={16}
            />{' '}
            Moŕon, Provincia de Buenos Aires
          </Text>
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate('AnuncioSeleccionado', {
                id: props.idAnuncio,
                uuid: props.uuid,
                index: props.key,
              });
            }}
            style={{
              borderRadius: 25,
              position: 'absolute',
              top: -62,
              right: -45,
              backgroundColor: 'transparent',
              width: 150,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginBottom: '7%',
                }}>
                <MaterialCommunityIcons
                  name='hand'
                  color={naranjaQueDeOficios}
                  size={20}
                />
              </View>
              <Text
                style={{
                  color: naranjaQueDeOficios,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontSize: 16,
                  marginLeft: '3%',
                  marginBottom: '8%',
                  fontWeight: 'bold',
                }}>
                ¡Conóceme!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LocationComponent;
