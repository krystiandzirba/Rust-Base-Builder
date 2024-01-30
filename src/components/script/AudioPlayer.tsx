export const AudioPlayer = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.08;
  audio.play();
};
