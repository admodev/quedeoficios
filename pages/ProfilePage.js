import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ProfilePage = ({ navigation }) => {
    const cerrarSesion = () => {
        firebase.auth().signOut()
            .catch(function (err) {
                alert(err);
            }); 
    }

    const userObserver = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            window.user = user;
        });
        return user;
    }

    const resetPassword = () => {
        currentUser.sendPasswordResetEmail(user.email);
    }

    const uploadImage = async uri => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const ref = firebase.storage().ref('avatar').child(uuid.v4());
            const task = ref.put(blob);
            return new Promise((resolve, reject) => {
                task.on('state_changed', () => { }, reject,
                    () => resolve(task.snapshot.downloadURL));
            });
        } catch (err) {
            console.log('uploadImage error: ' + err.message);
        }
    }

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  let [flatListItems, setFlatListItems] = useState([]);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: "100%", backgroundColor: "#808080" }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: "white", padding: 20 }}
      >
        <Text>Id: {item.user_id}</Text>
        <Text>Name: {item.user_name}</Text>
        <Text>Contact: {item.user_contact}</Text>
        <Text>Address: {item.user_address}</Text>
      </View>
    );
  };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={require("../assets/gradients/20x20.png")}
                    style={{
                        flex: 1,
                        position: "absolute",
                        resizeMode: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} 
                <Button title="Pick an image from camera roll" onPress={uploadImage} />
                <ScrollView
                    style={{
                        flex: 1,
                        marginTop: 10,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containerBottom}>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginBottom: 10,
                                    fontSize: 18,
                                    color: "#fff",
                                }}
                            >
                                Cambiar contraseña
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("ChatPage")}>
                            <Text
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginBottom: 10,
                                    fontSize: 18,
                                    color: "#fff",
                                }}
                            >
                                Consultas Hechas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("ChatPage")}>
                            <Text
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginBottom: 10,
                                    fontSize: 18,
                                    color: "#fff",
                                }}
                            >
                                Consultas Recibidas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginBottom: 10,
                                    fontSize: 18,
                                    color: "#fff",
                                }}
                            >
                                Mis Comentarios
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginBottom: 10,
                                    fontSize: 18,
                                    color: "#fff",
                                }}
                            >
                                Mis Favoritos
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginBottom: 10,
                                    fontSize: 18,
                                    color: "#fff",
                                }}
                            >
                                Mis Recomendaciones
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("AnunciatePage")}
                        >
                            <Text
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginBottom: 10,
                                    fontSize: 18,
                                    color: "#fff",
                                }}
                            >
                                Anunciarme
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 10,
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: 25,
                        }}
                    >
                        <Button
                            buttonStyle={{
                                backgroundColor: "orange",
                                width: 300,
                                height: 50,
                                marginTop: 10,
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                            title="Cerrar Sesión"
                            onPress={resetPassword}
                        />
                        <Button
                            buttonStyle={{
                                backgroundColor: "orange",
                                width: 300,
                                height: 50,
                                marginTop: 10,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                            title="Presiona para enviar una notificación"
                            onPress={async () => {
                                await schedulePushNotification();
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text>{userObserver}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={flatListItems}
                        ItemSeparatorComponent={listViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Tienes una nueva notificación de QuedeOficios!",
      body: "Ingresa y echale un vistazo.",
      data: { data: "Nuevo Mensaje" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Platform.OS === "ios") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      shouldPlaySound: true,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const requestPermissionForNotifications = () => {
  registerForPushNotificationsAsync();
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export default ProfilePage;
