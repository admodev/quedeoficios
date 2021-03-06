import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text, Platform } from 'react-native';
import { AirbnbRating, Button, Overlay } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import { useFonts } from 'expo-font';
import * as RootNavigation from '../RootNavigation';

const CardMisAnuncios = (props) => {
  const [defaultProfilePicture, setDefaultProfilePicture] = useState(null);
  const [fotoDePerfil, setFotoDePerfil] = useState(null);
  const [eliminarCuentaAproved, setEliminarCuentaAproved] = useState(false);
  const [visible, setVisible] = useState(false);
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

  const handleDeleteAccount = async () => {
    setVisible(!visible);

    if (eliminarCuentaAproved) {
      firebase.default
        .auth()
        .currentUser.delete()
        .then(function () {
          alert('Eliminando su cuenta, aguarde por favor...');
          return setTimeout(() => {
            RootNavigation.navigate('OnboardingPage');
          }, 2000);
        })
        .catch(function (error) {
          alert(
            "Para eliminar su cuenta debe oprimir 'si' en el recuadro de alerta."
          );
          console.error('Ocurrio un error al eliminar su cuenta...', error);
        });
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '95%',
        marginTop: '5%',
        alignSelf: 'center',
        borderRadius: 10,
      }}>
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
        <Text style={{ fontSize: 16, textAlign: 'center', margin: 5 }}>
          Esta a punto de eliminar su cuenta y perder todos sus datos, desea
          continuar?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '2%',
          }}>
          <Button
            title='Si'
            buttonStyle={{
              backgroundColor: '#fd5d13',
              opacity: 0.8,
              width: 120,
              borderRadius: 12,
              margin: 5,
            }}
            onPress={() => setEliminarCuentaAproved(true)}
          />
          <Button
            title='No'
            buttonStyle={{
              backgroundColor: '#fd5d13',
              width: 120,
              borderRadius: 12,
              margin: 5,
            }}
            onPress={() => setEliminarCuentaAproved(false)}
          />
        </View>
      </Overlay>
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
            color={'#fd5d13'}
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
            marginBottom: '2%',
            maxWidth: '85%',
          }}>
          <Text
            style={{
              fontFamily: 'DmSans',
              fontSize: 20,
            }}>
            <MaterialCommunityIcons name='account' color={'gray'} size={16} />{' '}
            {props.nombre.split(' ').shift()} {props.apellido}
          </Text>
          <Text
            style={{
              fontFamily: 'DmSans',
              fontSize: 20,
              marginTop: '-1%',
            }}>
            <MaterialCommunityIcons name='cog' color={'gray'} size={16} />{' '}
            {props.actividad.trim()}
          </Text>
          {
            // fix this
            props.local && (
              <Text
                style={{
                  ...Platform.select({
                    android: {
                      marginTop: -5,
                      fontFamily: 'ComfortaaLight',
                      fontSize: 18,
                    },
                    ios: {
                      fontFamily: 'ComfortaaLight',
                      fontSize: 18,
                    },
                  }),
                }}>
                <MaterialCommunityIcons
                  name='storefront'
                  color={'gray'}
                  size={16}
                />{' '}
                {props.local.trim()}
              </Text>
            )
          }
          <Text
            style={{
              ...Platform.select({
                android: {
                  fontFamily: 'ComfortaaLight',
                  fontSize: 16,
                  width: 350,
                },
                ios: {
                  fontFamily: 'ComfortaaLight',
                  fontSize: 16,
                  width: 300,
                },
              }),
            }}>
            <MaterialCommunityIcons
              name='map-marker'
              color={'gray'}
              size={16}
            />{' '}
            Morón, Provincia de Buenos Aires
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
              top: -75,
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
                  marginRight: '15%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    RootNavigation.navigate('EditAnounce', {
                      id: props.idAnuncio,
                      uuid: props.uuid,
                      index: props.key,
                    });
                  }}>
                  <MaterialCommunityIcons
                    name='lead-pencil'
                    color={'#fd5d13'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginBottom: '7%',
                  marginRight: '15%',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    firebase.default
                      .database()
                      .ref('anuncios/' + props.idAnuncio + props.anuncioId)
                      .remove()
                  }>
                  <MaterialCommunityIcons
                    name='eraser'
                    color={'#fd5d13'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginBottom: '7%',
                  marginRight: '15%',
                }}>
                <TouchableOpacity onPress={handleDeleteAccount}>
                  <MaterialCommunityIcons
                    name='account-off'
                    color={'#fd5d13'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardMisAnuncios;
