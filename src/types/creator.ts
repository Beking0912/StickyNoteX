import { getRandomId } from "../helpers/random";

export const defaultSize = {
  w: 200,
  h: 200
}

const getInitialData = (type: string, props: any) => {
  if (type === 'note') {
    const note = {
        nid: getRandomId('n'),
        x: 0,
        y: 0,
        z: 1,
        text: '',
        color: '#cbe86b',
        ...defaultSize,
        ...props
    }
    return note;
  }
  return null;
};

export default getInitialData;
