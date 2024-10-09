import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../../../constants/Color";

const MenuItem = ({ icon, title, onPress = () => {} }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="black" style={styles.menuIcon} />
    <Text style={styles.menuText}>{title}</Text>
    <Ionicons
      name="chevron-forward"
      size={24}
      color="black"
      style={styles.menuArrow}
    />
  </TouchableOpacity>
);

export default function ProfileScreenView({
  user,
  handleLogout,
  handleEditProfilePicture,
  isLoading,
}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: user.profilepict,
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfilePicture}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="pencil-outline" size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.name}>{user.username}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>27</Text>
          <Text style={styles.statLabel}>Event</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>585K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>57</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem icon="person-outline" title="Profile" />
        <MenuItem icon="calendar-outline" title="Manage Events" />
        <MenuItem icon="chatbubbles-outline" title="Message Center" />
        <MenuItem icon="notifications-outline" title="Notification" />
        <MenuItem icon="ticket-outline" title="Ticket Issues" />
        <MenuItem icon="exit-outline" title="Log Out" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: Color.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
  menuArrow: {
    opacity: 0.3,
  },
});
