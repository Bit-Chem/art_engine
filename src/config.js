const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

/* TODO
-work in variation functionality
-Create incompatible layers system.
-work in rarity calculations
-option to include rarity in metadata
- Util to 'bring to front'. This will enable people to move X number of tokens to the first # in the
collection so they can team Mint or whatever without resorting to minting with tokenId.
-Should I still add a "make this amount" of particular traits if neccessary?
*/

/* DONE
-work in resumeNum functionality
-work in toCreateNow functionality
-rework weight system to simply mark the weight as a rarity name (common, rare, etc.) and have rarity automatic
-work in misc utils
- Continue to build on resumeNum and enable a resumted generation? Maybe pull dna from metadata?
-option to not display none in metadata -- Solution: use removeAttribute
*/

/* NOGO
-rework weight system to provide option to have either 
exact percentages based on weight (ie, weight of #30 would generate 
that trait 30% of the time), ~~ This is going to take a lot more than originally anticipated to get working due 
  to layersOrder. If you restricted it to only allow one layersOrder, I suppose it could work, but that concession
  isn't worth imo. 
*/

const collectionSize = 10000;
const toCreateNow = 100;

const scaleSize = (num) => {
  if (collectionSize === toCreateNow) return num;
  return Math.floor((num / collectionSize) * toCreateNow);
};

// Set this to true if you want to use named rarity instead of numbers. 
const namedWeight = false;

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://TESTING";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: scaleSize(2500),
    layersOrder: [
      { name: "SkeletalBody" },
      { name: "Head"}, // options: {layerVariations: 'Color'} },
      { name: "Back"},
      { name: "Legs" },
      { name: "Arms" },
      { name: "Mouth" },
      { name: "Eyes" },
    ],
  },
  {
    growEditionSizeTo: scaleSize(10000),
    layersOrder: [
      { name: "Body" },
      { name: "Head" },
      { name: "Back" },
      { name: "Legs" },
      { name: "Arms" },
      { name: "Mouth" },
      { name: "Eyes" },
    ],
  },
];

// const layerConfigurations = [
//   {
//     growEditionSizeTo: 50,
//     layersOrder: [
//       { name: "blueBody", options: {displayName: "Body"} },
//       { name: "blueHands", options: {displayName: "Hands"} },
//   },
//   {
//     growEditionSizeTo: 100,
//     layersOrder: [
//       { name: "yellowBody", options: {displayName: "Body"} },
//       { name: "yellowHands", options: {displayName: "Hands"} },
//     ],
//   },
// ];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Rarity distribution can be adjusted
* Keep range [0 - 10,000]
* Because weight is up to 10,000, percentages can determined up to 
* two decimal places. ie: 10.15% would be 1015
* DO NOT change the rarity names unless you know what you're doing in main.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const rarity_config = {
  Mythic: { ranks: [0, 100] }, //, fileName: 'Mythic.png' },
  Legendary: { ranks: [100, 600] }, //, fileName: 'Legendary.png' },
  Epic: { ranks: [600, 1500] }, //, fileName: 'Epic.png' },
  Rare: { ranks: [1500, 3100] }, //, fileName: 'Rare.png' },
  Uncommon: { ranks: [3100, 5600] }, //, fileName: 'Uncommon.png' },
  Common: { ranks: [5600, 10000] }, //, fileName: 'Common.png' },
};

// layer variations:
const layerVariations = [
  {
    variationCount: 1,
    name: 'Color',
    variations: [
      'Blue',
      'Green',
      'Purple',
      'Red',
    ],
    Weight: [
      5950,
      2950,
      900,
      500,
    ],
  },
];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Do not use this unless 100% necessary and you understand the risk
* Generating collection in stages leads to potential duplicates. 
* 99% of the time, regenerating is the appropriate option. 
* This is here for the 1%
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const resumeNum = 0;
const importOldDna = false;

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  resumeNum,
  rarity_config,
  toCreateNow,
  collectionSize,
  namedWeight,
  importOldDna,
  layerVariations,
};
