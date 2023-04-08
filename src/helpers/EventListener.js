import { useEffect } from 'react';

function EventListener(props) {
  useEffect(() => {
    const { target, ...handlers } = props;
    const addListener = (eventName, handler) => {
      target.addEventListener(eventName, handler);
      return () => {
        target.removeEventListener(eventName, handler);
      };
    };
    const removeListeners = Object.keys(handlers).map(eventName => addListener(eventName, handlers[eventName]));

    return () => {
      removeListeners.forEach(removeListener => removeListener());
    };
  }, [props]);

  return null;
}

export default EventListener;
