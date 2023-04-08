const getInitialData = (type: string, props: any) => {
  if (type === 'note') {
    const note = {
        nid: 'okk',
        x: 0,
        y: 0,
        z: 1,
        w: 200,
        h: 250,
        ...props
    }
    return note;
  }
  return null;
};

export default getInitialData;
