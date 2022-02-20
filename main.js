Webcam.set({
    width:400,
    height:350,
    image_format : "png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(" #camera ");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image src="'+data_uri+'"/>';

        console.log("ml5 version", ml5.version);

        classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iE0ICUvLS/model.json',modelLoaded);

        function modelLoaded() {
            console.log('Model Loaded');

        }

        function speak(){
            var synth = window.speechSynthesis;
            speak_data1 = "The first prediction was "+prediction1;
            speak_data2 = "The second prediction was "+prediction2;
            var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
             synth.speak(utterThis);
        }
    })
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
if (error){
console.error(error);
} else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction = results[1].label;
    speak();
    if(results[0].label == "happy")
    {
        document.getElementById("update_emoji").innerHTML = "&#128513";
    }

    if(results[0].label == "sad")
    {
        document.getElementById("update_emoji").innerHTML = "&#128532;";
    }

    if(results[0].label == "mad")
    {
        document.getElementById("update_emoji").innerHTML = "&#128545";
    }


    if(results[1].label == "happy")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128513";
    }

    if(results[1].label == "sad")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128532";
    }

    if(results[1].label == "mad")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128545";
    }
}


}
