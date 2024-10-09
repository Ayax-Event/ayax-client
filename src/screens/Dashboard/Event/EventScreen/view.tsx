import React, { useState, useCallback } from "react";
import {
  FlatList,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import ProfileHeader from "../../../../components/ProfileHeader";
import tw from "twrnc";
import { Color } from "../../../../constants/Color";
import EventCard from "../../../../components/EventCard";
import { Event, Category } from "../../../../types";
import EventCardPlaceholder from "../../../../components/EventCardPlaceholder";
import { SafeAreaView } from "react-native-safe-area-context";
interface EventScreenViewProps {
  events: Event[];
  fetchMore: () => void;
  isLoading: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  user: any; // Replace 'any' with the appropriate user type if available
  categories: Category[];
  handleCategorySelect: (categoryName: string, categoryId: string) => void;
  selectedCategory: string | null;
}

const EventScreenView: React.FC<EventScreenViewProps> = ({
  events,
  fetchMore,
  isLoading,
  onRefresh,
  isRefreshing,
  user,
  categories,
  handleCategorySelect,
  selectedCategory,
}) => {
  const renderCategories = useCallback(
    ({ item }) => {
      const isSelected = item.category === selectedCategory;

      return (
        <TouchableOpacity
          onPress={() => handleCategorySelect(item.category, item._id)}
          style={[
            tw`p-3 rounded-lg m-2`,
            isSelected
              ? { backgroundColor: Color.bg }
              : { backgroundColor: Color.primary },
          ]}
        >
          <Text style={tw`font-semibold text-white`}>{item.category}</Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory]
  );

  const renderHorizontalItem = ({ item }: { item: Event }) => (
    <EventCard
      userId={item.userId}
      eventId={item._id}
      eventImage={item.thumbnail}
      eventName={item.eventName}
      eventDate={item.dateOfEvent}
      eventLocation={item.location || "Location not available"}
      isHorizontal={true}
    />
  );

  const renderVerticalItem = ({ item }: { item: Event }) => (
    <View style={tw`w-1/2 p-1`}>
      <EventCard
        userId={item.userId}
        eventId={item._id}
        eventImage={item.thumbnail}
        eventName={item.eventName}
        eventDate={item.dateOfEvent}
        eventLocation={item.location || "Location not available"}
        isHorizontal={false}
      />
    </View>
  );

  const renderSectionHeader = (title: string) => (
    <View style={tw`flex-row justify-between mt-4 mb-2`}>
      <Text style={tw`font-semibold text-lg`}>{title}</Text>
      <Text style={tw`font-semibold text-base text-[${Color.primary}]`}>
        See All
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <ProfileHeader name={user.name} profilePicture={user.profilepict} />
      {isLoading ? (
        <EventCardPlaceholder />
      ) : (
        <>
          {renderSectionHeader("Featured")}
          <FlatList
            data={events.slice(0, 5)}
            renderItem={renderHorizontalItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={tw``}
          />
          <FlatList
            data={categories}
            renderItem={renderCategories}
            horizontal={true}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={tw``}
            showsHorizontalScrollIndicator={false}
          />
          {renderSectionHeader("Popular Events")}
        </>
      )}
    </View>
  );

  return (
    <View style={tw`p-2`}>
      <FlatList
        data={events}
        renderItem={renderVerticalItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          isLoading ? (
            <View style={tw`flex flex-row flex-wrap`}>
              <View style={tw`w-1/2 p-1`}>
                <EventCardPlaceholder isHorizontal={false} />
              </View>
              <View style={tw`w-1/2 p-1`}>
                <EventCardPlaceholder isHorizontal={false} />
              </View>
              <View style={tw`w-1/2 p-1`}>
                <EventCardPlaceholder isHorizontal={false} />
              </View>
              <View style={tw`w-1/2 p-1`}>
                <EventCardPlaceholder isHorizontal={false} />
              </View>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default EventScreenView;
