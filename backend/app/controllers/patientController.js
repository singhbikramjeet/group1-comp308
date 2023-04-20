const tf = require("@tensorflow/tfjs");
// require('@tensorflow/tfjs-node');

const Patient = require('mongoose').model('Patient')
const Alert = require('mongoose').model('Alert')

const hep = require('../../../hep.json');
const hepTesting = require('../../../hep_test.json');

exports.newAlert = async (req, res) => {
    try {
        const { patientId, message } = req.body

        const patient = await Patient.findById(patientId)

        const newAlert = new Alert({ patient, message })
        newAlert.save()

        return res.status(200).json({ msg: 'Emergency Alert sent successfully!' })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

exports.trainAndPredict = function (req, res) {

    // let age = parseFloat(req.body.age);
    // let sex = parseFloat(req.body.sex);
    // let steroid = parseFloat(req.body.steroid);
    // let antivirals = parseFloat(req.body.antivirals);
    // let fatigue = parseFloat(req.body.fatigue);
    // let malaise = parseFloat(req.body.malaise);
    // let anorexia = parseFloat(req.body.anorexia);
    // let liver_big = parseFloat(req.body.liver_big);
    // let liver_firm = parseFloat(req.body.liver_firm);
    // let spleen_palpable = parseFloat(req.body.spleen_palpable);
    // let spiders = parseFloat(req.body.spiders);
    // let ascites = parseFloat(req.body.ascites);
    // let varices = parseFloat(req.body.varices);
    // let bilurubin = parseFloat(req.body.bilurubin);
    // let alk_phosphate = parseFloat(req.body.alk_phosphate);
    // let sgot = parseFloat(req.body.sgot);
    // let albumin = parseFloat(req.body.albumin);
    // let protime = parseFloat(req.body.protime);
    // let histology = parseFloat(req.body.histology);

    //   console.log('trainingData')

    const trainingData = tf.tensor2d(hep.map(item => {
        const{Die_Live, ...set} = item
        return Object.values(set)
    }))


    // const trainingData = tf.tensor2d(hep.map(item => [
    //     item.Age,
    //     item.Sex,
    //     item.Steroid,
    //     item.Antivirals,
    //     item.Fatigue,
    //     item.Malaise,
    //     item.Anorexia,
    //     item.Liver_big,
    //     item.Liver_firm,
    //     item.Spleen_palpable,
    //     item.Spiders,
    //     item.Ascites,
    //     item.Varices,
    //     item.Bilurubin,
    //     item.Alk_phosphate,
    //     item.Sgot,
    //     item.Albumin,
    //     item.Protime,
    //     item.Histology
    // ]))
    
    //tensor of output for training data
    // console.log(trainingData.dataSync())
    // console.log(trainingData)

    //
    //tensor of output for training data
    //the values for species will be:
    // Die_Live 1:       1,0
    // Die_Live 2:       0,1
    const outputData = tf.tensor2d(hep.map(item => [
        item.Die_Live === 1 ? 1 : 0,
        item.Die_Live === 2 ? 1 : 0
    ]))
    // console.log(outputData.dataSync())

    //
    //tensor of features for testing data
    const testingData = tf.tensor2d([Object.values(req.body).map(Number)])

    // const testingData = tf.tensor2d(
    //     [[age,
    //         sex,
    //         steroid,
    //         antivirals,
    //         fatigue,
    //         malaise,
    //         anorexia,
    //         liver_big,
    //         liver_firm,
    //         spleen_palpable,
    //         spiders,
    //         ascites,
    //         varices,
    //         bilurubin,
    //         alk_phosphate,
    //         sgot,
    //         albumin,
    //         protime,
    //         histology
    //     ]]
    // );
    // console.log(testingData.dataSync())
    // testingData.array().then(array => {
    //     console.log(array)
    // })

    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [19], // 19 input neurons (features)
        activation: "sigmoid",
        units: 30, //dimension of output space (first hidden layer)
    }))
    //add the second hidden layer
    model.add(tf.layers.dense({
        inputShape: [30], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 15, //dimension of final output (die or live)
    }))
    //add the third hidden layer
    model.add(tf.layers.dense({
        inputShape: [15], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 2, //dimension of final output (die or live)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 2, //dimension of final output
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        //categoricalCrossentropy
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.003),
        metrics: ['accuracy'],
    })
    // console.log("summary: ", model)

    // train/fit the model for the fixed number of epochs
    async function run() {
        const startTime = Date.now()
        await model.fit(trainingData, outputData,
            {
                epochs: 1000,
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        //   console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        //   console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }
        ) //fit
        //
        const results = await model.predict(testingData);
        results.array().then(result => res.status(200).send(result[0]))

        
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        // results.array().then(array => {
        //     console.log(array)
        //     var resultForTest1 = array[0];
        //     var resultForTest2 = array[1];
        //     var resultForTest3 = array[2];
        //     var dataToSent = { row1: resultForTest1, row2: resultForTest2, row3: resultForTest3 }

        //     /*
        //     //var resultForData1 = array[0];
        //     res.render('results',
        //         {
        //             results: results,
        //             resultForTest1: resultForTest1,
        //             resultForTest2: resultForTest2,
        //             resultForTest3: resultForTest3
        //         }
        //     )
        //     */
        //     res.status(200).send(dataToSent);
        // })
    }
    run()
};