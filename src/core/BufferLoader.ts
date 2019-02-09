class BufferLoader {
  context: AudioContext;
  urlList: [string];
  onLoad: (arg0: any) => void;
  bufferList: [any];
  loadCount: number;

  constructor(
    context: AudioContext,
    urlList: [string],
    callback: (buffer: AudioBuffer) => void
  ) {
    this.context = context;
    this.urlList = urlList;
    this.onLoad = callback;
    this.bufferList = [0];
    this.loadCount = 0;
  }

  loadBuffer = (url: string, index: number) => {
    // Load buffer asynchronously
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      // Asynchronously decode the audio file data in request.response
      this.context.decodeAudioData(
        request.response,
        buffer => {
          if (!buffer) {
            alert("error decoding file data: " + url);
            return;
          }
          this.bufferList[index] = buffer;
          if (++this.loadCount === this.urlList.length)
            this.onLoad(this.bufferList);
        },
        error => {
          console.error("decodeAudioData error", error);
        }
      );
    };

    request.onerror = function() {
      alert("BufferLoader: XHR error");
    };

    request.send();
  };
  load = () => {
    for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
  };
}

export default BufferLoader;
