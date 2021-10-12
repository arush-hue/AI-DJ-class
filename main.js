music="";
leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
score_leftWrist=0;
scoreRightWrist=0;
function preload()
{
    music=loadSound("music.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    PoseNet=ml5.poseNet(video, modelLoaded);
    PoseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("PoseNet is initialized");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log("results");

        score_leftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist- "+score_leftWrist+" Score Right Wrist- "+scoreRightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        console.log("Left Wrist X = "+leftWristX+"Left Wrist Y = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y = "+rightWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);

    fill("red");
    stroke("blue");

    if(scoreRightWrist>0.002)
    {
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            music.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x";
            music.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            music.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x";
            music.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            music.rate(2.5);
        }
    }
    if(score_leftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftwrist=Number(leftWristY);
    remove_decimals=floor(InNumberleftwrist);
    Division_1000=remove_decimals/1000;
    volume=Division_1000*2;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    music.setVolume(volume);
    }
}
function play()
{
    music.play();
    music.setVolume(0.9);
    music.rate(2);
}