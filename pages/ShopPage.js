import React from "react";
import {
  Alert,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as RootNavigation from "../RootNavigation.js";

import { Card, Text } from "react-native-elements";

class ShopPage extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Card>
          <Text style={{ textAlign: "center", marginTop: 25 }} h3>
            ¡Hola!
          </Text>
          <Text style={{ margin: 20, textAlign: "justify" }} h3>
            En breve vas a poder disfrutar de esta sección.
          </Text>
          <TouchableOpacity
            onPress={() => RootNavigation.navigate("OnboardingPage")}
          >
            <Text
              style={{
                ...Platform.select({
                  android: {
                    color: "orange",
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 20,
                  },
                  ios: {
                    color: "orange",
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 20,
                  }
                })
              }}
            >
              Atrás
            </Text>
          </TouchableOpacity>
        </Card>
      </SafeAreaView>
    );
  }
}
export default ShopPage;
