import { FC } from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import tw from "twrnc";
import { ProfileHeaderProps } from "../../type";
import { getTimeOfDayGreeting } from "../../utils/function/getTimeofDay";

const ProfileHeader: FC<ProfileHeaderProps> = ({
  name,

  profilePicture,
}) => {
  return (
    <View style={tw`flex-row items-center justify-between bg-white`}>
      <View style={tw`flex-row items-center`}>
        <Image
          source={{ uri: profilePicture }}
          style={tw`w-15 h-15 rounded-full mr-3`}
        />
        <View>
          <Text style={tw`text-base font-normal`}>
            Good {getTimeOfDayGreeting()}
          </Text>
          <Text style={tw`text-xl font-bold`}>{name}</Text>
        </View>
      </View>
      <View
        style={tw`rounded-full bg-white shadow-sm border-gray-200 border p-2`}
      >
        <Icon name="heart" size={30} color="black" />
      </View>
    </View>
  );
};

export default ProfileHeader;
