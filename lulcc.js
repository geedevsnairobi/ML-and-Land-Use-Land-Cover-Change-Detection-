//Land Cover Change Analysis between 2002 and 2013 in GEE (Study Area: Kisumu_east)//
Map.addLayer(KisEast,{},"my project study area");

// LULC 2009
//Determine Land Cover in 2009//
//load Landsat 7 Tier 1 TOA image collection
var landsat_5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA")
    .filterBounds(KisEast)
    .filterDate('2009-01-01', '2009-12-30')
    .sort('CLOUD_COVER')
    .first();

var landsat_5_1 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA")
    .filterBounds(roi2)
    .filterDate('2009-01-01', '2009-12-30')
    .sort('CLOUD_COVER')
    .first();
  
var landsat_5_2 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA")
    .filterBounds(roi3)
    .filterDate('2009-01-01', '2009-12-30')
    .sort('CLOUD_COVER')
    .first();  
  
//Mosaic theese 3 L7 image collections 
var mosaic_1 = ee.ImageCollection.fromImages([landsat_5_2, landsat_5_1, landsat_5]).mosaic();

//clip by asset/roi
var landsat_2009 = mosaic_1.clip(KisEast);

//Display the cliped image collection with visual parameters 
Map.addLayer(landsat_2009, {
  bands: ['B5', 'B4', 'B3'], min: 0, max: 0.3, gamma: 1.4}, 'KisEast_2009');

//Zoom to roi
Map.centerObject(KisEast, 11);

//Merge sample points together into one FeatureCollection
var landcover_2009 = Water09.merge(Vegetation09).merge(Built_up09).merge(CropLands09).merge(BareLand09);

//Select Bands from mosaic Image for training
var bands = ['B1', 'B2', "B3", 'B4', 'B5'];

//The name of the property on the points storing the class label
var classProperty = 'Landcover';

//Sample the input imagery to get a FeatureCollection of training data
var training = landsat_2009.select(bands).sampleRegions({
  collection: landcover_2009,
  properties: [classProperty],
  scale: 30
});

//Train the classifier
var classifier = ee.Classifier.smileRandomForest(6).train({
  features: training,
  classProperty: classProperty,
});

//Classify the input imagery
var classified_2009 = landsat_2009.classify(classifier);

//Define color palette
var LandcoverPalette = [
  "#0000CD", // Water(0)
  "#006400", //vegetation(1)
  "#FF0000", //built up(2)
  "#FFFF00", //crop Lands(4)
  "#800080" // Bare lands(5)
];


//Display the classified result 
Map.addLayer(classified_2009.clip(KisEast), {
  min:0, max: 4, palette: LandcoverPalette}, 'LULC_2009');

//Optinally, do some accuracy assessment. First, add a column of random uniforms to the training dataset.
var withRandom = training.randomColumn('random');

//We want to reserve some of the data for testing, to avoid overfitting the model.
var split = 0.7; //Roughly 70% training, 30% testing.
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));

//Trained with 70% of our data.
var trainedClassifier = ee.Classifier.smileRandomForest(6).train({
  features: trainingPartition,
  classProperty: classProperty,
  inputProperties: bands
});

//classify the test FeatureCollection.
var test_1 = testingPartition.classify(trainedClassifier);

//Print the Confusion Matrix.
var confusionMatrix_2009 = test_1.errorMatrix(classProperty, 'classification');
// print('Confusion Matrix 2009', confusionMatrix_2009);
print("Overall accuracy:",confusionMatrix_2009.accuracy());
var confusionMatrix_2009 = test_1.errorMatrix(classProperty, 'classification');
print("Overall accuracy and Kappa statistics:",confusionMatrix_2009.accuracy(), confusionMatrix_2009.kappa());

// COMPUTING THE AREAS OF EACH CLASS
//Select the class from the classified image
var SelectImage = classified_2009.select('classification').eq([0, 1, 2, 3, 4]);

//Calculate the pixel area in square kilometer
var area_Classes = SelectImage.multiply(ee.Image.pixelArea()).divide(1000*1000);

//Reducing the statistics for your study area
var stat = area_Classes.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry: KisEast,
  scale: 30,
  maxPixels: 1e9
});

//Get the sq km area for vegetation
print ('(2022)Area of Classes (in sq.km)', stat);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LULC 2022
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Determine the Landcover 2022//
//Import Landsat 8 scaled radiance (Landsat 8 Tier 1 TOA) ImageCollection
var landsat_8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
    .filterBounds(KisEast)
    .filterDate('2022-01-01', '2022-04-20')
    .sort('CLOUD_COVER')
    .first();
    
var landsat_8_1 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
    .filterBounds(roi2)
    .filterDate('2021-01-01', '2022-04-20')
    .sort('CLOUD_COVER')
    .first();
  
var landsat_8_2 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
    .filterBounds(roi3)
    .filterDate('2021-01-01', '2022-04-20')
    .sort('CLOUD_COVER')
    .first();
    
//Mosaic theese 3 image collections 
var mosaic_2 = ee.ImageCollection.fromImages([landsat_8_2, landsat_8_1, landsat_8]).mosaic();
//clip by asset/roi
var landsat_2022 = mosaic_2.clip(KisEast);

//Display the cliped image collection with visual parameters (Bands & RGB)
Map.addLayer(landsat_2022, {
  bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3, gamma: 1.4}, 'KisEast_2022');

//Merge sample points together into one FeatureCollection
var landcover_2022 = Water.merge(Vegetation).merge(Built_up).merge(CropLands).merge(BareLand);

//Select Bands from mosaic Image for training
var bands = ['B2', 'B3', "B4", 'B5', 'B6', 'B7'];

//The name of the property on the points storing the class lebel
var classProperty = 'Landcover';

//Sample the input imagery to get a FeatureCollection of training data
var training = landsat_2022.select(bands).sampleRegions({
  collection: landcover_2022,
  properties: [classProperty],
  scale: 30
});
//Train the classifier
var classifier = ee.Classifier.smileRandomForest(6).train({
  features: training,
  classProperty: classProperty,
});
//Classify the input imagery
var classified_2022 = landsat_2022.classify(classifier);

//Optinally, do some accuracy assessment. First, add a column of random uniforms to the training dataset.
var withRandom = training.randomColumn('random');

//We want to reserve some of the data for testing, to avoid overfitting the model.
var split = 0.7; //Roughly 70% training, 30% testing.
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));

//Trained with 70% of our data.
var trainedClassifier = ee.Classifier.smileRandomForest(6).train({
  features: trainingPartition,
  classProperty: classProperty,
  inputProperties: bands
});

//classify the test FeatureCollection.
var test = testingPartition.classify(trainedClassifier);

//Print the Confusion Matrix.
var confusionMatrix_2022 = test.errorMatrix(classProperty, 'classification');
print("Overall accuracy:",confusionMatrix_2022.accuracy());
var confusionMatrix_2022 = test_1.errorMatrix(classProperty, 'classification');
print("Overall accuracy and Kappa statistics:",confusionMatrix_2022.accuracy(), confusionMatrix_2022.kappa());

// COMPUTING THE AREAS OF EACH CLASS
//Select the class from the classified image
var SelectImage = classified_2022.select('classification').eq([0, 1, 2, 3, 4]);

//Calculate the pixel area in square kilometer
var area_Classes = SelectImage.multiply(ee.Image.pixelArea()).divide(1000*1000);

//Reducing the statistics for your study area
var stat = area_Classes.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry: KisEast,
  scale: 30,
  maxPixels: 1e9
});

//Get the sq km area for vegetation
print ('(2022)Area of Classes (in sq.km)', stat);



//Define color palette
var LandcoverPalette = [
  "#0000CD", // Water(0)
  "#006400", //vegetation(1)
  "#FF0000", //built up(2)
  "#FFFF00", //crop Lands(4)
  "#800080" // Bare lands(5)
];
//Display the classified result 
Map.addLayer(classified_2022, {
  min:0, max: 4, palette: LandcoverPalette}, 'LULC_2022');


//Determine the Land Cover Change between 2009 and 2022
var LULC_Change = classified_2022.subtract(classified_2009);
Map.addLayer(LULC_Change.clip(KisEast), {
  min:0, max:4, palette: ['green', 'red', 'yellow','blue','purple']}, 
  'LULC Change Between 2009 and 2022_KisEast');
  



// Exporting classified image in the google drive
Export.image.toDrive({
  image:classified_2022,
  description:"KISUMU_EAST2022",
  scale:30,
  region:KisEast,
  maxPixels: 1e13
});


