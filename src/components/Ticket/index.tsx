import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import tailwind from "twrnc";
const tw = tailwind;

const Ticket = ({ ticket }) => {
  const { buyerDetail, ticket: ticketInfo, event, price } = ticket;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.ticketContainer}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <View>
          <Text style={tw`text-xl font-bold text-gray-800`}>
            {event.eventName}
          </Text>
          <Text style={tw`text-sm text-gray-600`}>
            {new Date(event.dateOfEvent).toLocaleDateString()}
          </Text>
        </View>
        <Image
          source={{ uri: event.thumbnail }}
          style={tw`w-16 h-16 rounded-full`}
        />
      </View>
      <View style={styles.dashedLine} />

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold text-gray-800`}>
          {buyerDetail.firstName} {buyerDetail.lastName}
        </Text>
        <Text style={tw`text-sm text-gray-600`}>{buyerDetail.email}</Text>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold text-gray-800`}>Status</Text>
        <Text
          style={[
            tw`text-sm`,
            ticket.status === "paid"
              ? tw`text-green-600`
              : ticket.status === "pending"
              ? tw`text-yellow-500`
              : tw`text-red-600`,
          ]}
        >
          {ticket.status === "paid"
            ? "Paid"
            : ticket.status === "pending"
            ? "Pending"
            : "Expired"}
        </Text>
      </View>

      <View style={tw`flex-row justify-between mb-4`}>
        <View>
          <Text style={tw`text-sm font-medium text-gray-600`}>Ticket Type</Text>
          <Text style={tw`text-base text-gray-800`}>{ticketInfo.type}</Text>
        </View>
        <View>
          <Text style={tw`text-sm font-medium text-gray-600`}>Quantity</Text>
          <Text style={tw`text-base text-gray-800`}>{ticketInfo.quantity}</Text>
        </View>
        <View>
          <Text style={tw`text-sm font-medium text-gray-600`}>Price</Text>
          <Text style={tw`text-base text-gray-800`}>
            Rp.{(price / 100).toFixed(2)}
          </Text>
        </View>
      </View>
      {ticket.status === "paid" && (
        <>
          <View style={styles.dashedLine} />

          <View style={tw`items-center mt-4`}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png",
                }}
                style={tw`w-32 h-32`}
              />
            </TouchableOpacity>
            <Text style={tw`mt-2 text-xs text-gray-500`}>
              Scan QR code for entry
            </Text>
          </View>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png",
              }}
              style={styles.largeQR}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={tw`mt-4 border-t border-gray-200 pt-2`}>
        <Text style={tw`text-xs text-gray-500`}>
          Ticket ID: {ticketInfo.ticketId}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    overflow: "hidden",
  },
  dashedLine: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  largeQR: {
    width: 200,
    height: 200,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Ticket;
