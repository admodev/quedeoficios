import React, { useState, setState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import * as RootNavigation from "../RootNavigation.js";
import { StackActions } from "@react-navigation/native";
import CardsUsuarios from "./Cards";
import { concat } from "react-native-reanimated";

let itm = [];

const AnuncioSeleccionado = ({ route }) => {
  let id = route.params.id;
  let items = [];
  firebase
    .database()
    .ref("anuncios/")
    .child(id)
    .on("value", (snap) => {
      snap.forEach((child) => {
        items.push({
          nombre: child.val().nombre,
          apellido: child.val().apellido,
          actividad: child.val().actividad,
          emailPersonal: child.val().emailPersonal,
        });
      });
      itm = items;
      itm.forEach((itms) => {
        console.log("title*" + itms.title);
      });
    });
  return (
    <Card
      style={styles.card}
      containerStyle={{
        padding: 0,
        borderRadius: 15,
        backgroundColor: "transparent",
        borderWidth: 0,
      }}
    >
      {items.map((u, i) => {
        return (
          <View key={i} style={{ margin: 25, backgroundColor: "transparent" }}>
            <Image
              source={require("../assets/patron.jpg")}
              style={{
                flex: 1,
                position: "absolute",
                resizeMode: "cover",
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
            />
            <Image
              source={require("../assets/gradients/20x20.png")}
              style={{
                flex: 1,
                position: "absolute",
                resizeMode: "cover",
                width: "100%",
                height: "100%",
                opacity: 0.9,
                borderRadius: 10,
              }}
            />
            <Card.Image
              source={{ uri: "https://picsum.photos/200" }}
              style={{
                borderRadius: 50,
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 60,
                marginRight: 60,
              }}
            />
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                fontSize: 20,
                color: "#fff",
              }}
            >
              {u.nombre} {u.apellido}
            </Text>
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 10,
                textAlign: "center",
                fontSize: 20,
                color: "#fff",
              }}
            >
              {u.actividad}
            </Text>
            <TouchableOpacity
              onPress={() => RootNavigation.navigate("OnboardingPage")}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: "transparent",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                Previsualizar
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  card: {
    marginTop: 50,
    backgroundColor: "#483D8B",
    shadowColor: "#000",
    borderRadius: 15,
    paddingTop: -5,
    paddingBottom: 2,
    marginBottom: 100,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default AnuncioSeleccionado;