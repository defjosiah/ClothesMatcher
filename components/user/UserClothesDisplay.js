/**
 * @flow
 */
var React = require('react-native');
var UserListSwitcher = require('./UserListSwitcher');
var Items = require('../../constants/ItemConstants');
var UserClothesDisplay = React.createClass({
  render: function() {
    return (<UserListSwitcher initialRoute={Items.TOPS} />);
  }
});

module.exports = UserClothesDisplay;
