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
      signedUrl: "./data/input/500x700.jpeg"
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
const Readable = require("stream").Readable;
const util = require("util");

// how to stream images to video https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/546
function SimpleRawImageStream(buf, num, opts) {
  // init Readable
  Readable.call(this, opts);
  opts = opts || {};

  // save the length to generate
  this._numToGenerate = num;
  this._n = 0;
  this.width = opts.width || 128;
  this.height = opts.height || 32;
  this.buf = buf;
}
util.inherits(SimpleRawImageStream, Readable);
SimpleRawImageStream.prototype._read = function() {
  let ready = true;
  while (ready) {
    if (++this._n > this._numToGenerate) {
      console.error("done!");
      this.push(null);
      return false;
    }

    // let rawImage = new Buffer(this.width * this.height * 3);
    // let i = 0;
    // while (i < rawImage.length) {
    //   rawImage[i++] = 0xff; // red
    //   rawImage[i++] = 0x00; // green
    //   rawImage[i++] = 0x00; // blue
    // }
    // ready = this.push(rawImage);

    let rawImage = this.buf;
    ready = this.push(rawImage);

    // console.error("  %s %s -> %s", this._n, rawImage.length, ready);
  }
  return true;
};

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const startTimer = new Date().getTime();

// function createStreamFromBuffer(buf) {
//   const readable = new stream.Readable();
//   readable._read = () => {}; // _read is required but you can noop it
//   readable.push(buf);
//   readable.push(null);
//   return readable;
// }

(async () => {
  //make sure input images ancided as `Huffman` https://stackoverflow.com/questions/3735823/ffmpeg-not-finding-codec-parameters
  var command = ffmpeg()
    // .input("./data/images2/%03d.jpg")
    // .withFpsInput(2)
    // // .videoFilter("fps=5") //make sure fps > 1
    // .loop(5)
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
      console.log(`TIMER ${new Date().getTime() - startTimer} ms: completed`);
    });

  const canvasAdaptor = await genericDraw.draw(
    data,
    infographicTypes.INFOGRAPHIC_TYPE.FIRST_RELEASED
  );
  canvasAdaptor.draw();

  let buf = await canvasAdaptor.toBufferRaw();

  // fs.writeFileSync("video-image-test.jpg", buf);

  // command = command
  //   .input(readable)
  //   // .input(createStreamFromBuffer(buf))
  //   .withFpsInput(2);
  // // .videoFilter("fps=5") //make sure fps > 1

  const opts = {
    width: 940,
    height: 1070
  };
  command = command
    .input(new SimpleRawImageStream(buf, 100, opts))
    .inputFormat("rawvideo")
    .inputOptions("-pix_fmt bgra")
    // .inputOptions("-pix_fmt argb")
    .inputOptions("-s " + opts.width + "x" + opts.height);

  command
    .size(opts.width + "x" + opts.height)
    .format("mp4")
    .videoCodec("libx264")
    .audioCodec("libmp3lame")
    .output("output-video.mp4")
    .run();

  // fs.writeFileSync("output.jpeg", buf);
  console.log(`TIMER ${new Date().getTime() - startTimer} ms: completed`);
})();
