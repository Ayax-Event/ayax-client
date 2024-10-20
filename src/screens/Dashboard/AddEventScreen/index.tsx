import React, { useEffect, useState } from "react";
import AddEventScreenView from "./view";
import { getAllCategory, postEvent } from "../../../utils/api";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const AddEventScreen = () => {
  const [categories, setCategories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventData, setEventData] = useState({
    eventName: "",
    categoryId: "",
    description: "",
    location: {},
    tags: [],
    thumbnail: {},
    images: [],
    dateOfEvent: "",
    ticketInfo: [
      {
        type: "",
        price: "",
        stock: 0,
      },
    ],
  });
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [isLoading, setIsLoading] = useState(false);
  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (field, value, index = null) => {
    if (index !== null && Array.isArray(eventData[field])) {
      const newArray = [...eventData[field]];
      newArray[index] = value;
      setEventData({ ...eventData, [field]: newArray });
    } else {
      setEventData({ ...eventData, [field]: value });
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = eventData.images.filter((_, i) => i !== index);
    setEventData({ ...eventData, images: newImages });
  };

  const showImagePickerOptions = async (field: "thumbnail" | "images") => {
    Alert.alert(
      "Choose Image Source",
      "Would you like to take a photo or choose from your gallery?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Take Photo",
          onPress: () => launchCamera(field),
        },
        {
          text: "Choose from Gallery",
          onPress: () => launchImageLibrary(field),
        },
      ]
    );
  };

  const launchCamera = async (field: "thumbnail" | "images") => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Camera access is required to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: field === "thumbnail" ? [4, 3] : [1, 1],
      base64: true,
      quality: 0.3,
    });

    handleImagePickerResult(result, field);
  };

  const launchImageLibrary = async (field: "thumbnail" | "images") => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Gallery access is required to choose photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: field === "thumbnail" ? [4, 3] : [1, 1],
      base64: true,
      quality: 0.3,
    });

    handleImagePickerResult(result, field);
  };

  const handleImagePickerResult = (
    result: ImagePicker.ImagePickerResult,
    field: "thumbnail" | "images"
  ) => {
    if (!result.canceled) {
      if (field === "thumbnail") {
        setEventData({ ...eventData, thumbnail: result.assets[0] });
      } else if (field === "images") {
        setEventData({
          ...eventData,
          images: [...eventData.images, result.assets[0]],
        });
      }
    }
  };

  const handleAddTicketType = () => {
    setEventData((prevData) => ({
      ...prevData,
      ticketInfo: [...prevData.ticketInfo, { type: "", price: "", stock: "" }],
    }));
  };

  const handleRemoveTicketType = (index) => {
    const newTicketInfo = eventData.ticketInfo.filter((_, i) => i !== index);
    setEventData({ ...eventData, ticketInfo: newTicketInfo });
  };

  const handleTicketInputChange = (index, field, value) => {
    setEventData((prevData) => ({
      ...prevData,
      ticketInfo: prevData.ticketInfo.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      ),
    }));
  };

  const handleAddTag = (tag) => {
    if (tag && !eventData.tags.includes(tag)) {
      setEventData({ ...eventData, tags: [...eventData.tags, tag] });
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = eventData.tags.filter((_, i) => i !== index);
    setEventData({ ...eventData, tags: newTags });
  };

  const handleImagePicker = (field: "thumbnail" | "images") => {
    showImagePickerOptions(field);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventData({ ...eventData, dateOfEvent: selectedDate.toISOString() });
    }
  };

  const fetchPostEvent = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("eventName", eventData.eventName);
      formData.append("categoryId", eventData.categoryId);
      formData.append("description", eventData.description);
      formData.append("dateOfEvent", eventData.dateOfEvent);
      formData.append("longtitude", selectedLocation.longitude.toString());
      formData.append("latitude", selectedLocation.latitude.toString());
      formData.append("tags", JSON.stringify(eventData.tags));
      formData.append("tickets", JSON.stringify(eventData.ticketInfo));

      if (eventData.thumbnail.uri) {
        formData.append(
          "thumbnail",
          `data:${eventData.thumbnail.mimeType};base64,${eventData.thumbnail.base64}`
        );
      }

      eventData.images.forEach((img, index) => {
        if (img.uri) {
          formData.append(
            `images`,
            `data:${img.mimeType};base64,${img.base64}`
          );
        }
      });

      await postEvent(formData);

      setEventData({
        eventName: "",
        categoryId: "",
        description: "",
        location: {},
        tags: [],
        thumbnail: {},
        images: [],
        dateOfEvent: "",
        ticketInfo: [
          {
            type: "",
            price: "",
            stock: "",
          },
        ],
      });
    } catch (error) {
      Alert.alert(
        "Error uplouding form",
        "Unknown error has occur, please  try again later. If the error persists, please contact developer at whatsapp: +62 877-2055-9516"
      );
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
      setFormTouched(false);
    }
  };

  const handleSubmit = () => {
    setFormTouched(true);
    console.log("masuk submit");
    let validationErrors = {};

    if (!eventData.eventName) {
      validationErrors.eventName = "Event name is required";
    }

    if (!eventData.categoryId) {
      validationErrors.categoryId = "Category ID is required";
    }

    if (!eventData.description) {
      validationErrors.description = "Description is required";
    }
    console.log(selectedLocation, "<<<<<<");
    if (
      !selectedLocation ||
      !selectedLocation.latitude ||
      !selectedLocation.longitude
    ) {
      validationErrors.location =
        "Location (latitude and longitude) is required";
    }

    if (!eventData.thumbnail || !eventData.thumbnail.uri) {
      validationErrors.thumbnail = "Thumbnail is required";
    }

    if (!eventData.images.length) {
      validationErrors.images = "At least one image is required";
    }

    if (!eventData.dateOfEvent) {
      validationErrors.dateOfEvent = "Date of the event is required";
    }

    const ticketErrors = eventData.ticketInfo.map((ticket, index) => {
      let error = {};
      if (!ticket.type) {
        error.type = `Ticket type is required for ticket ${index + 1}`;
      }
      if (!ticket.price) {
        error.price = `Ticket price is required for ticket ${index + 1}`;
      }
      if (!ticket.stock) {
        error.stock = `Ticket stock is required for ticket ${index + 1}`;
      }
      return error;
    });

    if (ticketErrors.some((error) => Object.keys(error).length > 0)) {
      validationErrors.ticketInfo = ticketErrors;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetchPostEvent();
  };

  return (
    <AddEventScreenView
      eventData={eventData}
      handleInputChange={handleInputChange}
      handleAddTicketType={handleAddTicketType}
      handleRemoveTicketType={handleRemoveTicketType}
      handleTicketInputChange={handleTicketInputChange}
      handleAddTag={handleAddTag}
      handleRemoveTag={handleRemoveTag}
      handleSubmit={handleSubmit}
      categories={categories}
      handleImagePicker={handleImagePicker}
      handleDateChange={handleDateChange}
      showDatePicker={showDatePicker}
      setShowDatePicker={setShowDatePicker}
      handleRemoveImage={handleRemoveImage}
      selectedLocation={selectedLocation}
      setSelectedLocation={setSelectedLocation}
      isLoading={isLoading}
      errors={errors}
      formTouched={formTouched}
    />
  );
};

export default AddEventScreen;
