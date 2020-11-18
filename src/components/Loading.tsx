import React from 'react';
import Modal from 'react-native-modal';
import { ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingProps {
  isLoading: boolean;
}

const Loading = (props: LoadingProps) => (
  <Modal
    animationIn="fadeIn"
    animationOut="fadeOut"
    style={styles.container}
    isVisible={props.isLoading}>
    <ActivityIndicator color="#FFF" animating={true} size="large" />
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
});

export default Loading;
