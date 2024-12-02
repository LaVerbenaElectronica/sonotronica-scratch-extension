const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3YourExtension {

    constructor (runtime) {
        // put any setup for your extension here
        import('syllable')
            .then((syllableModule) => {
                this.syllable = syllableModule.syllable;
            });
    }

    /**
     * Returns the metadata about your extension.
     */
    getInfo () {
        return {
            // unique ID for your extension
            id: 'sonotronicaScratchExtension',

            // name that will be displayed in the Scratch UI
            name: 'Sonotronica',

            // colours to use for your extension blocks
            color1: '#000099',
            color2: '#660066',

            // icons to display
            //blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',
            //menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',

            // your Scratch blocks
            blocks: [
                {
                    // name of the function where your block code lives
                    opcode: 'myFirstBlock',

                    // type of block - choose from:
                    //   BlockType.REPORTER - returns a value, like "direction"
                    //   BlockType.BOOLEAN - same as REPORTER but returns a true/false value
                    //   BlockType.COMMAND - a normal command block, like "move {} steps"
                    //   BlockType.HAT - starts a stack if its value changes from false to true ("edge triggered")
                    blockType: BlockType.REPORTER,

                    // label to display on the block
                    text: 'My first block [MY_NUMBER] and [MY_STRING]',

                    // true if this block should end a stack
                    terminal: false,

                    // where this block should be available for code - choose from:
                    //   TargetType.SPRITE - for code in sprites
                    //   TargetType.STAGE  - for code on the stage / backdrop
                    // remove one of these if this block doesn't apply to both
                    filter: [ TargetType.SPRITE, TargetType.STAGE ],

                    // arguments used in the block
                    arguments: {
                        MY_NUMBER: {
                            // default value before the user sets something
                            defaultValue: 123,

                            // type/shape of the parameter - choose from:
                            //     ArgumentType.ANGLE - numeric value with an angle picker
                            //     ArgumentType.BOOLEAN - true/false value
                            //     ArgumentType.COLOR - numeric value with a colour picker
                            //     ArgumentType.NUMBER - numeric value
                            //     ArgumentType.STRING - text value
                            //     ArgumentType.NOTE - midi music value with a piano picker
                            type: ArgumentType.NUMBER
                        },
                        MY_STRING: {
                            // default value before the user sets something
                            defaultValue: 'hello',

                            // type/shape of the parameter - choose from:
                            //     ArgumentType.ANGLE - numeric value with an angle picker
                            //     ArgumentType.BOOLEAN - true/false value
                            //     ArgumentType.COLOR - numeric value with a colour picker
                            //     ArgumentType.NUMBER - numeric value
                            //     ArgumentType.STRING - text value
                            //     ArgumentType.NOTE - midi music value with a piano picker
                            type: ArgumentType.STRING
                        }
                    }
                },
                {
                    // name of the function where your block code lives
                    opcode: 'mySecondBlock',

                    // type of block - choose from:
                    blockType: BlockType.REPORTER,

                    // label to display on the block
                    text: 'Title for ISBN book [BOOK_NUMBER]',

                    // true if this block should end a stack
                    terminal: false,

                    // where this block should be available for code - choose from:
                    filter: [ TargetType.SPRITE, TargetType.STAGE ],

                    // arguments used in the block
                    arguments: {
                        BOOK_NUMBER: {
                            // default value before the user sets something
                            defaultValue: 1718500564,

                            // type/shape of the parameter - choose from:
                            type: ArgumentType.NUMBER
                        }
                    }
                },
                {
                    // name of the function where your block code lives
                    opcode: 'myThirdBlock',

                    // type of block - choose from:
                    blockType: BlockType.REPORTER,

                    // label to display on the block
                    text: 'Syllables in [MY_TEXT]',

                    // true if this block should end a stack
                    terminal: false,

                    // where this block should be available for code - choose from:
                    filter: [ TargetType.SPRITE, TargetType.STAGE ],

                    // arguments used in the block
                    arguments: {
                        MY_TEXT: {
                            // default value before the user sets something
                            defaultValue: 'Hello World',

                            // type/shape of the parameter - choose from:
                            type: ArgumentType.STRING
                        }
                    }
                }
            ]
        };
    }


    /**
     * implementation of the block with the opcode that matches this name
     *  this will be called when the block is used
     */
    myFirstBlock ({ MY_NUMBER, MY_STRING }) {
        // example implementation to return a string
        return MY_STRING + ' : doubled would be ' + (MY_NUMBER * 2);
    }

    /**
     * implementation of the block with the opcode that matches this name
     *  this will be called when the block is used
     */
    mySecondBlock ({ BOOK_NUMBER }) {
        // example fetching title from ISBN API
        return fetch('https://openlibrary.org/isbn/' + BOOK_NUMBER + '.json')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return {title : 'Unknown'};
                }
            })
            .then((bookinfo) => {
                return bookinfo.title;
            });
    }

        /**
     * implementation of the block with the opcode that matches this name
     *  this will be called when the block is used
     */
        myThirdBlock ({ MY_TEXT }) {
            // example of syllable npm package
            return this.syllable(MY_TEXT);
        }
}

module.exports = Scratch3YourExtension;
