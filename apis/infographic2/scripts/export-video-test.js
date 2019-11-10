// aws sample data
const data = {
  name: " Chuyến đi đầu tiên trên TripBFF",
  fromDate: 1567962000000,
  toDate: 1568221199999,
  locations: [
    {
      locationId: "a10ca9f3-7b62-4899-abae-b13fd9839a5c",
      name: "Phan Xi Păng",
      fromTime: "September 9, 2019",
      toTime: "2019-09-09T08:25:00.000Z",
      feeling: "Tuyệt vời",
      activity: "Đi bộ đường dài ngắn ngày",
      highlights: "Đẹp, Nguy hiểm",
      signedUrl: "http://placekitten.com/700/500"
    },
    {
      locationId: "2b877a4c-5bf9-4315-a8b4-02f44971879d",
      name: "Mù Cang Chải",
      fromTime: "September 10, 2019",
      toTime: "2019-09-10T03:16:00.000Z",
      feeling: "Yên bình",
      activity: "Ngắm ruộng lúa",
      highlights: "Đẹp, Rẻ"
      // signedUrl: "http://placekitten.com/1200/1200"
    },
    {
      locationId: "1f611a70-abde-4e5d-95d3-ae5e7959a9cb",
      name: "Tú Lệ",
      fromTime: "September 10, 2019",
      toTime: "2019-09-10T03:16:00.000Z",
      feeling: "Chill",
      activity: "Ngắm mặt trời lặn",
      highlights: "Đẹp, Đồ ăn ngon"
      // signedUrl: "http://placekitten.com/800/600"
    }
    // {
    //   locationId: "731b2d4e-dddb-4a06-b59a-72d43e969df7",
    //   name: "Y Tý",
    //   fromTime: "September 11, 2019",
    //   toTime: "2019-09-11T03:17:00.000Z",
    //   feeling: "Ngớ ngẩn",
    //   activity: "Săn mây",
    //   highlights: "Đẹp, Nguy hiểm",
    //   // signedUrl: "http://placekitten.com/900/1200"
    // }
  ],
  locale: "vi",
  numberOfDays: 1
};

const infographicTypes = require("./info_graphic_type");
const genericDraw = require("./info_graphic_general_draw");
const fs = require("fs");
const stream = require("stream");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const startTimer = new Date().getTime();

(async () => {
  //make sure input images ancided as `Huffman` https://stackoverflow.com/questions/3735823/ffmpeg-not-finding-codec-parameters
  var command = ffmpeg()
    .input("./data/images2/%03d.jpg")
    .withFpsInput(2)
    // .videoFilter("fps=5") //make sure fps > 1
    .loop(5)
    // .fps(1)
    .on("progress", function(progress) {
      console.log("Processing: ", progress);
      console.log("Processing: " + progress.percent + "% done");
    })
    .on("error", function(err) {
      console.log("An error occurred: " + err.message);
    })
    // .on('stderr', function(stderrLine) {
    //   console.log('Stderr output: ' + stderrLine);
    // })
    .on("end", function() {
      console.log("Processing finished !");
    })
    ;

  // const canvasAdaptor = await genericDraw.draw(
  //   data,
  //   infographicTypes.INFOGRAPHIC_TYPE.FIRST_RELEASED
  // );
  // canvasAdaptor.draw();

  // let buf = await canvasAdaptor.toBufferJpeg();
  // const readable = new stream.Readable();
  // readable._read = () => {}; // _read is required but you can noop it
  // readable.push(buf);
  // readable.push(null);

  // command = command.input(readable);

  command
    .videoCodec("libx264")
    .audioCodec("libmp3lame")
    .size("1200x1200")
    .save("output-video.avi")
    ;

  // fs.writeFileSync("output.jpeg", buf);
  console.log(`TIMER ${new Date().getTime() - startTimer} ms: completed`);
})();
