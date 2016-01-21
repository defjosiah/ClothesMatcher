/**
 * @flow
 */
 var React = require('react-native');
 var AdminListSwitcher = require('./AdminListSwitcher');
 var Items = require('../../constants/ItemConstants');
 var AdminClothesDisplay = React.createClass({
   render: function() {
     return (<AdminListSwitcher
                initialRoute={Items.ANY}
                editable={true}
             />);
   }
 });

 module.exports = AdminClothesDisplay;
