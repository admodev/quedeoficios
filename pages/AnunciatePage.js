import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Button,
  CheckBox,
  Input,
  Overlay,
  Text,
} from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { DOTLOCATION } from '@env';

const AnunciatePage = ({ navigation }) => {
  let user = firebase.auth().currentUser;
  let id = user.uid;
  const [image, setImage] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cuitCuil, setCuitCuil] = useState('');
  const [dni, setDni] = useState('');
  const [actividad, setActividad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [localidadLatitude, setLocalidadLatitude] = useState('');
  const [localidadLongitude, setLocalidadLongitude] = useState('');
  const [partido, setPartido] = useState('');
  const [partidoLatitude, setPartidoLatitude] = useState('');
  const [partidoLongitude, setPartidoLongitude] = useState('');
  const [local, setLocal] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [factura, setFactura] = useState('');
  const [direccionDelLocal, setDireccionDelLocal] = useState('');
  const [direccionDelLocalLatitude, setDireccionDelLocalLatitude] =
    useState('');
  const [direccionDelLocalLongitude, setDireccionDelLocalLongitude] =
    useState('');
  const [nombreDeLaEmpresa, setNombreDeLaEmpresa] = useState('');
  const [matricula, setMatricula] = useState('');
  const [numeroDeMatricula, setNumeroDeMatricula] = useState('');
  const [emailLaboral, setEmailLaboral] = useState('');
  const [descripcionPersonal, setDescripcionPersonal] = useState('');
  const [palabraClaveUno, setPalabraClaveUno] = useState('');
  const [palabraClaveDos, setPalabraClaveDos] = useState('');
  const [palabraClaveTres, setPalabraClaveTres] = useState('');
  const [palabrasClave, setPalabrasclave] = useState([]);
  const [diasHorarios, setDiasHorarios] = useState([]);
  const [efectivo, setEfectivo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const toggleEfectivo = React.useCallback(() => setEfectivo(!efectivo));
  const [pagosDigitales, setPagosDigitales] = useState(false);
  const togglePagosDigitales = React.useCallback(() =>
    setPagosDigitales(!pagosDigitales)
  );
  const [terminos, setTerminos] = useState(false);
  const toggleTerminos = React.useCallback(() => setTerminos(!terminos));
  const [ready, setReady] = useState(false);
  const [where, setWhere] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  let latitud = where.lat;
  let longitud = where.lng;
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const uuid = uuidv4();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            '¡Perdón, necesitamos acceder a la galería para que pueda subir una foto!'
          );
        }
      }
    })();

    setReady(false);
    setError(null);

    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60 * 60 * 24,
    };

    const geoSuccess = (position) => {
      console.log(position);
      setReady(true);
      setWhere({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const geoFailure = (error) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoFailure,
      geoOptions
    );
  }, []);

  let anunciosIdsCount = [];
  let idRefAnuncios = firebase
    .database()
    .ref('anuncios/')
    .on('value', (snap) => {
      snap.forEach((child) => {
        anunciosIdsCount.push({
          ids: child.val().id,
        });
      });
    });

  let anunciosCount = anunciosIdsCount.reduce(
    (arr, elem) => arr.concat(elem.ids),
    []
  );

  function countTrue(array) {
    var trueCounter = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] === id) {
        trueCounter.push(array[i]);
      }
    }
    return trueCounter.length;
  }

  let anunciosCountResult = countTrue(anunciosCount);

  function concatPalabraClaveUno() {
    setPalabrasClave(palabrasClave.concat(palabraClaveUno));
  }

  function concatPalabraClaveDos() {
    setPalabrasClave(palabrasClave.concat(palabraClaveDos));
  }

  function concatPalabraClaveTres() {
    setPalabrasClave(palabrasClave.concat(palabraClaveTres));
  }

  function concatLunes() {
    setDiasHorarios(diasHorarios.concat('Lunes'));
    toggleLunesChecked();
  }
  function concatMartes() {
    setDiasHorarios(diasHorarios.concat('Martes'));
    toggleMartesChecked();
  }
  function concatMiercoles() {
    setDiasHorarios(diasHorarios.concat('Miercoles'));
    toggleMiercolesChecked();
  }
  function concatJueves() {
    setDiasHorarios(diasHorarios.concat('Jueves'));
    toggleJuevesChecked();
  }
  function concatViernes() {
    setDiasHorarios(diasHorarios.concat('Viernes'));
    toggleViernesChecked();
  }
  function concatSabado() {
    setDiasHorarios(diasHorarios.concat('Sabado'));
    toggleSabadoChecked();
  }
  function concatDomingo() {
    setDiasHorarios(diasHorarios.concat('Domingo'));
    toggleDomingoChecked();
  }

  function concatLunesViernes() {
    setDiasHorarios(diasHorarios.concat('Lunes a Viernes'));
    toggleLunesViernesChecked();
  }

  const pickImage = async () => {
    var token = Cookies.get('csrftoken');

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri.toString());
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const filename = result.uri.substring(result.uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
      setUploading(true);
      setTransferred(0);

      const task = firebase
        .storage()
        .ref('anunciosPictures/')
        .child(firebase.auth().currentUser.uid + anunciosCountResult + '.JPG')
        .put(blob)
        .then(function () {
          console.log('Foto subida exitosamente!');
        })
        .catch((error) => {
          console.log('ERROR AL SUBIR LA FOTO', error.message);
        });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      setUploading(false);
    }
  };

  function setLocationFunc(placesLocation) {
    setLocalidad(placesLocation);
  }

  function setLocationLatitudeFunc(placesLocationLatitude) {
    setLocalidadLatitude(placesLocationLatitude);
  }

  function setLocationLongitudeFunc(placesLocationLongitude) {
    setLocalidadLongitude(placesLocationLongitude);
  }

  function setPartidoFunc(placesPartido) {
    setPartido(placesPartido);
  }

  function setPartidoLatitudeFunc(placesPartidoLatitude) {
    setPartidoLatitude(placesPartidoLatitude);
  }

  function setPartidoLongitudeFunc(placesPartidoLongitude) {
    setPartidoLongitude(placesPartidoLongitude);
  }

  function setDireccionDelLocalFunc(direccionDelLocalPlaces) {
    setDireccionDelLocal(direccionDelLocalPlaces);
  }

  function setDireccionDelLocalLatitudeFunc(direccionDelLocalLatitudePlaces) {
    setDireccionDelLocalLatitude(direccionDelLocalLatitudePlaces);
  }

  function setDireccionDelLocalLongitudeFunc(direccionDelLocalLongitudePlaces) {
    setDireccionDelLocalLongitude(direccionDelLocalLongitudePlaces);
  }

  function writeUserData(
    nombre,
    apellido,
    cuitCuil,
    dni,
    actividad,
    telefono,
    celular,
    localidad,
    localidadLatitude,
    localidadLongitude,
    partido,
    partidoLatitude,
    partidoLongitude,
    local,
    empresa,
    factura,
    direccionDelLocal,
    direccionDelLocalLatitude,
    direccionDelLocalLongitude,
    nombreDeLaEmpresa,
    matricula,
    numeroDeMatricula,
    emailLaboral,
    descripcionPersonal,
    palabraClaveUno,
    palabraClaveDos,
    palabraClaveTres,
    diasHorarios,
    dateDesdeParsed,
    dateHastaParsed,
    efectivo,
    pagosDigitales,
    terminos,
    latitud,
    longitud,
    photoJSONValue
  ) {
    if (!cuitCuil.trim()) {
      alert('Por favor ingrese su cuit/cuil');
      return;
    } else if (!dni.trim()) {
      alert('Por favor ingrese su DNI');
      return;
    } else if (!localidad) {
      alert('Por favor ingresa tu localidad');
      return;
    } else if (!partido) {
      alert('Por favor ingresa tu partido');
      return;
    } else if (terminos == false) {
      alert('Tiene que aceptar los terminos para continuar');
    } else {
      if (!anunciosCountResult) {
        anunciosCountResult = 0;
      } else if (anunciosCountResult === 1) {
        anunciosCountResult = 1;
      } else if (anunciosCountResult === 2) {
        anunciosCountResult = 2;
      } else if (anunciosCountResult === 3) {
        anunciosCountResult = 3;
      }
      let userRef = user.uid;

      let anunciosRef = firebase
        .database()
        .ref(
          'anuncios/' + firebase.auth().currentUser.uid + anunciosCountResult
        )
        .set({
          anuncioId: anunciosCountResult,
          id: user.uid,
          nombre: nombre,
          apellido: apellido,
          emailPersonal: firebase.auth().currentUser.email,
          cuitCuil: cuitCuil,
          dni: dni,
          actividad: actividad,
          telefono: telefono,
          celular: celular,
          localidad: localidad,
          localidadLatitude: localidadLatitude,
          localidadLongitude: localidadLongitude,
          partido: partido,
          partidoLatitude: partidoLatitude,
          partidoLongitude: partidoLongitude,
          local: local,
          empresa: empresa,
          factura: factura,
          direccionDelLocal: direccionDelLocal,
          direccionDelLocalLatitude: direccionDelLocalLatitude,
          direccionDelLocalLongitude: direccionDelLocalLongitude,
          nombreDeLaEmpresa: nombreDeLaEmpresa,
          matricula: matricula,
          numeroDeMatricula: numeroDeMatricula,
          emailLaboral: emailLaboral,
          descripcionPersonal: descripcionPersonal,
          palabraClaveUno,
          palabraClaveDos,
          palabraClaveTres,
          diasHorarios: diasHorarios,
          desde: dateDesdeParsed,
          hasta: dateHastaParsed,
          efectivo: efectivo,
          pagosDigitales: pagosDigitales,
          terminos: terminos,
          latitud: latitud,
          longitud: longitud,
          photoJSONValue: photoJSONValue,
          uuid: uuid,
        })
        .catch(function (error) {
          alert(
            'Hubo un error al subir su anuncio, por favor compruebe sus datos e intentelo nuevamente.'
          );
        });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF6E6' }}>
      <Image
        source={require('../assets/gradients/20x20.png')}
        style={{
          ...Platform.select({
            android: {
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '5%',
            },
            ios: {
              flex: 1,
              position: 'absolute',
              resizeMode: 'cover',
              width: '100%',
              height: '3%',
            },
          }),
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          ...Platform.select({
            android: {
              backgroundColor: 'transparent',
              marginTop: '10%',
              marginLeft: '5%',
            },
            ios: {
              backgroundColor: 'transparent',
              marginTop: '10%',
              marginLeft: '5%',
            },
          }),
        }}>
        <MaterialCommunityIcons
          name='arrow-left'
          color={'#fd5d13'}
          size={32}
          style={{ backgroundColor: 'transparent' }}
        />
      </TouchableOpacity>
      <ScrollView keyboardShouldPersistTaps='always'>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text
            h3
            style={{ color: '#000000', marginTop: 30, marginBottom: 25 }}>
            Foto de Perfil
          </Text>
          {image && (
            <Avatar
              source={{ uri: image }}
              size='xlarge'
              avatarStyle={{ borderRadius: 25 }}
            />
          )}
          {uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} />
            </View>
          ) : (
            <Button
              buttonStyle={{
                marginTop: 10,
                marginLeft: '2%',
                backgroundColor: '#F4743B',
              }}
              title='Subir foto'
              onPress={pickImage}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text
            h3
            style={{ color: '#000000', marginTop: 10, marginBottom: 25 }}>
            Información Básica
          </Text>
          <Input
            placeholder='Nombre *'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(nombre) => setNombre(nombre)}
            value={nombre}
          />
          <Input
            placeholder='Apellido *'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(apellido) => setApellido(apellido)}
            value={apellido}
          />
          <Input
            placeholder='Email Personal'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='email-address'
            autoCapitalize='none'
            disabled
            value={firebase.auth().currentUser.email}
          />
          <Input
            placeholder='DNI *'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='numeric'
            onChangeText={(dni) => setDni(dni)}
            value={dni}
          />
          <Input
            placeholder='CUIL / CUIT *'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='numeric'
            onChangeText={(cuitCuil) => setCuitCuil(cuitCuil)}
            value={cuitCuil}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text
            h3
            style={{ color: '#000000', marginTop: 10, marginBottom: 25 }}>
            Datos de Contacto
          </Text>
          {Platform.os === 'ios' ? (
            <Input
              placeholder='A que te dedicas?*'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 18 }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(actividad) => setActividad(actividad)}
              value={actividad}
              maxLength='15'
            />
          ) : (
            <Input
              placeholder='A que te dedicas? *'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 18 }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(actividad) => setActividad(actividad)}
              value={actividad}
              maxLength={15}
            />
          )}
          <Input
            placeholder='Teléfono'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='phone-pad'
            onChangeText={(telefono) => setTelefono(telefono)}
            value={telefono}
          />
          <Input
            placeholder='Celular'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='phone-pad'
            onChangeText={(celular) => setCelular(celular)}
            value={celular}
          />
          <Input
            placeholder='Email laboral'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(emailLaboral) => setEmailLaboral(emailLaboral)}
            value={emailLaboral}
          />
          <GooglePlacesAutocomplete
            placeholder='Localidad *'
            minLength={2}
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details) => {
              var localidadPlaces = data.description;
              var localidadLatitudePlaces = details.geometry.location.lat;
              var localidadLongitudePlaces = details.geometry.location.lng;
              setLocationFunc(localidadPlaces);
              setLocationLatitudeFunc(localidadLatitudePlaces);
              setLocationLongitudeFunc(localidadLongitudePlaces);
            }}
            query={{
              key: DOTLOCATION,
              language: 'es-419',
            }}
            textInputProps={{ placeholderTextColor: 'black' }}
            styles={{
              textInputContainer: {
                width: '95%',
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
                marginTop: '-2%',
                marginBottom: '5%',
              },
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 18,
                backgroundColor: 'transparent',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            listViewDisplayed={false}
            onFail={(error) => console.error(error)}
          />
          <GooglePlacesAutocomplete
            placeholder='Partido *'
            minLength={2}
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details) => {
              var partidoPlaces = data.description;
              var partidoLatitudePlaces = details.geometry.location.lat;
              var partidoLongitudePlaces = details.geometry.location.lng;
              setPartidoFunc(partidoPlaces);
              setPartidoLatitudeFunc(partidoLatitudePlaces);
              setPartidoLongitudeFunc(partidoLongitudePlaces);
            }}
            query={{
              key: DOTLOCATION,
              language: 'es-419',
            }}
            textInputProps={{ placeholderTextColor: 'black' }}
            styles={{
              textInputContainer: {
                width: '95%',
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
                marginTop: '-2%',
                marginBottom: '5%',
              },
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 18,
                backgroundColor: 'transparent',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            listViewDisplayed={false}
            onFail={(error) => console.error(error)}
          />
          {Platform.os === 'ios' ? (
            <Input
              placeholder='Local (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 18 }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(local) => setLocal(local)}
              value={local}
              maxLength='2'
            />
          ) : (
            <Input
              placeholder='Local (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 18 }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(local) => setLocal(local)}
              value={local}
              maxLength={2}
            />
          )}
          {local.toString().toLocaleLowerCase() === 'si' && (
            <GooglePlacesAutocomplete
              placeholder='Dirección del local'
              minLength={2}
              returnKeyType={'default'}
              fetchDetails={true}
              onPress={(data, details) => {
                var direccionDelLocalPlaces = data.description;
                var direccionDelLocalLatitudePlaces =
                  details.geometry.location.lat;
                var direccionDelLocalLongitudePlaces =
                  details.geometry.location.lng;
                setDireccionDelLocalFunc(direccionDelLocalPlaces);
                setDireccionDelLocalLatitudeFunc(
                  direccionDelLocalLatitudePlaces
                );
                setDireccionDelLocalLongitudeFunc(
                  direccionDelLocalLongitudePlaces
                );
              }}
              query={{
                key: DOTLOCATION,
                language: 'es-419',
              }}
              textInputProps={{ placeholderTextColor: 'black' }}
              styles={{
                textInputContainer: {
                  width: '95%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#000000',
                  marginTop: '-2%',
                  marginBottom: '5%',
                },
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 18,
                  backgroundColor: 'transparent',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              listViewDisplayed={false}
              onFail={(error) => console.error(error)}
            />
          )}
          {Platform.os === 'ios' ? (
            <Input
              placeholder='Empresa (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 18 }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(empresa) => setEmpresa(empresa)}
              value={empresa}
              maxLength='2'
            />
          ) : (
            <Input
              placeholder='Empresa (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 18 }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(empresa) => setEmpresa(empresa)}
              value={empresa}
              maxLength={2}
            />
          )}
          <Input
            placeholder='Nombre de la empresa'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(nombreDeLaEmpresa) =>
              setNombreDeLaEmpresa(nombreDeLaEmpresa)
            }
            value={nombreDeLaEmpresa}
          />
          <Input
            placeholder='Factura (Tipo)'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(factura) => setFactura(factura)}
            value={factura}
          />
          {Platform.os === 'ios' ? (
            <Input
              placeholder='Matrícula (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 18 }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(matricula) => setMatricula(matricula)}
              value={matricula}
              maxLength='2'
            />
          ) : (
            <Input
              placeholder='Matrícula (Si / No)'
              inputStyle={{ color: '#000000' }}
              style={{ color: '#000000', fontSize: 18 }}
              inputContainerStyle={{ borderBottomColor: '#000000' }}
              placeholderTextColor='black'
              onChangeText={(matricula) => setMatricula(matricula)}
              value={matricula}
              maxLength={2}
            />
          )}
          <Input
            placeholder='Número de matrícula'
            inputStyle={{ color: '#000000' }}
            style={{ color: '#000000', fontSize: 18 }}
            inputContainerStyle={{ borderBottomColor: '#000000' }}
            placeholderTextColor='black'
            onChangeText={(numeroDeMatricula) =>
              setNumeroDeMatricula(numeroDeMatricula)
            }
            value={numeroDeMatricula}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text h3 style={{ color: '#000', marginTop: 10, marginBottom: 25 }}>
            Información Adicional
          </Text>
          <Input
            placeholder='Ingrese una descripción personal...'
            placeholderTextColor={'black'}
            style={{
              height: 200,
              width: '80%',
              borderColor: '#000000',
              borderWidth: 1,
              borderRadius: 15,
              color: '#000000',
              margin: 10,
              textAlignVertical: 'top',
              textAlign: 'center',
            }}
            inputStyle={{ color: '#000000' }}
            inputContainerStyle={{ borderBottomWidth: 0, margin: '5%' }}
            placeholderTextColor='black'
            multiline={true}
            onChangeText={(descripcionPersonal) =>
              setDescripcionPersonal(descripcionPersonal)
            }
            paddingTop={20}
            paddingRight={50}
            paddingLeft={50}
            maxLength={150}
            value={descripcionPersonal}
          />
          <Text h4 style={{ color: '#000000' }}>
            Palabras clave
          </Text>
          <View style={{ flexDirection: 'row', marginTop: '10%' }}>
            <Input
              placeholder='#Uno'
              onChangeText={(palabraClaveUno) =>
                setPalabraClaveUno(palabraClaveUno)
              }
              value={palabraClaveUno}
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor='#fd5d13'
              containerStyle={{ width: '35%' }}
              inputStyle={{
                color: '#000000',
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 25,
                padding: 15,
              }}
              style={{
                textAlign: 'center',
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
            />
            <Input
              placeholder='#Dos'
              onChangeText={(palabraClaveDos) =>
                setPalabraClaveDos(palabraClaveDos)
              }
              value={palabraClaveDos}
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor='#fd5d13'
              containerStyle={{ width: '35%' }}
              inputStyle={{
                color: '#000000',
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 25,
                padding: 15,
              }}
              style={{
                textAlign: 'center',
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
            />
            <Input
              placeholder='#Tres'
              onChangeText={(palabraClaveTres) =>
                setPalabraClaveTres(palabraClaveTres)
              }
              value={palabraClaveTres}
              paddingLeft={10}
              paddingRight={10}
              placeholderTextColor='#fd5d13'
              containerStyle={{ width: '35%' }}
              inputStyle={{
                color: '#000000',
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 25,
                padding: 15,
              }}
              style={{
                textAlign: 'center',
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
            />
          </View>
        </View>
        <Text
          h3
          style={{ color: '#000', textAlign: 'center', marginTop: '5%' }}>
          ¿Qué medios de pago aceptas?
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 5,
          }}>
          <MaterialCommunityIcons
            name='cash-usd'
            color={'#000'}
            size={35}
            style={{ marginTop: 20 }}
          />
          <CheckBox
            title='Efectivo'
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              marginTop: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            textStyle={{ color: '#000000' }}
            checkedColor={'#fd5d13'}
            onPress={toggleEfectivo}
            checked={efectivo}
          />
          <MaterialCommunityIcons
            name='credit-card-multiple-outline'
            color={'#000'}
            size={35}
            style={{ marginTop: 20 }}
          />
          <CheckBox
            title='Pagos Digitales'
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              marginTop: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            textStyle={{ color: '#000000' }}
            checkedColor={'#fd5d13'}
            onPress={togglePagosDigitales}
            checked={pagosDigitales}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text h3 style={{ color: '#000', textAlign: 'center' }}>
            Términos y Condiciones & Políticas de Privacidad
          </Text>
          <TouchableOpacity onPress={toggleOverlay}>
            <Text
              style={{
                color: '#000000',
                marginTop: '5%',
                fontSize: 24,
                fontWeight: 'bold',
                color: '#fd5d13',
              }}>
              Leer
            </Text>
          </TouchableOpacity>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>Acá van los términos.</Text>
          </Overlay>
          <CheckBox
            title='Acepto los términos y condiciones y la política de privacidad'
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              marginTop: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            textStyle={{ color: '#000000' }}
            checkedColor={'#fd5d13'}
            onPress={toggleTerminos}
            checked={terminos}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            marginBottom: 30,
          }}>
          <Button
            onPress={() =>
              navigation.navigate('PlanesPage', {
                pendingAnounce: {
                  anuncioId: anunciosCountResult,
                  id: user.uid,
                  nombre: nombre,
                  apellido: apellido,
                  emailPersonal: firebase.auth().currentUser.email,
                  cuitCuil: cuitCuil,
                  dni: dni,
                  actividad: actividad,
                  telefono: telefono,
                  celular: celular,
                  localidad: localidad,
                  localidadLatitude: localidadLatitude,
                  localidadLongitude: localidadLongitude,
                  partido: partido,
                  partidoLatitude: partidoLatitude,
                  partidoLongitude: partidoLongitude,
                  local: local,
                  empresa: empresa,
                  factura: factura,
                  direccionDelLocal: direccionDelLocal,
                  direccionDelLocalLatitude: direccionDelLocalLatitude,
                  direccionDelLocalLongitude: direccionDelLocalLongitude,
                  nombreDeLaEmpresa: nombreDeLaEmpresa,
                  matricula: matricula,
                  numeroDeMatricula: numeroDeMatricula,
                  emailLaboral: emailLaboral,
                  descripcionPersonal: descripcionPersonal,
                  palabraClaveUno: palabraClaveUno,
                  palabraClaveDos: palabraClaveDos,
                  palabraClaveTres: palabraClaveTres,
                  efectivo: efectivo,
                  pagosDigitales: pagosDigitales,
                  terminos: terminos,
                  latitud: latitud,
                  longitud: longitud,
                  uuid: uuid,
                },
              })
            }
            title='Continuar'
            buttonStyle={{
              backgroundColor: '#F4743B',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: 20,
  },
});

export default AnunciatePage;
