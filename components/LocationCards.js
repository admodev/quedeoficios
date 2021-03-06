import React, { Component, useState } from 'react';
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
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const naranjaQueDeOficios = '#fd5d13';

const LocationComponent = (props) => {
  const [defaultProfilePicture, setDefaultProfilePicture] = useState(null);
  const [fotoDePerfil, setFotoDePerfil] = useState(null);
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

  firebase
    .storage()
    .ref('anunciosPictures/')
    .child(props.idAnuncio + props.anuncioId + '.JPG')
    .getDownloadURL()
    .then(function (url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      setFotoDePerfil(url);
    })
    .catch(function (error) {
      console.log('ERROR AL DESCARGAR FOTO', error.message);
    });

  firebase
    .storage()
    .ref('defaultUserImage/')
    .child('defaultProfilePictureQworks.png')
    .getDownloadURL()
    .then(function (url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      setDefaultProfilePicture(url);
    })
    .catch(function (error) {
      console.log('ERROR AL DESCARGAR FOTO', error.message);
    });

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        height: 190,
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
          source={{
            uri: fotoDePerfil ? fotoDePerfil : defaultProfilePicture,
          }}
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
          <View
            style={{
              ...Platform.select({
                android: {
                  marginTop: '-15%',
                },
              }),
            }}>
            <AirbnbRating
              size={14}
              showRating={true}
              reviews={['']}
              type='star'
              // onFinishRating={this.setState({ rating: rating })}
            />
          </View>
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
              marginTop: 2,
            }}>
            <MaterialCommunityIcons name='account' color={'gray'} size={16} />{' '}
            {props.nombre.split(' ').shift()} {props.apellido}
          </Text>
          <Text
            style={{
              fontFamily: 'DmSans',
              fontSize: 20,
            }}>
            <MaterialCommunityIcons name='cog' color={'gray'} size={16} />{' '}
            {props.actividad.trim()}
          </Text>
          {props.local && (
            <Text
              onPress={() =>
                WebBrowser.openBrowserAsync(`https://www.google.com/maps`)
              }
              style={{
                ...Platform.select({
                  android: {
                    marginTop: -5,
                    fontFamily: 'ComfortaaLight',
                    fontSize: 18,
                    marginTop: 1,
                    color: '#0000EE',
                  },
                  ios: {
                    fontFamily: 'ComfortaaLight',
                    fontSize: 18,
                    marginTop: '2%',
                    color: '#0000EE',
                  },
                }),
              }}>
              <MaterialCommunityIcons
                name='storefront'
                color={'gray'}
                size={16}
              />{' '}
              {props.local.substr(0, 25) + '\u2026'}
            </Text>
          )}
          <Text
            style={{
              ...Platform.select({
                android: {
                  fontFamily: 'ComfortaaLight',
                  fontSize: 16,
                  width: 350,
                  marginTop: '1%',
                },
                ios: {
                  fontFamily: 'ComfortaaLight',
                  fontSize: 16,
                  width: 300,
                  marginTop: '2%',
                },
              }),
            }}>
            <MaterialCommunityIcons
              name='map-marker'
              color={'gray'}
              size={16}
            />{' '}
            {props.localidad.substr(0, 25) + '\u2026'}
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
              <Text
                style={{
                  color: naranjaQueDeOficios,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontFamily: 'DmSansBold',
                  fontSize: 16,
                  marginBottom: '8%',
                }}>
                ¡Comunícate!
              </Text>
              <View
                style={{
                  marginBottom: '7%',
                  marginRight: '15%',
                }}>
                <MaterialCommunityIcons
                  name='comment-text'
                  color={naranjaQueDeOficios}
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LocationComponent;
