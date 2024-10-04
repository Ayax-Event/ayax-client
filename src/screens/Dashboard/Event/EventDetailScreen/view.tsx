import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import { Color } from "../../../../constants/Color";
import Icon from "react-native-vector-icons/FontAwesome";
import { dateConverter } from "../../../../utils/function/dateConverter";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const EventDetailScreenView: React.FC = ({ eventData = {}, loading }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

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
                    {eventData?.location || "Location not set"}
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
        </>
      )}
    </View>
  );
};

export default EventDetailScreenView;
