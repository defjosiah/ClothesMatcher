/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  CameraRoll,
  AsyncStorage
} = React;

var items = require('../constants/ItemConstants');
var KEY_ROOT = '@ITEM_STORE';
var defaultData = {name: '', type: '', matches:[]};
var Format = require('../utils/format.js');

/**
 * Singleton handling access to the AsyncStorage api.
 */
var ClothesStore = {
    async init() {
        //initRoot
        var createIfEmpty = () => {
            this.withAwaitVoid(() => AsyncStorage.setItem(KEY_ROOT, "[]"),
                               () => console.log("Created empty root."),
                               () => console.log("Failed to create root."));
        }
        var logIfNotEmpty = (root) => {
            console.log("Root is not empty, and is: " + JSON.stringify(root));
            this.root = root;
        }
        await this.getItem(KEY_ROOT, logIfNotEmpty, createIfEmpty);
        var fetchParams = {
          first: 6,
          groupTypes: 'Album',
          groupName: 'Clothes',
          assetType: 'Photos'
        };
        CameraRoll.getPhotos(fetchParams, (data) => this.processImages(data),
                             () => this.processImageError(data));
    },
    async processImages(data) {
        var assets = data.edges;
        var images = assets.map((a) =>
                                    Format.getAssetId(a.node.image.uri));
        await this.addToBase(images);
        // var successFunc = (curr) => {
        //     var notIn = images.filter((i) => curr.indexOf(i) < 0);
        //     notIn.forEach((k) => {
        //         this.addItem(k, defaultData, () => console.log("trivial success"),
        //                   () => console.log("trivial failure"))
        //     });
        // };
        // var filterFunc = (x) => 1 == 1;
        // await this.getItemsWithFilter(filterFunc, successFunc,
        // //                            () => console.log('failed'));
    },
    processImageError() {
        console.log('I hate errors');
        console.log('Why isn\'t htis working?');
    },
    async getItem(pictureID, successFunc, failFunc) {
        return this.withAwait(() => AsyncStorage.getItem(pictureID),
                                successFunc, failFunc);
    },
    async getItemsWithFilter(filterFunc, successFunc, failFunc) {
        var allItemsSuccess = (f) => {
            this.withAwait(() => AsyncStorage.multiGet(f),
                                  successFunc, failFunc);
        };
        return this.withAwaitFilter(() => AsyncStorage.getItem(KEY_ROOT),
                                    filterFunc,
                                    allItemsSuccess,
                                    () => console.log("Failed filter items"));
    },
    /**
     * addItem will replace the current data with a new data function.
     */
    async addItem(pictureID, data, successFunc, failFunc) {
        var updateBaseSuccess = (value) => {
            this.addToBase([pictureID]);
            successFunc(value);
        };
        return this.withAwaitVoid(() => AsyncStorage.setItem(pictureID,
                                    JSON.stringify(data)),
                              updateBaseSuccess, failFunc);
    },
    /**
     * Set a range of pictureIDs with either empty data or the 
     * supplied data pair.
     */
    async addItems(pictureDataPairs, successFunc, failFunc) {
        var updateBaseSuccess = () => {
            this.addToBase(pictureDataPairs.map((x) => x[0]));
            successFunc();
        };
        pairsJSON = pictureDataPairs.map((x) => {
                return ([x[0], JSON.stringify(x[1])])
            });
        return this.withAwaitVoid(() => AsyncStorage.multiSet(pictureDataPairs),
                              updateBaseSuccess, failFunc);
    },
    async withAwait(dbFunc, successFunc, failFunc) {
        try {
            let value = await dbFunc();
            if (value == null) {
                failFunc();
            } else {
                successFunc(JSON.parse(value));
            }
        } catch (error) {
            console.log('AsyncStorage error with await: ' + error);
        }
    },
    async withAwaitFilter(dbFunc, filterFunc, successFunc, failFunc) {
        var value = null;
        try {
            value = await dbFunc();
            console.log(value);
            if (value == null) {
                value = [];
            } else {
                value = JSON.parse(value).filter(filterFunc);
            }
            successFunc(value);
        } catch (error) {
            console.log('AsyncStorage error: ' + error);
        }
        return value;
    },
    async withAwaitVoid(dbFunc, successFunc, failFunc) {
        try {
           await dbFunc();
           console.log("await void?");
           successFunc();
        } catch (error) {
            failFunc()
        }
    },
    async addToBase(pictureIDs) {
        console.log("In add to base with: " + pictureIDs);
        var oldRoot = this.root;
        successFunc = (value) => {
            this.root = value;
        };
        console.log("is this even being called");
        await this.getItem(KEY_ROOT, successFunc, () => this.root = oldRoot);
        //TODO: might be an issue here with saving the old root on failure.
        console.log("past KEY_ROOT fetch?");
        console.log(this.root);
        pictureIDs.forEach((k) => {
            if (this.root.indexOf(k) < 0) {
                this.root.push(k);
            }
        });
        console.log(this.root);
        await this.withAwaitVoid(() => AsyncStorage.setItem(KEY_ROOT,
                                JSON.stringify(this.root)),
                        () => console.log("Successful"),
                        () => console.log("Unsuccessful"));
    }
};

module.exports = ClothesStore;
