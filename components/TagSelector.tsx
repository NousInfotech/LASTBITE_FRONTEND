import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TagSelector = ({ tags, selectedTag, onSelect }: any) => {
  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag: any) => (
        <TouchableOpacity
          key={tag.id}
          style={[styles.tag, selectedTag === tag.id && styles.selectedTag]}
          onPress={() => onSelect(tag.id)}
        >
          <Icon
            name={tag.icon}
            size={16}
            color={selectedTag === tag.id ? "#006A6A" : "#666"}
          />
          <Text
            style={[
              styles.tagText,
              selectedTag === tag.id && styles.selectedTagText,
            ]}
          >
            {tag.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 6,
  },
  selectedTag: {
    borderColor: "#006A6A",
    backgroundColor: "rgba(1, 97, 95, 0.1)",
  },
  tagText: {
    fontSize: 14,
    color: "#01615F",
  },
  selectedTagText: {
    color: "#006A6A",
  },
});

export default TagSelector;
