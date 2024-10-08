import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import tw from "twrnc";
import { EventData, BookingInfo } from "../../../../type";
import { Color } from "../../../../constants/Color";
import Icon from "react-native-vector-icons/FontAwesome";
import { dateConverter } from "../../../../utils/function/dateConverter";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface EventDetailScreenViewProps {
  eventData: EventData | null;
  loading: boolean;
  address: string | null;
  setShowBookingModal: (show: boolean) => void;
  handleInputChange: (field: keyof BookingInfo, value: string) => void;
  handleBooking: () => void;
  showBookingModal: boolean;
  bookingInfo: BookingInfo;
}

const EventDetailScreenView: React.FC<EventDetailScreenViewProps> = ({
  eventData,
  loading,
  address,
  setShowBookingModal,
  handleInputChange,
  handleBooking,
  showBookingModal,
  bookingInfo,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const calculateTotalPrice = () => {
    const selectedTicket = eventData?.tickets?.find(
      (ticket) => ticket.type === bookingInfo.ticketType
    );
    const price = selectedTicket ? selectedTicket.price : 0;
    const quantity = bookingInfo.ticketQuantity
      ? parseInt(bookingInfo.ticketQuantity)
      : 0;
    return price * quantity;
  };

  return (
    <View style={tw`flex-1 `}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <>
          <ScrollView>
            {eventData?.thumbnail && (
              <Image
                source={{ uri: eventData.thumbnail }}
                style={tw`w-full h-64`}
                resizeMode="cover"
              />
            )}
            <View style={tw`p-4`}>
              {eventData?.eventName && (
                <Text style={tw`text-2xl font-bold mb-2 text-xl`}>
                  {eventData.eventName}
                </Text>
              )}
              <View style={tw`flex-row flex-wrap mb-4`}>
                {eventData?.tags?.map((tag, i) => {
                  return (
                    <View
                      key={i}
                      style={[
                        tw`border rounded-full px-3 py-1 mr-2`,
                        { borderColor: Color.primary },
                      ]}
                    >
                      <Text style={{ color: Color.primary }}>{tag}</Text>
                    </View>
                  );
                })}
              </View>

              <View style={tw`flex-row mb-4`}>
                <View style={tw`flex-1 bg-blue-100 rounded-lg p-3 mr-2`}>
                  <View style={tw`flex-row items-center`}>
                    <Icon name="calendar" size={16} color={Color.primary} />
                    <Text style={tw`text-blue-600 font-semibold ml-2`}>
                      Date
                    </Text>
                  </View>
                  <Text style={tw`text-gray-800 mt-1 font-semibold`}>
                    {eventData?.dateOfEvent &&
                      dateConverter(eventData?.dateOfEvent)}
                  </Text>
                </View>

                <View style={tw`flex-1 bg-green-100 rounded-lg p-3 ml-2`}>
                  <View style={tw`flex-row items-center`}>
                    <Icon name="map-marker" size={16} color={Color.primary} />
                    <Text style={tw`text-green-600 font-semibold ml-2`}>
                      Location
                    </Text>
                  </View>
                  <Text style={tw`text-gray-800 font-semibold mt-1`}>
                    {address || "Location not set"}
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row items-center mb-4`}>
                {eventData?.creator?.profilepict && (
                  <Image
                    source={{ uri: eventData.creator.profilepict }}
                    style={tw`w-12 h-12 rounded-full mr-3`}
                  />
                )}
                <View>
                  <Text style={tw`text-lg font-semibold`}>
                    {eventData?.creator?.username}
                  </Text>
                  <Text style={tw`text-sm text-gray-500`}>Event Organizer</Text>
                </View>
              </View>

              <Text style={tw`font-bold text-xl`}>About Event</Text>

              {eventData?.description && (
                <>
                  <Text
                    style={tw`text-gray-700`}
                    numberOfLines={showFullDescription ? undefined : 3}
                  >
                    {eventData.description}
                  </Text>
                  {eventData.description.length > 100 && (
                    <TouchableOpacity
                      onPress={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                    >
                      <Text style={tw`text-blue-500 mb-2`}>
                        {showFullDescription ? "Show Less" : "Read More"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}

              <Text style={tw`text-xl font-bold mb-2`}>Photo Gallery</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {eventData?.images?.map((photo, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedImage(photo)}
                  >
                    <Image
                      source={{ uri: photo }}
                      style={tw`w-32 h-32 mr-2 rounded-lg`}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={[
                tw`m-4 p-4 rounded-full`,
                { backgroundColor: Color.primary },
              ]}
              onPress={() => setShowBookingModal(true)}
            >
              <Text style={tw`text-white text-center font-bold text-lg`}>
                Book Event
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal
            visible={selectedImage !== null}
            transparent={true}
            onRequestClose={() => setSelectedImage(null)}
          >
            <View
              style={tw`flex-1 bg-black bg-opacity-90 justify-center items-center`}
            >
              <TouchableOpacity
                style={tw`absolute top-10 right-5 z-10`}
                onPress={() => setSelectedImage(null)}
              >
                <Text style={tw`text-white text-xl font-bold`}>Close</Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: screenWidth,
                    height: screenHeight * 0.7,
                    resizeMode: "contain",
                  }}
                />
              )}
            </View>
          </Modal>
          <Modal
            visible={showBookingModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowBookingModal(false)}
          >
            <View
              style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
            >
              <View style={tw`bg-white p-5 rounded-lg w-5/6`}>
                <Text style={tw`text-2xl font-bold mb-4`}>Book Event</Text>

                <TextInput
                  style={tw`border border-gray-300 rounded-lg p-2 mb-2`}
                  placeholder="First Name"
                  value={bookingInfo.firstName}
                  onChangeText={(text) => handleInputChange("firstName", text)}
                />
                <TextInput
                  style={tw`border border-gray-300 rounded-lg p-2 mb-2`}
                  placeholder="Last Name"
                  value={bookingInfo.lastName}
                  onChangeText={(text) => handleInputChange("lastName", text)}
                />
                <TextInput
                  style={tw`border border-gray-300 rounded-lg p-2 mb-2`}
                  placeholder="Phone Number"
                  value={bookingInfo.phoneNumber}
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={tw`border border-gray-300 rounded-lg p-2 mb-2`}
                  placeholder="Email"
                  value={bookingInfo.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  keyboardType="email-address"
                />

                <View style={tw`border border-gray-300 rounded-lg mb-2`}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select Ticket Type",
                      value: null,
                    }}
                    value={bookingInfo.ticketType}
                    onValueChange={(itemValue) =>
                      handleInputChange("ticketType", itemValue)
                    }
                    items={
                      eventData?.tickets?.map((ticket) => ({
                        label: `${ticket.type} - Rp.${ticket.price}`,
                        value: ticket.type,
                      })) || []
                    }
                  />
                </View>

                <View style={tw`border border-gray-300 rounded-lg mb-4`}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select Quantity",
                      value: null,
                    }}
                    value={bookingInfo.ticketQuantity}
                    onValueChange={(itemValue) =>
                      handleInputChange("ticketQuantity", itemValue)
                    }
                    items={[...Array(10)].map((_, i) => ({
                      label: `${i + 1}`,
                      value: `${i + 1}`,
                    }))}
                  />
                </View>

                {/* Total Price Section */}
                <View style={tw`mb-4`}>
                  <Text style={tw`text-lg font-semibold`}>
                    Total: Rp.{calculateTotalPrice()}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    tw`p-3 rounded-lg mb-2`,
                    { backgroundColor: Color.primary },
                  ]}
                  onPress={handleBooking}
                >
                  <Text style={tw`text-white text-center font-bold`}>
                    Confirm Booking
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`p-3 rounded-lg bg-red-500`}
                  onPress={() => setShowBookingModal(false)}
                >
                  <Text style={tw`text-white text-center font-bold`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default EventDetailScreenView;
