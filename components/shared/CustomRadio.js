/**
 * Custom radio-like buttons, where only one in the input array is allowed 
 * to be selected at a time.
 *
 * Example use:
 * var button1 = <CustomSelectedUnselectedView1 />
 * var button1OnPress = (selected) => console.log("Button 1 is selected")
 * 
 * var button2 = <CustomSelectedUnselectedView2 />
 * var button2OnPress = () => console.log("Button 2 is selected")
 * 
 * var button3 = <CustomSelectedUnselectedView2 />
 * var button3OnPress = (selected) => console.log("Button 3 is selected")
 * 
 * <CustomRadio
 *   buttons={[button1, button2, button3]}
 *   onPress={[button1OnPress, button2OnPress, button3OnPress]}
 * />  
 * 
 * @flow
 */


var React = require("react-native");
var {
    TouchableHighlight,
    View,
    Text
} = React;
//this.props.children

var CustomRadio = React.createClass({
    getInitialState: function() {
        return {selectedIndex: this.props.selectedIndex | -1};
    },
    render: function() {
      return (
        <View>
            {this._renderChildren()}
        </View>
      );
    },
    _selectHandler: function(selectedIndex) {
        this.props.onPress[selectedIndex]();
        this.setState({selectedIndex})
    },
    _renderChildren: function() {
        return React.Children.map(this.props.children, (child, idx) => {
            if (idx === this.props.selectedIndex) {
                return React.cloneElement(child, {isSelected: true});
            } else {
                return child;
            }
        });
    }
});

module.exports = CustomRadio;

