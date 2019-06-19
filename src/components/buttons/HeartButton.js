import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default class HeartButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { addedToFavorite: this.props.selected };

    this.addToFavorite = this.addToFavorite.bind(this);
  }

  // componentDidMount() {
  //   this.setState({ addedToFavorite: this.props.selected });
  // }

  addToFavorite() {
    this.setState(
      {
        addedToFavorite: !this.state.addedToFavorite,
      },
      () => {
        if (this.state.addedToFavorite) {
          this.props.togglePress['on']();
        } else {
          this.props.togglePress['off']();
        }
      },
    );
  }

  render() {
    const { addedToFavorite } = this.state;
    const { color, selectedColor, togglePress, size, style } = this.props;

    return (
      <TouchableOpacity onPress={this.addToFavorite}>
        <View style={style}>
          <Icon
            name={addedToFavorite ? 'heart' : 'heart-o'}
            color={addedToFavorite ? selectedColor : color}
            size={size}
          />
          <Icon
            name="heart-o"
            size={size}
            color={addedToFavorite ? selectedColor : color}
            style={[
              { display: addedToFavorite ? 'flex' : 'none' },
              styles.selectedColor,
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

HeartButton.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  selectedColor: PropTypes.string.isRequired,
  togglePress: PropTypes.object,
  selected: PropTypes.bool,
};

const styles = StyleSheet.create({
  selectedColor: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
