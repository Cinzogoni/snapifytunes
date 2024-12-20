export const useStreams = (streamed) => {
  if (streamed < 1000) {
    return streamed;
  } else if (streamed >= 1000 && streamed < 1000000) {
    const thousands = Math.floor(streamed / 1000);
    const hundreds = Math.floor((streamed % 1000) / 100);

    if (thousands < 1000) {
      if (hundreds > 0) {
        return (
          <>
            &asymp; {thousands}K{hundreds}
          </>
        );
      } else {
        return `${thousands}K`;
      }
    }
  } else if (streamed >= 1000000) {
    const millions = Math.floor(streamed / 1000000);
    return <>&asymp; {millions}M</>;
  }
};
