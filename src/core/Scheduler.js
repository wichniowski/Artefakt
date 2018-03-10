class Scheduler {
  constructor(context, cb, tempo) {
    this.cb = cb;
    this.context = context;
    this.noteTime = 0.0;
    this.startTime = this.context.currentTime + 0.005;
    this.rhythmIndex = 0;
    this.tempo = tempo;
  }

  handlePlay = function() {
    this.schedule();
  };

  handleStop = function(event) {
    clearTimeout(this.timeoutId);
  };

  schedule = function() {
    let currentTime = this.context.currentTime;
    currentTime -= this.startTime;

    while (this.noteTime < currentTime + 0.2) {
      this.cb();
      this.advanceNote();
    }
    this.timeoutId = setTimeout(() => this.schedule(), 0);
  };

  advanceNote = function() {
    let secondsPerBeat = 60.0 * 4 / this.tempo;
    this.noteTime += 0.25 * secondsPerBeat;
  };
}

export default Scheduler;
