class SpeechSingleton {
  private static instance: SpeechSingleton;
  private utterance: SpeechSynthesisUtterance;
  private isSpeakingQueue: boolean = false;
  private queue: string[] = [];

  private constructor() {
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.rate = 0.7
    this.utterance.onend = () => {
      this.isSpeakingQueue = false;
      this.processQueue();
    };
  }

  static getInstance(): SpeechSingleton {
    if (!SpeechSingleton.instance) {
      SpeechSingleton.instance = new SpeechSingleton();
    }
    return SpeechSingleton.instance;
  }

  speak(text: string) {
    this.cancel();
    this.utterance.text = text;
    speechSynthesis.speak(this.utterance);
  }

  speakSequence(texts: string[]) {
    this.queue.push(...texts);
    if (!this.isSpeakingQueue) {
      this.processQueue();
    }
  }

  private processQueue() {
    if (this.queue.length > 0 && !this.isSpeakingQueue) {
      this.isSpeakingQueue = true;
      this.utterance.text = this.queue.shift()!;
      speechSynthesis.speak(this.utterance);
    }
  }

  cancel() {
    speechSynthesis.cancel();
    this.isSpeakingQueue = false;
    this.queue = [];
  }
}

export const SpeechService = SpeechSingleton.getInstance();
