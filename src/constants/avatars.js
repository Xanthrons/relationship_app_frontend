// src/constants/avatars.js
export const AVATARS = [
  { id: 1, emoji: "👤", label: "Default" },
  { id: 2, emoji: "🐱", label: "Cat" },
  { id: 3, emoji: "🐶", label: "Dog" },
  { id: 4, emoji: "🦊", label: "Fox" },
  { id: 5, emoji: "🐻", label: "Bear" },
  { id: 6, emoji: "🐼", label: "Panda" },
  { id: 7, emoji: "🐨", label: "Koala" },
  { id: 8, emoji: "🐯", label: "Tiger" },
  { id: 9, emoji: "🦁", label: "Lion" },
  { id: 10, emoji: "🐮", label: "Cow" },
];

export const getAvatarEmoji = (id) => {
  const avatar = AVATARS.find((a) => a.id === Number(id));
  return avatar ? avatar.emoji : "👤";
};