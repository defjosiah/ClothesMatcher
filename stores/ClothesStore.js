/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  CameraRoll,
} = React;

var DB = require('react-native-store');

var Items = require('../constants/ItemConstants');
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
                type: Items.ANY,
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
    async getMatchingItemsWithFilter(where, matchID, successFunc, failFunc) {
        var matchWhere = {
            where: {
                pictureID: matchID
            },
            fields: {
                matches: true
            }
        }
        var itemMatches = await this.itemStore.find(where);
        var idMatches = await this.itemStore.find(matchWhere);
        if (itemMatches !== null && idMatches !== null) {
            successFunc(itemMatches, idMatches[0]);
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
    },
    async addMatch(matchID, targetID) {
        console.log("Add Match");
        var matchWhere = {
            where: {
                pictureID: matchID
            }
        };
        var targetWhere = {
            where: {
                pictureID: targetID
            }
        };
        var matchOriginal = await this.itemStore.find(matchWhere);
        var targetOriginal = await this.itemStore.find(targetWhere);
        var matchList = matchOriginal[0].matches;
        matchList.push(targetID);
        var targetList = targetOriginal[0].matches;
        targetList.push(matchID);
        var matchUpdate = {
            matches: matchList
        };
        var targetUpdate = {
            matches: targetList
        };
        await this.itemStore.update(matchUpdate, matchWhere);
        await this.itemStore.update(targetUpdate, targetWhere);
    },
    async removeMatch(matchID, targetID) {
        console.log("Remove Match");
        var matchWhere = {
            where: {
                pictureID: matchID
            }
        };
        var targetWhere = {
            where: {
                pictureID: targetID
            }
        };
        var matchOriginal = await this.itemStore.find(matchWhere);
        var targetOriginal = await this.itemStore.find(targetWhere);
        var matchList = matchOriginal[0].matches;
        var matchIndex = matchList.indexOf(targetID);
        if (matchIndex > -1) {
            matchList.splice(matchIndex, 1)
        };
        var targetList = targetOriginal[0].matches;
        var targetIndex = targetList.indexOf(matchID);
        if (targetIndex > -1) {
            targetList.splice(targetIndex, 1)
        };
        var matchUpdate = {
            matches: matchList
        };
        var targetUpdate = {
            matches: targetList
        };
        await this.itemStore.update(matchUpdate, matchWhere);
        await this.itemStore.update(targetUpdate, targetWhere);
    }
};

module.exports = ClothesStore;
