import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { Color } from "../../../constants/Color";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EventData,
  Category,
  Location as LocationType,
} from "../../../../types"; // Adjust the import path as needed

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface AddEventScreenViewProps {
  eventData: EventData;
  handleInputChange: (field: string, value: any, index?: number | null) => void;
  handleAddTicketType: () => void;
  handleRemoveTicketType: (index: number) => void;
  handleTicketInputChange: (index: number, field: string, value: any) => void;
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (index: number) => void;
  handleSubmit: () => void;
  categories: Category[];
  handleImagePicker: (field: string) => void;
  handleDateChange: (event: any, date?: Date) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  setSelectedLocation: (location: LocationType) => void;
  selectedLocation: LocationType;
  isLoading: boolean;
  errors: { [key: string]: string | null };
  formTouched: boolean;
}

const AddEventScreenView: React.FC<AddEventScreenViewProps> = ({
  eventData,
  handleInputChange,
  handleAddTicketType,
  handleRemoveTicketType,
  handleTicketInputChange,
  handleAddTag,
  handleRemoveTag,
  handleSubmit,
  categories,
  handleImagePicker,
  handleDateChange,
  showDatePicker,
  setShowDatePicker,
  setSelectedLocation,
  selectedLocation,
  isLoading,
  errors,
  formTouched,
}) => {
  const [newTag, setNewTag] = useState<string>("");
  const [locationAddress, setLocationAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] =
    useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      let address = response[0];
      const fullAddress = `${address.street || ""}, ${address.city || ""}, ${
        address.region || ""
      }, ${address.country || ""}`;
      setLocationAddress(fullAddress);
      handleInputChange("location", fullAddress);
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    getAddressFromCoords(latitude, longitude);
  };
  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=${process.env.EXPO_GOOGLE_MAPS_API_KEY}`
      );
      const json = await response.json();
      if (json.results && json.results.length > 0) {
        const location = json.results[0].geometry.location;
        setSelectedLocation({
          latitude: location.lat,
          longitude: location.lng,
        });
        getAddressFromCoords(location.lat, location.lng);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const getCurrentLocation = async () => {
    setIsGettingCurrentLocation(true);
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setSelectedLocation({ latitude, longitude });
      getAddressFromCoords(latitude, longitude);
    } catch (error) {
      console.error("Error getting current location:", error);
    } finally {
      setIsGettingCurrentLocation(false);
    }
  };

  const inputStyle = tw`bg-white rounded-2xl px-4 py-3.5 border border-gray-200 text-base font-medium text-gray-700 shadow-sm`;
  const labelStyle = tw`text-lg font-semibold text-gray-700 mb-2`;
  const sectionStyle = tw`mb-6`;
  const errorStyle = tw`text-red-500 text-sm mt-2`;
  const buttonStyle = tw`bg-[${Color.primary}] rounded-xl py-3.5 px-4 shadow-md`;
  const buttonTextStyle = tw`text-white text-center font-bold text-base`;

  return (
    <View style={tw`flex-1 p-4`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event Name Input */}
        <View style={sectionStyle}>
          <Text style={labelStyle}>Event Name</Text>
          <TextInput
            style={[
              inputStyle,
              formTouched && errors.eventName && tw`border-red-500`,
            ]}
            value={eventData.eventName}
            onChangeText={(text) => handleInputChange("eventName", text)}
            placeholder="Enter an exciting event name"
          />
          {formTouched && errors.eventName && (
            <Text style={errorStyle}>{errors.eventName}</Text>
          )}
        </View>

        {/* Category Picker */}
        <View style={sectionStyle}>
          <Text style={labelStyle}>Category</Text>
          <View style={tw`bg-white rounded-2xl shadow-sm`}>
            <RNPickerSelect
              onValueChange={(itemValue) =>
                handleInputChange("categoryId", itemValue)
              }
              items={categories.map((category) => ({
                label: category.category,
                value: category._id,
              }))}
              style={{
                inputIOS: tw`px-4 py-3.5 text-base font-medium text-gray-700`,
                inputAndroid: tw`px-4 py-3.5 text-base font-medium text-gray-700`,
              }}
              placeholder={{
                label: "Select a category",
                value: null,
                color: "#9CA3AF",
              }}
              value={eventData.categoryId}
            />
          </View>
          {formTouched && errors.categoryId && (
            <Text style={errorStyle}>{errors.categoryId}</Text>
          )}
        </View>

        {/* Description Input */}
        <View style={sectionStyle}>
          <Text style={labelStyle}>Description</Text>
          <TextInput
            style={[inputStyle, tw`min-h-[120px]`]}
            value={eventData.description}
            onChangeText={(text) => handleInputChange("description", text)}
            placeholder="Describe your amazing event"
            multiline
            textAlignVertical="top"
          />
          {formTouched && errors.description && (
            <Text style={errorStyle}>{errors.description}</Text>
          )}
        </View>

        {/* Location Section */}
        <View style={sectionStyle}>
          <Text style={labelStyle}>Event Location</Text>
          <View style={tw`flex-row items-center mb-4`}>
            <TextInput
              style={[inputStyle, tw`flex-1 mr-2`]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search for a location"
            />
            <TouchableOpacity
              style={[buttonStyle, tw`w-14 h-14 items-center justify-center`]}
              onPress={handleSearchLocation}
              disabled={isSearching}
            >
              {isSearching ? (
                <ActivityIndicator color="white" />
              ) : (
                <Ionicons name="search" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>

          <View style={tw`rounded-2xl overflow-hidden shadow-lg`}>
            <MapView
              style={{ width: "100%", height: 300 }}
              region={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              onPress={handleMapPress}
            >
              <Marker
                coordinate={selectedLocation}
                draggable
                onDragEnd={(e) => handleMapPress(e)}
              />
            </MapView>

            <TouchableOpacity
              style={[
                tw`absolute top-2 right-2 p-3 rounded-full shadow-md`,
                { backgroundColor: Color.primary },
              ]}
              onPress={getCurrentLocation}
              disabled={isGettingCurrentLocation}
            >
              {isGettingCurrentLocation ? (
                <ActivityIndicator color="white" />
              ) : (
                <Ionicons name="locate" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>

          {/* Selected Location Address Display */}
          {locationAddress && (
            <View style={tw`mt-4 p-3 bg-gray-50 rounded-lg`}>
              <Text style={tw`text-sm font-medium text-gray-700`}>
                Selected Address:
              </Text>
              <Text style={tw`text-base text-gray-800 mt-1`}>
                {locationAddress}
              </Text>
            </View>
          )}
          {formTouched && errors.location && (
            <Text style={errorStyle}>{errors.location}</Text>
          )}
        </View>

        {/* Tags Section */}
        <View style={sectionStyle}>
          <Text style={labelStyle}>Tags</Text>
          <View style={tw`flex-row flex-wrap mb-3`}>
            {eventData.tags.map((tag, index) => (
              <View
                key={tag + index}
                style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2`}
              >
                <Text style={tw`text-gray-700 mr-1`}>{tag}</Text>
                <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={Color.primary}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={tw`flex-row items-center`}>
            <TextInput
              style={[inputStyle, tw`flex-1 mr-2`]}
              placeholder="Add a tag"
              onChangeText={setNewTag}
              onSubmitEditing={({ nativeEvent: { text } }) =>
                handleAddTag(text)
              }
            />
            <TouchableOpacity
              style={[buttonStyle, tw`w-14 h-14 items-center justify-center`]}
              onPress={() => handleAddTag(newTag)}
            >
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Thumbnail Section */}
        <View style={sectionStyle}>
          <Text style={labelStyle}>Event Thumbnail</Text>
          <TouchableOpacity
            style={[inputStyle, tw`flex-row items-center justify-center`]}
            onPress={() => handleImagePicker("thumbnail")}
          >
            <Ionicons name="image-outline" size={24} color={Color.primary} />
            <Text style={tw`ml-2 text-base font-medium text-gray-700`}>
              {eventData.thumbnail.uri
                ? "Change Thumbnail"
                : "Select Thumbnail"}
            </Text>
          </TouchableOpacity>
          {eventData.thumbnail.uri && (
            <Image
              source={{ uri: eventData.thumbnail.uri }}
              style={tw`w-full h-48 mt-2 rounded-xl`}
              resizeMode="cover"
            />
          )}
          {formTouched && errors.thumbnail && (
            <Text style={tw`text-red-500 mt-2`}>{errors.thumbnail}</Text>
          )}
        </View>

        {/* Event Images Section */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg mb-2 font-bold text-gray-600`}>
            Event Images
          </Text>

          {eventData.images.length > 0 &&
            eventData.images.map((image, index) => (
              <View key={`${image.uri}-${index}`} style={tw`mb-2`}>
                <Image
                  source={{ uri: image.uri }}
                  style={tw`w-full h-40 mt-2 rounded-lg`}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={tw`mt-2 bg-red-500 rounded-lg p-2`}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Text style={tw`text-white text-center`}>Remove Image</Text>
                </TouchableOpacity>
              </View>
            ))}

          {formTouched && errors.images && (
            <Text style={tw`text-red-500 mt-2`}>{errors.images}</Text>
          )}

          {eventData.images.length < 10 && (
            <TouchableOpacity
              style={[
                tw`rounded-lg p-3 mt-2`,
                { backgroundColor: Color.primary },
              ]}
              onPress={() => handleImagePicker("images")}
            >
              <Text style={tw`text-white text-center font-bold`}>
                Add Event Image
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Date Section */}
        <View style={sectionStyle}>
          <Text style={labelStyle}>Date of Event</Text>
          <TouchableOpacity
            style={[inputStyle, tw`flex-row items-center justify-between`]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={tw`text-base font-medium text-gray-700`}>
              {eventData.dateOfEvent
                ? new Date(eventData.dateOfEvent).toLocaleDateString()
                : "Select Date"}
            </Text>
            <Ionicons name="calendar-outline" size={24} color={Color.primary} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={
                eventData.dateOfEvent
                  ? new Date(eventData.dateOfEvent)
                  : new Date()
              }
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {formTouched && errors.dateOfEvent && (
            <Text style={tw`text-red-500 mt-2`}>{errors.dateOfEvent}</Text>
          )}
        </View>

        {/* Ticket Information */}
        <View style={sectionStyle}>
          <Text style={labelStyle}>Ticket Information</Text>
          {eventData.ticketInfo.map((ticket, index) => (
            <View
              key={index}
              style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`}
            >
              <View style={tw`flex-row items-center justify-between`}>
                <TextInput
                  style={[inputStyle, tw`flex-1 mr-2`]}
                  value={ticket.type || ""}
                  onChangeText={(text) =>
                    handleTicketInputChange(index, "type", text)
                  }
                  placeholder="Type"
                />
                <TextInput
                  style={[inputStyle, tw`flex-1 mr-2`]}
                  value={ticket.price?.toString() || ""}
                  onChangeText={(text) =>
                    handleTicketInputChange(index, "price", text)
                  }
                  placeholder="Price"
                  keyboardType="numeric"
                />
                <TextInput
                  style={[inputStyle, tw`flex-1 mr-2`]}
                  value={ticket.stock?.toString() || ""}
                  onChangeText={(text) =>
                    handleTicketInputChange(index, "stock", text)
                  }
                  placeholder="Stock"
                  keyboardType="numeric"
                />
                <TouchableOpacity onPress={() => handleRemoveTicketType(index)}>
                  <Ionicons name="trash-outline" size={24} color="#FF4444" />
                </TouchableOpacity>
              </View>
              {errors.ticketInfo && errors.ticketInfo[index] && (
                <Text style={tw`text-red-500 mt-2`}>
                  {errors.ticketInfo[index].type}
                </Text>
              )}
            </View>
          ))}
          <TouchableOpacity style={buttonStyle} onPress={handleAddTicketType}>
            <Text style={buttonTextStyle}>Add Ticket Type</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[buttonStyle, tw`mt-6`]}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={[buttonTextStyle, tw`text-lg`]}>Create Event</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddEventScreenView;
