export type RootStackParamList = {
  Home: undefined;
  Gallery: undefined;
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: {
    navigate: (screen: T) => void;
  };
  route: {
    params?: RootStackParamList[T];
  };
};
