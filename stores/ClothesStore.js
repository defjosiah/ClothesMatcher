/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  CameraRoll,
} = React;

var DB = require('react-native-store');

var items = require('../constants/ItemConstants');
var KEY_ROOT = '@ITEM_STORE';
var Format = require('../utils/format.js');

/**
 * Singleton handling access to the AsyncStorage api.
 */
var ClothesStore = {
    async init() {
        this.itemStore = await DB.model('ItemStore');
        var fetchParams = {
          first: 60,
          groupTypes: 'Album',
          groupName: 'Clothes',
          assetType: 'Photos'
        };
        CameraRoll.getPhotos(fetchParams, (data) => this.processImages(data),
                             () => console.log('Error loading photos.'));
    },
    async processImages(data) {
        var assets = data.edges;
        var images = assets.map((a) =>
                                    Format.getAssetId(a.node.image.uri));
        var currentIDs = await this.itemStore.find({fields: {pictureID: true}});
        if (currentIDs != null) {
            currentIDs = currentIDs.map((x) => x.pictureID);
        } else {
            currentIDs = [];
        }
        var newPictures = [];
        images.forEach((k) => {
            if (currentIDs.indexOf(k) < 0) {
                newPictures.push(k);
            }
        });
        for (var i = 0; i < newPictures.length; i++) {
            var newData = {
                pictureID: newPictures[i], 
                name: '',
                type: items.ANY,
                matches:[]
            };
            await this.itemStore.add(newData);
        };
    },
    async getItemsWithFilter(where, successFunc, failFunc) {
        var matched = await this.itemStore.find(where);
        if (matched != null) {
            successFunc(matched);
        } else {
            failFunc();
        }
    },
    async setItemName(pictureID, newName, successFunc, failFunc) {
        console.log("Set Item Name for: " + pictureID + " and " + newName);
        var where = {
            where: {
                pictureID: pictureID
            }
        };
        var update = {
            name: newName
        };
        await this.itemStore.update(update, where);
    },
    async setItemType(pictureID, newType, successFunc, failFunc) {
        console.log("Set Item Type for: " + pictureID + " and " + newType);
        var where = {
            where: {
                pictureID: pictureID
            }
        };
        var update = {
            type: newType
        };
        await this.itemStore.update(update, where);
    }
};

module.exports = ClothesStore;
