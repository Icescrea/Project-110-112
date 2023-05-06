prediction_1 = ""
prediction_2 = ""
Webcam.set({
    with: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera")

Webcam.attach(camera)

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src = '" + data_uri + "'>"
    }
    )
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/cy-5w7MRM/model.json", modloaded)
function modloaded() {
    console.log("modloaded")
}

function speak() {
    synth = window.speechSynthesis;
    data_1 = "The first prediction is" + prediction_1
    data_2 = "The second prediction is" + prediction_2
    utterThis = new SpeechSynthesisUtterance(data_1 + data_2)
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result)
        prediction_1 = result[0].label
        prediction_2 = result[1].label
        document.getElementById("result_emotion_name").innerhtml = prediction_1
        document.getElementById("result_emotion_name2").innerhtml = prediction_2
        if (prediction_1 == "happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if (prediction_1 == "best") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

    }
    if (prediction_1 == "angry") {
        document.getElementById("update_emoji").innerHTML = "&#128548;";
    }

    if (prediction_2 == "happy") {
        document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }

    if (prediction_2 == "sad") {
        document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }


if (prediction_2 == "angry") {
    document.getElementById("update_emoji2").innerHTML = "&#128548;";
}


}